<script>
	import { FloatingLabelInput } from 'flowbite-svelte';

	export let divId;
	export let inputDescription;
	export let inputType = 'text' || 'email' || 'password' || 'number' || 'tel' || 'url';
	export let inputValue;
	export let prop = '';
</script>

<div id={divId} class="grid gap-6 items-end w-auto m-2">
	<FloatingLabelInput
		classInput={`focus:border-black w-full ${prop}`}
		style="outlined"
		name="floating_outlined"
		type={inputType}
		bind:value={inputValue}
	>
		{inputDescription}
	</FloatingLabelInput>
</div>
