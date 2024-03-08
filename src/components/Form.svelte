<script>
	export let formName = 'Form';
</script>

<div>
	<form class="max-w-xl mx-auto p-5 border rounded-lg shadow-md bg-white">
		<fieldset class=" space-y-5 p-4 rounded-md w-100%">
			<legend class="text-2xl font-bold text-center text-gray-900 font">
				{formName}
			</legend>

			<div class="w-full">
				<slot />
			</div>
		</fieldset>
	</form>
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 700px;
	}
</style>
