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
	
	.underlay {
		background-color: rgba(0,0,0,0);
		position: fixed;
		top: 0;
		left: 0;
		width: 8000px;
		height: 8000px;
	}
	
	[hidden] { display: none; }
</style>`;
