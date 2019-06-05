import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';

import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/hardware-icons';
import '@polymer/iron-icon/iron-icon';

import {FluidCalendarDefaultLocale} from './fluid-calendar-default-locale';
import {FluidCalendarCustomStyle} from './fluid-calendar-style';

import '../fluid-month-control/fluid-month-control';

class FluidCalendar extends mixinBehaviors([], PolymerElement) {

	static get template() {
		return html`
			${FluidCalendarCustomStyle}
			<div class="toolbar">
				<div class="row">
					<div class="date">[[year]]</div>
				</div>
				<div class="row">
					<div class="month-selector" on-click="_previousMonth">
						<iron-icon icon="hardware:keyboard-arrow-left">
					</div>
					<div class="date">[[monthLabel]]</div>
					<div class="month-selector" on-click="_nextMonth">
						<iron-icon icon="hardware:keyboard-arrow-right">
					</div>
				</div>
				<div class="row">[[value]]</div>
			</div>
			<div class="calendars" id="holder">
				<fluid-month-control id="current" class="on-screen" month="[[month]]" year="[[year]]" value="{{value}}"></fluid-month-control>
			</div>
		`;
	}

	constructor() {
		super();
		this._locale = FluidCalendarDefaultLocale;
	}

	ready() {
		super.ready();
		this.enabled = true;
		this.monthShown = this.month;
		this.monthLabels = this._locale.labels.months;
		this.monthLabel = this.monthLabels[this.month - 1];
		this.year = (new Date()).getFullYear();

		this.$.current.addEventListener('value-changed', e => {
			this.value = e.detail.value;
		});
	}

	static get properties() {
		return {
			month: {
				type: Number,
				value: (new Date()).getMonth() + 1
			},
			value: {
				type: String,
				notify: true,
				reflectToAttribute: true
			}
		};
	}

	_previousMonth() {
		if (!this.enabled) {
			return;
		}
		this.enabled = false;
		this.monthShown--;
		if (this.monthShown < 1) {
			this.monthShown = 12;
			this.year--;
		}
		this.monthLabel = this.monthLabels[this.monthShown - 1];

		let previous = document.createElement('fluid-month-control');
		previous.month = this.monthShown;
		previous.classList.add('move-left');
		previous.addEventListener('value-changed', e => {
			this.value = e.detail.value;
		});

		this.$.holder.appendChild(previous);

		let current = this.$.holder.querySelector('fluid-month-control#current');
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
			this.$.current.addEventListener('value-changed', e => {
				this.value = e.detail.value;
			});
		}, 500);
	}

	_nextMonth() {
		if (!this.enabled) {
			return;
		}
		this.enabled = false;
		this.monthShown++;
		if (this.monthShown > 12) {
			this.monthShown = 1;
			this.year++;
		}
		this.monthLabel = this.monthLabels[this.monthShown - 1];

		let next = document.createElement('fluid-month-control');
		next.month = this.monthShown;
		next.classList.add('move-right');
		next.addEventListener('value-changed', e => {
			this.value = e.detail.value;
		});

		this.$.holder.appendChild(next);

		let current = this.$.holder.querySelector('fluid-month-control#current')
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
}

window.customElements.define('fluid-calendar', FluidCalendar);