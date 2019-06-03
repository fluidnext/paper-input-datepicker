import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';

import '@polymer/polymer/lib/elements/dom-repeat';
import {FluidCalendarCustomStyle} from './fluid-calendar-style';
import DateUtilities from '../date-utilities';

class FluidCalendar extends mixinBehaviors([], PolymerElement) {

	static get template() {
		return html`
		${FluidCalendarCustomStyle}
		<div class="week-labels-row">
			<template is="dom-repeat" items="[[weekdaysList]]" id="labels-row">
				<div class="day-label-container">[[item]]</div>
			</template>
		</div>
		<template is="dom-repeat" items="{{table}}" as="week" index-as="weekIndex" id="weeks">
			<div class="week-row">
				<template is="dom-repeat" id="weekRow" items="{{week}}" as="day" index-as="dayIndex">
					<div class$="day-container [[_getClass(day)]]" on-click="toggleSelection">
						<div class="hovered">[[day.label]]</div>
					</div>
				</template>
			</div>
		</template>
		`;
	}

	toggleSelection(e) {
		this.selectedDate = e.model.get('day').date;
		console.log(this.selectedDate);
	}

	constructor() {
		super();
	}

	ready() {
		super.ready();
		this.date = `${('00' + this.day).slice(-2)}/${('00' + this.month).slice(-2)}/${('0000' + this.year).slice(-4)}`;
		this.dateUtils = new DateUtilities(this.day, this.month, this.year, this.format);
		this.weekdaysList = ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'];
		this.table = this.dateUtils.month;
	}

	_getClass(day) {
		let classes = '';
		classes += day.currentMonth ? '' : 'out-of-current-month ';
		classes += day.weekday === 0 || day.weekday === 7 ? 'holyday ' : 'weekday ';
		classes += day.today ? 'today ' : '';
		return classes;
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
			format: {
				type: String,
				value: 'DD/MM/YYYY'
			},
			table: {
				type: Array,
				value() {
					return [[]]
				}
			}
		};
	}
}

window.customElements.define('fluid-calendar', FluidCalendar);