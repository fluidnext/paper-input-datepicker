[![Coverage Status](https://coveralls.io/repos/github/fluidnext/paper-input-datepicker/badge.svg?branch=master)](https://coveralls.io/github/fluidnext/paper-input-datepicker?branch=master)
[![Published on NPM](https://img.shields.io/npm/v/%40fluidnext-polymer%2Fpaper-input-datepicker.svg)](https://www.npmjs.com/package/%40fluidnext-polymer%2Fpaper-input-datepicker)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/%40fluidnext-polymer%2Fpaper-input-datepicker)

# Paper Input Date Picker

`<paper-input-datepicker></paper-input-datepicker>` input web-component only for date, written in Polymer 3.

## Usage

### Installation
```
npm install --save @fluidnext-polymer/paper-input-datepicker
```

### In an html file
```html
<html>
  <head>
    <script type="module" src="@fluid-next/paper-input-datepicker/paper-input-datepicker.js"></script>
  </head>
  <body>
    <paper-input-datepicker></paper-input-datepicker>
  </body>
</html>
```

### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@fluid-next/paper-input-datepicker/paper-input-datepicker';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <paper-input-datepicker></paper-input-datepicker>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

# For Developers

## Demo and Docs

<!-- #### Custome Style, from outside TODO
Find some test on the various demo file.

**_--paper-autocomplete-main-color_**: Color for autocomplete details (border & icons).  
**_--paper-input-font-color_**: Font color only for input value.  
**_--paper-suggestions-color_**: Font color for item suggestions.  
**_--suggestions-item-min-height_**: Min heigth for item suggestions.  
**_--paper-autocomplete-min-height_**: Min heigth for the autocomplete, that wrap also the suggestions. -->

<!-- ## Testing & Demo

### First step clone repo & install dependencies:
```
git clone https://github.com/fluidnext/paper-autocomplete.git
cd paper-autocomplete
npm install
```

### To run test whit polymer use:
```
npm run test //Test for all installed browser in your pc
npm run test-safari //Test only for safari browser
```

#### If you have the problem with polymer test, try this (I use this method):

1. open the serve with polymer serve;
```
npm run serve
```
2. run debbuger with vscode or open demo path in your localhost by terminal;
```
open http://localhost:8081/components/@fluid-next/paper-autocomplete/test/paper-autocomplete-test.html 
```

##### Difference Usage between VScode and not
With VScode you see the result and log in the **_DEBUG CONSOLE_**.  
Without VScode you must use the **_Inspect Element_** of your default Browser.  
If will you use VScode, **_remember_**, you must config the debbuger in .vscode folder.  
(my .vscode folder is ignored by gitignore)

### To run demo
```
npm run serve
```
-->