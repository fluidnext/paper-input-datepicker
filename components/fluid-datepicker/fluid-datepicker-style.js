import {html, PolymerElement} from '@polymer/polymer/polymer-element';

export const FluidDatepickerCustomStyle = html`
<style>
	:host {
		position: relative;
		display: block;
		z-index: 1;
	}
	.calendar-container {
		position: fixed;
		box-sizing: border-box;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		overflow: hidden;
		
		width: 300px;
		height: 400px;
		
		border: 1px solid #e0e0e0;
		border-bottom: 2px solid #b0b0b0;
		border-radius: 3px;
		box-shadow: 0 2px 3px 1px #c0c0c0;

		background-color: white;
		
	}
	
	.calendar-container .toolbar {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%; 
		height: 25%;
	}

	.calendar-container .toolbar .row {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
    	align-items: center;
		width: 100%;
		height: 33%;
	}

	.calendar-container .toolbar .row .month-selector {
		font-weight: bolder;
		font-size: 120%
	}

	.calendar-container .calendars {
		display: flex;
		flex-direction: row;
		width: 300%;
		height: 75%;
		transition: all .5s ease-in-out;
	}

	.calendar-container .calendars.previous {
		transform: translateX(300px);
	}
	.calendar-container .calendars.next {
		transform: translateX(-300px);
	}
	
	[hidden] { display: none; }
</style>`;
