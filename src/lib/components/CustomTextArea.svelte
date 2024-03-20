<script>
	import { Textarea, Label } from 'flowbite-svelte';
	export let forLbl;
	export let lblClass = 'mb-2';
	export let lblTxt = 'Add text';
	export let id;
	export let placeholder;
	export let name;
	export let rows = '4';
	export let txtClass = 'focus:border-black w-full';
	export let txtValue;
</script>

<Label for={forLbl} {lblClass}>{lblTxt}</Label>
<Textarea {id} {placeholder} {rows} {name} class={txtClass} bind:value={txtValue} />
