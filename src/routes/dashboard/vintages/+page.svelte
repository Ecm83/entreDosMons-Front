<script>
	import CustomButton from '$lib/components/atoms/CustomButton.svelte';

	const handleOk = () => {
		console.log('OK');
	};

	const handleKo = () => {
		console.log('KO');
	};

	const handleWarn = () => {
		console.log('WARN');
	};

	const handlePut = () => {
		console.log('PUT');
	};
</script>

<h1>Anyades</h1>

<p>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, error voluptatibus? Minus
	labore et ipsam impedit molestiae, blanditiis exercitationem officiis temporibus atque aspernatur
	odio, optio unde earum debitis soluta numquam.
</p>

<div>
	<CustomButton text={'Accepta'} handleClick={handleOk} customClass={'btn btn-ok'}></CustomButton>

	<CustomButton text={'Cancel·la'} handleClick={handleKo} customClass={'btn btn-ko'}></CustomButton>

	<CustomButton text={'Opcions'} handleClick={handleWarn} customClass={'btn btn-warn'}
	></CustomButton>

	<CustomButton text={'Actualitzar'} handleClick={handlePut} customClass={'btn btn-put'}
	></CustomButton>
</div>

<CustomButton
	text={'Prova'}
	handleClick={handlePut}
	customClass={'btn btn-ok shadow-default shadow-hover-subtle'}
></CustomButton>

<style>
	div {
		display: flex;
		gap: 1rem;
	}
</style>
