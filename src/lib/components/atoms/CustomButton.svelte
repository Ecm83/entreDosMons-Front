<script>
	import { Button } from 'flowbite-svelte';
	export let buttonText;
	export let btnClasses;
	export let handleClick;
</script>

<Button outline on:click={handleClick} class={btnClasses}>{buttonText}</Button>
