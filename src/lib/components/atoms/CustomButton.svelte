<script>
	/**
	 * @param {string} buttonText - The text of the button
	 * @param {string} btnClasses - The classes of the button
	 * @param {function} handleClick - The function to execute when the button is clicked
	 
	*/
	export let text = 'Click me';
	export let customClass = '';
	export let handleClick = () => {
		console.log('Button clicked');
	};
</script>

<button class={customClass} on:click={handleClick}>{text}</button>
