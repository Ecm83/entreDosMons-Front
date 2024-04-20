<script>
	import { Modal } from 'flowbite-svelte';
	import { Input, CustomButton } from '$lib/components/atoms';
	import { addSulphite, getSulphites } from '$lib/api';
	import { createEventDispatcher } from 'svelte';

	export let openModal = false;
	export let newSulphiteMin = '';
	export let newSulphiteMax = '';

	const dispatch = createEventDispatcher();

	const handleCreateSulphite = async () => {
		try {
			const createdSulphite = await addSulphite(newSulphiteMin, newSulphiteMax);
			if (createdSulphite.message === 'Sulphite created succesfully') {
				await getSulphites();
				dispatch('create', { status: 'success' });
			}
		} catch (error) {
			console.error('Error creating sulphite');
			dispatch('create', { status: 'error' });
		}
	};
</script>

<Modal title="Crear nou sulfit" bind:open={openModal} size="sm" autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4 flex justify-center items-center gap-3">
			<p>De</p>
			<Input
				divId="sulphiteMin"
				inputDescription="Min"
				inputType="number"
				bind:inputValue={newSulphiteMin}
				inputClass={'w-[150px] focus:border-black'}
			/>
			<br />
			<p>a</p>
			<Input
				divId="sulphiteMax"
				inputDescription="Max"
				inputType="number"
				bind:inputValue={newSulphiteMax}
				inputClass={' w-[150px] focus:border-black'}
			/>
			<p class="w-[300px]">Mg/l de sulfits</p>
		</div>
	</div>
	<svelte:fragment slot="footer">
		<CustomButton
			btnClasses={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			handleClick={handleCreateSulphite}
			buttonText={'Crea'}
		></CustomButton>
		<CustomButton
			btnClasses="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
			hover:scale-50 transition-transform color-white"
			buttonText={'Cancel·la'}
		/>
	</svelte:fragment>
</Modal>
