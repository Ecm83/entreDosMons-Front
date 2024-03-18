<script>
	export let formName = 'Form';
	export let formClass;
	export let fieldsetClass;
	export let legendClass;
</script>

<div>
	<form class={formClass}>
		<fieldset class={fieldsetClass}>
			<legend class={legendClass}>
				{formName}
			</legend>
			<div class="w-full">
				<slot />
			</div>
		</fieldset>
	</form>
</div>
