<script>
	import { FloatingLabelInput } from 'flowbite-svelte';

	/**
	 * @param {string} divId - The id of the div that wraps the input
	 * @param {string} inputClass - The class
	 * @param {string} inputType - The type of the input
	 * @param {string} inputValue - The value of the input
	 * @param {string} inputDescription - The description of the input
	 */

	export let divId;
	export let inputDescription;
	export let inputType = 'text' || 'email' || 'password' || 'number' || 'tel' || 'url';
	export let inputValue;
	export let inputClass = 'focus:border-black w-full';
</script>

<div id={divId} class="grid gap-6 items-end w-full">
	<FloatingLabelInput
		classInput={inputClass}
		style="outlined"
		name="floating_outlined"
		type={inputType}
		bind:value={inputValue}
	>
		{inputDescription}
	</FloatingLabelInput>
</div>
