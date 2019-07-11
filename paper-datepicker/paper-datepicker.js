import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';
import {PaperInputBehavior} from '@polymer/paper-input/paper-input-behavior';

import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-input/paper-input-container';
import '@polymer/iron-input/iron-input';
import '@polymer/paper-input/paper-input-error';

import {PaperDatepickerDefaultLocale} from './paper-datepicker-default-locale';
import {PaperDatepickerCustomStyle} from './paper-datepicker-style';

import '../paper-calendar/paper-calendar';

/**
 * @demo demo/index.html Paper-Datepicker
 */
class PaperDatepicker extends mixinBehaviors([PaperInputBehavior], PolymerElement) {

	static get template() {
		return html`
		<style>
			iron-input > input { @apply --paper-input-container-shared-input-style; }
		</style>
		${PaperDatepickerCustomStyle}
		<div class="underlay" id="underlay" hidden on-click="_toggleDatepicker"></div>
		<div class="control-container">
			<paper-input-container on-click="_toggleDatepicker" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" auto-validate$="[[autoValidate]]" disabled$="[[disabled]]" invalid="[[invalid]]">
				<label hidden$="[[!label]]" slot="label" for$="[[_inputId]]" aria-hidden="true">[[label]]</label>
				<iron-input id$="[[_inputId]]" bind-value="{{value}}" slot="input" on-click="_toggleDatepicker" invalid="{{invalid}}" validator="[[validator]]" required="[[required]]">
					<input type="text" readonly>
				</iron-input>
				<!-- <div slot="suffix" id="clear" on-click="close" hidden>
					<iron-icon icon="clear">
				</div> -->
				<iron-icon id="clearButton" slot="suffix" suffix icon="paper-input-datepicker:clear" on-click="_clear" hidden></iron-icon>
				<template is="dom-if" if="[[errorMessage]]">
                    <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
                </template>
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
	}

	ready() {
		super.ready();

		let calendarElement = this.$.calendar.querySelector('paper-calendar');
		calendarElement.addEventListener('value-changed', e => {
			if (this.disableClickOutside) {
				this.close();
			}
		});
	}

	/**
	 * Controls the paper-month-control visibility 
	 * @param {MouseEvent} e 
	 * @private
	 */
	_toggleDatepicker(e) {
		if (this.$.calendar.hasAttribute('hidden')) {
			this.dispatchEvent(new CustomEvent('datepicker-before-open', e));
			this.open(e);
			this.dispatchEvent(new CustomEvent('datepicker-open', e));
		} else {
			this.dispatchEvent(new CustomEvent('datepicker-before-close', e));
			this.close(e);
			this.dispatchEvent(new CustomEvent('datepicker-close', e));
		}
	}

	/**
	 * Clear input value
	 * @param {MouseEvent} event
	 * @private
	 */
	_clear(event){
		event.stopPropagation();
		this.value = '';
		this.$.clearButton.setAttribute('hidden', true);
	}

	/**
	 * Opens and shows the paper-month-calendar
	 * @param {MouseEvent} e
	 * @public 
	 */
	open(e) {
		e.stopPropagation();
		this.$.calendar.removeAttribute('hidden');
		if (!this.disableClickOutside) {
			this.$.underlay.removeAttribute('hidden');
		}
	}

	/**
	 * Closes and hides the paper-month-calendar
	 * @param {MouseEvent} e
	 * @public
	 */
	close(e) {
		if (e) {
			e.stopPropagation();	
		}
		this.$.calendar.setAttribute('hidden', true);
		this.$.underlay.setAttribute('hidden', true);

		if (!this.value || this.value === '') {
			this.$.clearButton.setAttribute('hidden', true);
		}else{
			this.$.clearButton.removeAttribute('hidden', true);
		}
	}

	/**
	 * Set calendar locale to the provided locale definition Object
	 * @param {String} newLocale
	 * @public
	 */
	set locale(newLocale) {
		this._locale = Object.assign(PaperDatepickerDefaultLocale, newLocale);
	}


	static get properties() {
		return {
			/**
			 * Variable to set behavior on click outside. 
			 * If set to true disables datepicker closure on click outside, defaults to true.
			 * @type {Boolean}
			 */
			disableClickOutside: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			/**
			 * Selected date
			 * @type {String}
			 */
			value: {
				type: String,
				notify: true,
				reflectToAttribute: true
			}
		};
	}
}

window.customElements.define('paper-datepicker', PaperDatepicker);