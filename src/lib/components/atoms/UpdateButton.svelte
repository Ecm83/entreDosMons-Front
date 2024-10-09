<script>
	import CustomButton from './CustomButton.svelte';

	export let handleUpdate;
</script>

<CustomButton
	handleClick={handleUpdate}
	btnClasses={'text-white w-20 bg-upload-50 hover:bg-upload-100  text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
	buttonText={'Actualitzar'}
/>
