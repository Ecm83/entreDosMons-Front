<script>
	import { VoiceRecognition } from '$lib/components/molecules';
	import { Modal } from 'flowbite-svelte';
	import { CustomButton, Input } from '$lib/components/atoms';
	import { addSupplier, getSuppliers } from '$lib/api';
	import { onMount, createEventDispatcher } from 'svelte';

	export let openModal = false;

	let dispatch = createEventDispatcher();

	$: newSupplier = '';
	$: fiscalName = '';
	$: NIF = '';
	$: country = '';
	$: city = '';
	$: adress = '';
	$: CP = '';
	$: businessPhone = '';
	$: contactName = '';
	$: contactPhone = '';
	$: businessEmail = '';
	$: contactEmail = '';
	$: description = '';

	const handleCreateSupplier = async () => {
		try {
			const createdSupplier = await addSupplier(
				newSupplier,
				fiscalName,
				NIF,
				country,
				city,
				adress,
				CP,
				businessPhone,
				contactName,
				contactPhone,
				businessEmail,
				contactEmail,
				description
			);
			console.log(createdSupplier);
			if (createdSupplier.message === 'Supplier created successfully') {
				await getSuppliers();
				dispatch('createSupplier', { status: 'success' });
			}
		} catch (error) {
			console.error('Error creating supplier');
			dispatch('createSupplier', { status: 'error' });
		} finally {
			newSupplier = '';
			fiscalName = '';
			NIF = '';
			country = '';
			city = '';
			adress = '';
			CP = '';
			businessPhone = '';
			contactName = '';
			contactPhone = '';
			businessEmail = '';
			contactEmail = '';
			description = '';
		}
	};

	onMount(async () => {
		const suppliers = await getSuppliers();
		console.log(suppliers);
	});
</script>

<Modal title="Crear proveïdor" bind:open={openModal} size="xl" autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<Input
				divId="supplier"
				inputDescription="Nom comercial"
				inputType="text"
				bind:inputValue={newSupplier}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="fiscalName"
				inputDescription="Nom fiscal"
				inputType="text"
				bind:inputValue={fiscalName}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="nif"
				inputDescription="NIF"
				inputType="text"
				bind:inputValue={NIF}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="country"
				inputDescription="País de l'empresa"
				inputType="text"
				bind:inputValue={country}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="city"
				inputDescription="Ciutat de l'empresa"
				inputType="text"
				bind:inputValue={city}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="adress"
				inputDescription="Adreça de l'empresa"
				inputType="text"
				bind:inputValue={adress}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="cp"
				inputDescription="CP"
				inputType="text"
				bind:inputValue={CP}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="telf"
				inputDescription="Telèfon"
				inputType="text"
				bind:inputValue={businessPhone}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="contactName"
				inputDescription="Nom de la persona de contacte"
				inputType="text"
				bind:inputValue={contactName}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="contactPhone"
				inputDescription="Telèfon de la persona de contacte"
				inputType="text"
				bind:inputValue={contactPhone}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="businessEmail"
				inputDescription="Email"
				inputType="text"
				bind:inputValue={businessEmail}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="contactEmail"
				inputDescription="Email de la persona de contacte"
				inputType="text"
				bind:inputValue={contactEmail}
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
			handleClick={handleCreateSupplier}
			buttonText={'Crea'}
		></CustomButton>
		<CustomButton
			btnClasses="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
			hover:scale-50 transition-transform color-white"
			buttonText={'Cancel·la'}
		/>
	</svelte:fragment>
</Modal>
