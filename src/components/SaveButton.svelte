<script>
	import CustomButton from './CustomButton.svelte';
	export let handleSave;
</script>

<CustomButton
	handleClick={handleSave}
	btnClasses={'text-white w-20 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
/>
