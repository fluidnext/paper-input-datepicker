import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';

import '@polymer/polymer/lib/elements/dom-repeat';
import {PaperMonthControlDefaultLocale} from './paper-month-control-default-locale';
import {PaperMonthControlCustomStyle} from './paper-month-control-style';
import DateUtilities from '../date-utilities';

/**
 * @demo demo/paper-month_demo.html Paper-Month-Control
 */
class PaperMonthControl extends mixinBehaviors([], PolymerElement) {

	static get template() {
		return html`
		${PaperMonthControlCustomStyle}
		<div class="week-labels-row">
			<template is="dom-repeat" items="[[weekdaysList]]" id="labels-row">
				<div class="day-label-container">[[item]]</div>
			</template>
		</div>
		<template is="dom-repeat" items="{{table}}" as="week" index-as="weekIndex" id="weeks">
			<div class="week-row">
				<template is="dom-repeat" id="weekRow" items="{{week}}" as="day" index-as="dayIndex">
					<div class$="day-container [[_getClass(day)]]" on-click="_setDate">
						<div class="hovered">[[day.label]]</div>
					</div>
				</template>
			</div>
		</template>
		`;
	}

	constructor() {
		super();
	}

	ready() {
		super.ready();
		this._setDefaultValue(this.value);
		// this._locale = PaperMonthControlDefaultLocale;
		// this.date = `${('00' + this.day).slice(-2)}/${('00' + this.month).slice(-2)}/${('0000' + this.year).slice(-4)}`;
		// this.dateUtils = new DateUtilities(this.day, this.month, this.year, this._locale.format);
		// this.weekdaysList = this._locale.labels.days;
		// this.table = this.dateUtils.month;
		this.addEventListener('datepicker-before-open', e => {
			let days = this.shadowRoot.querySelectorAll('.day-container');
			for (let i = 0; i < days.length; i++) {
				if (parseInt(days[i].innerText) === parseInt(this.value.split('/')[0]) && !days[i].classList.contains('out-of-current-month')) {
					days[i].classList.add('selected');
					this.selected = days[i];
					break;
				}
			}
		});
		this.addEventListener('datepicker-clear-value', e => {
			let days = this.shadowRoot.querySelectorAll('.day-container');
			days.forEach(day => day.classList.remove('selected'));
			this._setDefaultValue();
		});
	}

	/**
	 * Set calendar value when a date is clicked.
	 * @param {MouseEvent} e Click event on a single date
	 * @private
	 */
	_setDate(e) {
		if (!e.model.get('day').currentMonth) {
			return;
		}
		this.value = e.model.get('day').date;
		let days = this.shadowRoot.querySelectorAll('.day-container');
		days.forEach(day => day.classList.remove('selected'));
		delete this.selected;
		for (let i = 0; i < days.length; i++) {
			if (days[i].innerText === e.model.get('day').label && !days[i].classList.contains('out-of-current-month')) {
				days[i].classList.add('selected');
				this.selected = days[i];
				break;
			}
		}
	}

	/**
	 * Set the class for the date. (ex. different class for holidays, current month, current date...)
	 * @param {Object} day Object type Date
	 * @return {String} return classes for the day
	 * @private 
	 */
	_getClass(day) {
		let classes = '';
		classes += day.currentMonth ? '' : 'out-of-current-month ';
		classes += day.weekday === 0 || day.weekday === 7 ? 'holyday ' : 'weekday ';
		classes += day.today ? 'today ' : '';
		return classes;
	}

	/**
	 * Check if value propertie is undefined
	 * @param {String} date
	 * @private
	 */
	_setDefaultValue(date){
		this._locale = PaperMonthControlDefaultLocale;
		this.weekdaysList = this._locale.labels.days;
		if (date === undefined) {
			this.date = `${('00' + this.day).slice(-2)}/${('00' + this.month).slice(-2)}/${('0000' + this.year).slice(-4)}`;
			this.dateUtils = new DateUtilities(this.day, this.month, this.year, this._locale.format);
			this.table = this.dateUtils.month;
		} else{
			this.date = date;
			this.dateUtils = new DateUtilities(parseInt(date.split('/')[0]), parseInt(date.split('/')[1]), parseInt(date.split('/')[2]), this._locale.format);
			this.table = this.dateUtils.month;
		}
	}

	/**
	 * Set calendar locale to the provided locale definition Object 
	 * @param {Object} newLocale
	 * @public
	 */
	set locale(newLocale) {
		this._locale = Object.assign(PaperMonthControlDefaultLocale, newLocale);
	}

	static get properties() {
		return {
			/**
			 * Dau shown
			 * @type {Number}
			 */
			day: {
				type: Number,
				value: (new Date()).getDate()
			},
			/**
			 * Month shown
			 * @type {Number}
			 */
			month: {
				type: Number,
				value: (new Date()).getMonth() + 1
			},
			/**
			 * Set year
			 * @type {Number}
			 */
			year: {
				type: Number,
				value: (new Date()).getFullYear()
			},
			/**
			 * Months in the year
			 * @type {Array}
			 */
			table: {
				type: Array,
				value() {
					return [[]]
				}
			},
			/**
			 * Selected date
			 * @type {String}
			 */
			value: {
				type: String,
				reflectToAttribute: true,
				notify: true
			}
		};
	}
}

window.customElements.define('paper-month-control', PaperMonthControl);