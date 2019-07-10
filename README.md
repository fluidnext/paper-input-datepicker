[![Coverage Status](https://coveralls.io/repos/github/fluidnext/paper-input-datepicker/badge.svg?branch=master)](https://coveralls.io/github/fluidnext/paper-input-datepicker?branch=master)
[![Published on NPM](https://img.shields.io/npm/v/%40fluidnext-polymer%2Fpaper-input-datepicker.svg)](https://www.npmjs.com/package/%40fluidnext-polymer%2Fpaper-input-datepicker)
<!-- [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/%40fluidnext-polymer%2Fpaper-input-datepicker) -->

# Paper Input Date Picker

Is a [Polymer 3](https://polymer-library.polymer-project.org) input web-component only for date.

Is composed by three component (ordered by dependencies hierarchy):
  - `paper-month-control`;
  - `paper-calendar`;
  - `paper-input-datepicker`;

All components could be used like web-components (see Demo for the example).

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

### Custom icons
Icons can be customized by importing a different iconset.
For example, here is the iconset code imported in the [Demo]().
```js
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const template = html`
    <iron-iconset-svg name="paper-input-datepicker" size="24">
        <svg><defs>
          <g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
        </defs></svg>
    </iron-iconset-svg>
`;

document.head.appendChild(template.content);
```

#### Custome Style, from outside
Find some test on the various demo file.

**PAPER-MONTH-CONTROL:**            

**_--selected-date-background-color_**: Background-color for the selected date.         
**_--today-style_**: Object Style for today date in the calendar.       
**_--selected-date-style_**: Object Style for the selected date.      
**_--holiday-style_**: Object Style for the holidays date.      

**PAPER-CALENDAR:**           

**_--calendar-toolbar-style_**: Object Style for the toolbar in the calendar component.    

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/fluidnext/paper-input-datepicker
cd paper-input-datepicker
npm install
```

### Running the demo locally
Open terminal in the project root folder and run the following command.
```sh
polymer serve --open
```

### Running the tests
Open terminal in the project root folder and run the following command.
```sh
polymer test
```
To see tests details, open the generated "index.html" inside "coverage/lcov-report" folder.