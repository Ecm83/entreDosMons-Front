<script>
	import { VoiceRecognition } from '$lib/components/molecules';
	import { Modal } from 'flowbite-svelte';
	import { CustomButton, Input } from '$lib/components/atoms';
	import { addGrape, getAllGrapes } from '$lib/api';
	import { onMount, createEventDispatcher } from 'svelte';

	export let openModal = false;

	let dispatch = createEventDispatcher();

	$: newGrape = '';
	$: description = '';

	const handleCreateGrape = async () => {
		try {
			const createdGrape = await addGrape(newGrape, description);
			console.log(createdGrape);
			if (createdGrape.message === 'Grape created successfully') {
				await getAllGrapes();
				dispatch('createGrape', { status: 'success' });
			}
		} catch (error) {
			console.error('Error creating grape');
			dispatch('createGrape', { status: 'error' });
		} finally {
			newGrape = '';
			description = '';
		}
	};

	onMount(async () => {
		await getAllGrapes();
	});
</script>

<Modal title="Crear nova varieteat de raïm" bind:open={openModal} size="sm" autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<Input
				divId="grape"
				inputDescription="Introdueix un raïm"
				inputType="text"
				bind:inputValue={newGrape}
				inputClass={'focus:border-black'}
			/>
		</div>
		<div class="mb-4">
			<VoiceRecognition
				bind:textValue={description}
				placeholder="Introdueix una descripció del raïm"
				lblSpech="Descripció del raïm"
			/>
		</div>
	</div>
	<svelte:fragment slot="footer">
		<CustomButton
			btnClasses={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			handleClick={handleCreateGrape}
			buttonText={'Crea'}
		></CustomButton>
		<CustomButton
			btnClasses="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
			hover:scale-50 transition-transform color-white"
			buttonText={'Cancel·la'}
		/>
	</svelte:fragment>
</Modal>
