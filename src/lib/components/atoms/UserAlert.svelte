<script>
	import { Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	/**
	 * @property {string} color - The color of the alert
	 * @property {string} InfoAlert - The text of the alert
	 * @property {string} InfoText - The text of the alert
	 */

	export let color = 'blue' || 'red' || 'green' || 'yellow';
	export let infoAlert;
	export let infoText = 'This is an info alert';
</script>

<Alert border {color} class="w-full">
	<InfoCircleSolid slot="icon" class="w-4 h-4" />
	<span class="font-medium">{infoAlert}</span>
	{infoText}
</Alert>
