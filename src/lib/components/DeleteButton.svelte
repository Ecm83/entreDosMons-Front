<script>
	import CustomButton from './CustomButton.svelte';

	export let handleDelete;
</script>

<CustomButton
	handleClick={handleDelete}
	btnClasses={'text-white w-20 bg-delete-50 hover:bg-delete-100  text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
	buttonText={'Eliminar'}
/>
