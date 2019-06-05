import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';
import {PaperInputBehavior} from '@polymer/paper-input/paper-input-behavior';

import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/iron-input/iron-input';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/hardware-icons';
import '@polymer/iron-icon/iron-icon';

import {FluidDatepickerDefaultLocale} from './fluid-datepicker-default-locale';
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
		<div class="underlay" id="underlay" hidden on-click="_toggleDatepicker"></div>
		<div class="control-container">
			<paper-input-container on-click="_toggleDatepicker">
				<div slot="label" for="datepicker-date">[[label]]</div>
				<iron-input bind-value="{{value}}" slot="input">
					<input type="text" readonly>
				</iron-input>
				<div slot="suffix" id="clear" on-click="close" hidden>
					<iron-icon icon="clear">
				</div>
			</paper-input-container>
		</div>
		<div id="calendar" class="calendar-container" hidden>
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
				<fluid-calendar id="current" class="on-screen" month="[[month]]" year="[[year]]" value="{{value}}"></fluid-calendar>
			</div>
		</div>
		`;
	}

	constructor() {
		super();
	}

	ready() {
		super.ready();

		this._locale = FluidDatepickerDefaultLocale;

		if (!this.value) {
			this.value = (new Date()).toLocaleDateString(this._locale.locale);
		}

		this.enabled = true;
		this.monthShown = this.month;
		this.monthLabels = this._locale.labels.months;
		this.monthLabel = this.monthLabels[this.month - 1];
		this.year = (new Date()).getFullYear();

		this.$.current.addEventListener('value-changed', e => {
			this.value = e.detail.value;
		});
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

		let previous = document.createElement('fluid-calendar');
		previous.month = this.monthShown;
		previous.classList.add('move-left');
		previous.addEventListener('value-changed', e => {
			this.value = e.detail.value;
		});

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

		let next = document.createElement('fluid-calendar');
		next.month = this.monthShown;
		next.classList.add('move-right');
		next.addEventListener('value-changed', e => {
			this.value = e.detail.value;
		});

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
			this.open(e);
		} else {
			this.close(e);
		}

	}

	open(e) {
		e.stopPropagation();
		this.$.calendar.removeAttribute('hidden');
		if (!this.disableClickOutside) {
			this.$.underlay.removeAttribute('hidden');
		}
		this.$.clear.removeAttribute('hidden');
		this.label = this._locale.labels.close || 'Click to close datepicker';
	}

	close(e) {

		e.stopPropagation();
		this.$.calendar.setAttribute('hidden', true);
		this.$.underlay.setAttribute('hidden', true);
		this.$.clear.setAttribute('hidden', true);
		this.label = this._locale.labels.open || 'Click to open datepicker';
	}

	set locale(newLocale) {
		this._locale = Object.assign(FluidDatepickerDefaultLocale, newLocale);
	}


	static get properties() {
		return {
			month: {
				type: Number,
				value: (new Date()).getMonth() + 1
			},
			disableClickOutside: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			value: {
				type: String,
				notify: true,
				reflectToAttribute: true
			}
		};
	}
}

window.customElements.define('fluid-datepicker', FluidDatepicker);