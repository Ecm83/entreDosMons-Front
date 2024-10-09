<script>
	import { CustomTextArea } from '$lib/components/atoms';
	import { onMount } from 'svelte';

	/**
	 * @param {string} textValue - The value of the textarea
	 * @param {string} placeholder - The placeholder of the textarea
	 * @param {string} lblSpech - The label of the textarea
	 */

	let recognition;
	export let textValue;
	export let placeholder = 'Escriu aquí...';
	export let lblSpech;

	onMount(() => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		if (!SpeechRecognition) {
			alert('Lo siento, el reconocimiento de voz no está disponible en tu navegador.');
			return;
		}

		recognition = new SpeechRecognition();
		recognition.continuous = true;
		recognition.lang = 'ca-Es';
		recognition.interimResults = false;

		recognition.onresult = (event) => {
			textValue = event.results[event.results.length - 1][0].transcript || '';
			console.log('Result:', textValue);
			recognition.stop();
		};
	});
</script>

<div class="flex gap-2 align-center">
	<CustomTextArea {placeholder} lblText={lblSpech} id={'textArea'} bind:txtValue={textValue} />

	<div class="flex-col gap-2">
		<svg
			class="w-[30px] h-[30px] text-white bg-ok-50 hover:bg-ok-100 border-black rounded mb-2 hover:scale-50 transition-transform"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			viewBox="0 0 24 24"
			on:click={() => {
				recognition.start();
			}}
		>
			<path
				fill-rule="evenodd"
				d="M5 8a1 1 0 0 1 1 1v3a4.006 4.006 0 0 0 4 4h4a4.006 4.006 0 0 0 4-4V9a1 1 0 1 1 2 0v3.001A6.006 6.006 0 0 1 14.001 18H13v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2H9.999A6.006 6.006 0 0 1 4 12.001V9a1 1 0 0 1 1-1Z"
				clip-rule="evenodd"
			/>
			<path d="M7 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V6Z" />
		</svg>

		<svg
			class="w-[30px] h-[30px] text-white bg-gray-500 hover:bg-gray-700 border-black rounded mb-2 hover:scale-50 transition-transform"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			viewBox="0 0 24 24"
			on:click={() => {
				recognition.stop();
			}}
		>
			<path
				fill-rule="evenodd"
				d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z"
				clip-rule="evenodd"
			/>
		</svg>
		<svg
			class="w-[30px] h-[30px] text-white bg-delete-50 hover:bg-delete-100 rounded hover:scale-50 transition-transform"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
			on:click={() => {
				textValue = '';
			}}
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18 17.94 6M18 18 6.06 6"
			/>
		</svg>
	</div>
</div>
