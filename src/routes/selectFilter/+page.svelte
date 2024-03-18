<script>
	import CustomButton from '../../components/CustomButton.svelte';

	let classicMenu = () => {
		console.log('Classic Button clicked');
	};

	let advancedMenu = () => {
		console.log('Advanced Button clicked');
	};
</script>

<div class="flex flex-col justify-center bg-secondary-100">
	<div class="text-center w-full">
		<!-- Este div contiene el texto centrado -->
		<h1>Benvinguts al restaurant Entre Dos Mons</h1>
		<p>Escolliu el médoe de navegacio</p>
	</div>
	<div class="w-3/4 mx-auto mt-5">
		<CustomButton
			handleClick={classicMenu}
			buttonText={'Carta Clásica'}
			btnClasses={'text-white w-full bg-primary-50 hover:bg-secondary-50 hover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-105 transition-transform color-white'}
		/>
		<CustomButton
			handleClick={advancedMenu}
			buttonText={'Carta Avançada'}
			btnClasses={'text-white w-full bg-primary-50 hover:bg-secondary-50 hover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-105 transition-transform mt-5 color-white'}
		/>
	</div>
</div>
