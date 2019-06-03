import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';
import {PaperInputBehavior} from '@polymer/paper-input/paper-input-behavior';

import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/iron-input/iron-input';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/hardware-icons';
import '@polymer/iron-icon/iron-icon';


import {FluidDatepickerCustomStyle} from './fluid-datepicker-style';

import '../fluid-calendar/fluid-calendar';

class FluidDatepicker extends mixinBehaviors([PaperInputBehavior], PolymerElement) {

	static get template() {
		return html`
		<style>
			iron-input > input {
                 @apply --paper-input-container-shared-input-style;
			}
		</style>
		${FluidDatepickerCustomStyle}
		<div class="control-container">
			<paper-input-container on-click="_toggleDatepicker">
				<div slot="label" for="datepicker-date">[[label]]</div>
				<iron-input bind-value="[[selectedDate]]" slot="input">
					<input type="text" readonly>
				</iron-input>
			</paper-input-container>
		</div>
		<div id="calendar" class="calendar-container" hidden>
			<div class="toolbar">
				<div class="row">
					<div class="month-selector" on-click="_previousMonth">
						<iron-icon icon="hardware:keyboard-arrow-left">
					</div>
					<div class="date">[[date]]</div>
					<div class="month-selector" on-click="_nextMonth">
						<iron-icon icon="hardware:keyboard-arrow-right">
					</div>
				</div>
				<div class="row">[[monthLabel]]</div>
				<div class="row">due</div>
			</div>
			<div class$="calendars [[monthClass]]">	
				<fluid-calendar month="[[previousMonth]]"></fluid-calendar>
				<fluid-calendar month="[[month]]"></fluid-calendar>
				<fluid-calendar month="[[nextMonth]]"></fluid-calendar>
			</div>
			
		</div>
		`;
	}

	constructor() {
		super();
		this.currentMonth = 1;
	}

	_previousMonth() {
		this.currentMonth--;
		if (this.currentMonth < 0) {
			this.currentMonth = 0;
		}
		this.monthClass = ['previous', 'current', 'next'][this.currentMonth];
	}

	_nextMonth() {
		this.currentMonth++;
		if (this.currentMonth > 2) {
			this.currentMonth = 2
		}
		this.monthClass = ['previous', 'current', 'next'][this.currentMonth];
	}

	_toggleDatepicker(e) {

		if (this.$.calendar.hasAttribute('hidden')) {
			this.$.calendar.removeAttribute('hidden');
			this.label = 'Click to close datepicker';
		} else {
			this.$.calendar.setAttribute('hidden', true);
			this.label = 'Click to open datepicker';
		}

	}

	ready() {
		super.ready();
		this.date = (new Date()).toLocaleString('it-IT');

	}

	static get properties() {
		return {
			previousMonth: {
				type: Number,
				value: (new Date()).getMonth()
			},
			month: {
				type: Number,
				value: (new Date()).getMonth() + 1
			},
			nextMonth: {
				type: Number,
				value: (new Date()).getMonth() + 2
			},
			label: {
				type: String,
				value: 'Click to open datepicker'
			}
		};
	}
}

window.customElements.define('fluid-datepicker', FluidDatepicker);