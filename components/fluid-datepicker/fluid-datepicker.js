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
			<div class="calendars" id="holder">	
				<fluid-calendar id="current" class="on-screen" month="[[month]]"></fluid-calendar>
			</div>
		</div>
		`;
	}

	constructor() {
		super();
	}

	_previousMonth() {
		if (!this.enabled) {
			return;
		}
		this.enabled = false;
		this.monthShown--;
		this.monthShown = this.monthShown < 1 ? 12 : this.monthShown;
		this.monthLabel = this.monthLabels[this.monthShown - 1];

		let previous = document.createElement('fluid-calendar');
		previous.month = this.monthShown;
		previous.classList.add('move-left');

		this.$.holder.appendChild(previous);

		let current = this.$.holder.querySelector('fluid-calendar#current');
		current.classList.remove('on-screen');
		current.classList.add('move-right');

		setTimeout(() => {
			previous.classList.remove('move-left');
			previous.classList.add('on-screen');
		});

		setTimeout(() => {
			current.remove();
			previous.id = 'current';
			this.enabled = true;
		}, 500);
	}

	_nextMonth() {
		if (!this.enabled) {
			return;
		}
		this.enabled = false;
		this.monthShown++;
		this.monthShown = this.monthShown > 12 ? 1 : this.monthShown;
		this.monthLabel = this.monthLabels[this.monthShown - 1];

		let next = document.createElement('fluid-calendar');
		next.month = this.monthShown;
		next.classList.add('move-right');

		this.$.holder.appendChild(next);

		let current = this.$.holder.querySelector('fluid-calendar#current')
		current.classList.remove('on-screen');
		current.classList.add('move-left');

		setTimeout(() => {
			next.classList.remove('move-right');
			next.classList.add('on-screen');
		});

		setTimeout(() => {
			current.remove();
			next.id = 'current';
			this.enabled = true;
		}, 500);
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
		this.enabled = true;
		this.monthShown = this.month;
		this.monthLabels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
		this.monthLabel = this.monthLabels[this.month - 1];
	}

	static get properties() {
		return {
			month: {
				type: Number,
				value: (new Date()).getMonth() + 1
			},
			label: {
				type: String,
				value: 'Click to open datepicker'
			}
		};
	}
}

window.customElements.define('fluid-datepicker', FluidDatepicker);