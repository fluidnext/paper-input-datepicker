import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';
import {PaperInputBehavior} from '@polymer/paper-input/paper-input-behavior';

import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-input/paper-input-container';
import '@polymer/iron-input/iron-input';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/hardware-icons';
import '@polymer/iron-icon/iron-icon';

import {PaperDatepickerDefaultLocale} from './paper-datepicker-default-locale';
import {PaperDatepickerCustomStyle} from './paper-datepicker-style';

import '../paper-calendar/paper-calendar';

class PaperDatepicker extends mixinBehaviors([PaperInputBehavior], PolymerElement) {

	static get template() {
		return html`
		<style>
			iron-input > input { @apply --paper-input-container-shared-input-style; }
		</style>
		${PaperDatepickerCustomStyle}
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
			<paper-calendar value="{{value}}"></paper-calendar>
		</div>
		`;
	}

	constructor() {
		super();
		this._locale = PaperDatepickerDefaultLocale;
		this.label = this._locale.labels.open || 'Click to open datepicker';
	}

	ready() {
		super.ready();

		if (!this.value) {
			this.value = (new Date()).toLocaleDateString(this._locale.locale);
		}
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
		this._locale = Object.assign(PaperDatepickerDefaultLocale, newLocale);
	}


	static get properties() {
		return {
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

window.customElements.define('paper-datepicker', PaperDatepicker);