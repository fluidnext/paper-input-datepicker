import {html} from '@polymer/polymer/polymer-element';

export const FluidCalendarCustomStyle = html`
<style>
	:host {
		position: relative;
		display: block;
		z-index: 1;
		min-width: 300px;
		max-width: 300px;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
	
	.toolbar {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%; 
		height: 25%;
	}

	.toolbar .row {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
    	align-items: center;
		width: 100%;
		height: 33%;
	}

	.toolbar .row .month-selector {
		font-weight: bolder;
		font-size: 120%
	}

	.toolbar {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%; 
		height: 25%;
	}

	.toolbar .row {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
    	align-items: center;
		width: 100%;
		height: 33%;
	}

	.toolbar .row .month-selector {
		font-weight: bolder;
		font-size: 120%
	}

	.calendars {
		display: flex;
		flex-direction: row;
		position: relative;
		min-width: 900px;
		width: 900px;
		height: 75%;
	}

	.calendars fluid-month-control {
		position: absolute;
		transition: all .5s ease-in-out;
	}

	.move-right {
		left: 300px;
	}
	.on-screen {
		left: 0px;
	}
	.move-left {
		left: -300px;
	}
	
	[hidden] { display: none; }
</style>`;
