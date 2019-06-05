import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';

import '@polymer/polymer/lib/elements/dom-repeat';
import {FluidMonthControlDefaultLocale} from './fluid-month-control-default-locale';
import {FluidMonthControlCustomStyle} from './fluid-month-control-style';
import DateUtilities from '../date-utilities';

class FluidMonthControl extends mixinBehaviors([], PolymerElement) {

	static get template() {
		return html`
		${FluidMonthControlCustomStyle}
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

	constructor() {
		super();
	}

	ready() {
		super.ready();
		this._locale = FluidMonthControlDefaultLocale;
		this.date = `${('00' + this.day).slice(-2)}/${('00' + this.month).slice(-2)}/${('0000' + this.year).slice(-4)}`;
		this.dateUtils = new DateUtilities(this.day, this.month, this.year, this._locale.format);
		this.weekdaysList = this._locale.labels.days;
		this.table = this.dateUtils.month;
	}

	_getClass(day) {
		let classes = '';
		classes += day.currentMonth ? '' : 'out-of-current-month ';
		classes += day.weekday === 0 || day.weekday === 7 ? 'holyday ' : 'weekday ';
		classes += day.today ? 'today ' : '';
		return classes;
	}

	set locale(newLocale) {
		this._locale = Object.assign(FluidMonthControlDefaultLocale, newLocale);
	}

	static get properties() {
		return {
			day: {
				type: Number,
				value: (new Date()).getDate()
			},
			month: {
				type: Number,
				value: (new Date()).getMonth() + 1
			},
			year: {
				type: Number,
				value: (new Date()).getFullYear()
			},
			table: {
				type: Array,
				value() {
					return [[]]
				}
			},
			value: {
				type: String,
				reflectToAttribute: true,
				notify: true
			}
		};
	}
}

window.customElements.define('fluid-month-control', FluidMonthControl);