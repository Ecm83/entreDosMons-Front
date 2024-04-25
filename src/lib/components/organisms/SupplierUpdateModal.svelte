<script>
	import { Modal, Button } from 'flowbite-svelte';
	import { Input } from '$lib/components/atoms';
	import { VoiceRecognition } from '$lib/components/molecules';
	import { createEventDispatcher } from 'svelte';
	import { updateSupplier } from '$lib/api/suppliersCalls';

	export let openModal = false;
	export let id;
	export let companyName;
	export let fiscalName;
	export let NIF;
	export let country;
	export let city;
	export let adress;
	export let CP;
	export let businessPhone;
	export let contactName;
	export let contactPhone;
	export let businessEmail;
	export let contactEmail;
	export let description;

	const dispatch = createEventDispatcher();

	const handleUpdateSupplier = async () => {
		const result = await updateSupplier(
			id,
			companyName,
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

		if (result.error) {
			console.error('Error updating supplier:', result.error);
			dispatch('updateSupplier', { status: 'error' });
		} else {
			console.log('Supplier updated successfully');
			dispatch('updateSupplier', { status: 'success' });
		}
	};
</script>

<Modal title="Modificar proveïdor" bind:open={openModal} size="lg" autoclose>
	<div class="rounded-md">
		<div class="mb-4">
			<Input
				divId="supplier"
				inputDescription="Nom comercial"
				inputType="text"
				bind:inputValue={companyName}
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
		<Button
			class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			on:click={handleUpdateSupplier}
			on:updateSupplier
		>
			Actualiza</Button
		>
		<Button
			class="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
			hover:scale-50 transition-transform color-white">Cancel·la</Button
		>
	</svelte:fragment>
</Modal>
