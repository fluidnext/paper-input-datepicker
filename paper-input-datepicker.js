import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';
import {PaperInputBehavior} from '@polymer/paper-input/paper-input-behavior';
import {IronFormElementBehavior} from '@polymer/iron-form-element-behavior/iron-form-element-behavior';

import '@polymer/paper-input/paper-input-container';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-input/iron-input';
import '@polymer/paper-input/paper-input-error';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-button/paper-button';

// import '@lrnwebcomponents/app-datepicker/app-datepicker';
import 'app-datepicker/dist/app-datepicker';

class PaperInputDatepicker extends mixinBehaviors([
    PaperInputBehavior,
    IronFormElementBehavior],
    PolymerElement) {

    static get template() {
        return html`
            <style>
                
                :host {
                    display: block;
                }

                iron-input > input {
                    @apply --paper-input-container-shared-input-style;
                    font-family: inherit;
                    font-weight: inherit;
                    font-size: inherit;
                    letter-spacing: inherit;
                    word-spacing: inherit;
                    line-height: inherit;
                    text-shadow: inherit;
                    color: inherit;
                    cursor: inherit;
                }

                input:disabled {@apply --paper-input-container-input-disabled;}
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {@apply --paper-input-container-input-webkit-spinner;}
                input::-webkit-clear-button {@apply --paper-input-container-input-webkit-clear;}
                input::-webkit-calendar-picker-indicator {@apply --paper-input-container-input-webkit-calendar-picker-indicator;}
                input::-webkit-input-placeholder {color: var(--paper-input-container-color, var(--secondary-text-color));}
                input:-moz-placeholder {color: var(--paper-input-container-color, var(--secondary-text-color));}
                input::-moz-placeholder {color: var(--paper-input-container-color, var(--secondary-text-color));}
                input::-ms-clear {@apply --paper-input-container-ms-clear;}
                input::-ms-reveal {@apply --paper-input-container-ms-reveal;}
                input:-ms-input-placeholder {color: var(--paper-input-container-color, var(--secondary-text-color));}

                paper-dialog {
                    height: 652px;
                }

                [hidden] {
                    display: none;
                }

                #pickerDialog {
                    margin: 0;
                    padding-bottom: 20px;
                }

                .buttons {
                    padding-top: 20px;  
                }

            </style>

            <paper-dialog id="pickerDialog"
                no-overlap     
                horizontal-align="left" 
                vertical-align="top">
                <h2>[[title]]</h2>
                <hr/>
                <div>
                    <app-datepicker id="datepicker" 
                        format="[[format]]"
                        locale="[[locale]]"
                        start-view="[[startView]]"
                        first-day-of-week="[[fistDayOfWeek]]"
                        input-date="[[inputDate]]"
                        value="{{selectedDate}}"
                        on-click="_onClick">
                    </app-datepicker>
                </div>
                <hr/>
                <div class="buttons">
                    <paper-button dialog-dismiss on-click="_abortDate">Cancel</paper-button>
                    <paper-button dialog-confirm autofocus on-click="_setDate">Accept</paper-button>
                </div>
            </paper-dialog>

            <paper-input-container on-click="_openDatePickerBy">
                <label slot="label">[[title]]</label>
                <iron-input id="iron" slot="input" bind-value="{{selectedDate}}">
                    <input readonly />
                </iron-input>
            </paper-input-container>
    `}

    static get properties() {
        return {
            title: {
                type: String,
                value: 'Date Picker'
            },
            locale: {
                type: String,
                value: 'it-IT'
            },
            firstDayOfWeek: {
                type: Number,
                value: 1
            },
            format: {
                type: String,
                value: 'dd/mm/yyyy'
            },
            landscape: {
                type: Boolean,
                value: false
            },
            startView: {
                type: String,
                value: 'calendar'
            },
            inputDate: {
                type: String,
                value: '2015-01-01'
            },
            selectedDate: {
                type: String,
                value: '2019-05-30'
            }
        };
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        if (this.landscape) {
            this.$.datepicker.setAttribute('landscape', true);
        }
        const datepicker = document.querySelector('app-datepicker');
    }

    _openDatePickerBy(evt) {
        this.$.pickerDialog.open();
        this.backupDate = this.inputDate;

    }

    _setDate() {
        this.inputDate = this.$.datepicker.value;
    }

    _abortDate() {
        this.inputDate = this.backupDate;
        this.$.datePickerValue = this.backupDate;
    }

    _onClick(evt) {
        this.inputDate = evt.target.value;
    }
}

window.customElements.define('paper-input-datepicker', PaperInputDatepicker);