<script>
	import { Modal, Button } from 'flowbite-svelte';
	import { Input } from '$lib/components/atoms';
	import { VoiceRecognition } from '$lib/components/molecules';
	import { createEventDispatcher } from 'svelte';
	import { updateSupplier } from '$lib/api';

	export let openModal = false;
	export let brandName;
	export let companyName;
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
	export let id;

	const dispatch = createEventDispatcher();

	const handleUpdateSupplier = async () => {
		try {
			const result = await updateSupplier(
				id,
				brandName,
				companyName,
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
			if (result.message === `Supplier with ID: ${id} updated successfully`) {
				console.log('Supplier updated successfully');
				dispatch('updateSupplier', { status: 'success' });
			} else {
				console.error('Error updating supplier');
				dispatch('updateSupplier', { status: 'error' });
			}
		} catch (error) {
			console.error('Error updating supplier');
			dispatch('updateSupplier', { status: 'error' });
		}
	};
</script>

<Modal title="Modifica el proveïdor" bind:open={openModal} size="sm" autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<Input
				divId="brnadName"
				inputDescription="Introdueix el nom comercial"
				inputType="text"
				bind:inputValue={brandName}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="companyName"
				inputDescription="Introdueix la raó social"
				inputType="text"
				bind:inputValue={companyName}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="country"
				inputDescription="Introdueix el país de l' empresa"
				inputType="text"
				bind:inputValue={country}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="city"
				inputDescription="Introdueix la ciutat de l' empresa"
				inputType="text"
				bind:inputValue={city}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="address"
				inputDescription="Introdueix l' adreça de l' empresa"
				inputType="text"
				bind:inputValue={adress}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="cp"
				inputDescription="Códig postal de l' empresa"
				inputType="text"
				bind:inputValue={CP}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="businessPhone"
				inputDescription="Introdueix el telf de l' empresa"
				inputType="text"
				bind:inputValue={businessPhone}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="contactName"
				inputDescription="Introdueix la persona de contacte"
				inputType="text"
				bind:inputValue={contactName}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="contactPhone"
				inputDescription="Introdueix el telf de contacte"
				inputType="text"
				bind:inputValue={contactPhone}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="businessEmail"
				inputDescription="Introdueix l' email de l' empresa"
				inputType="email"
				bind:inputValue={businessEmail}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="contactEmail"
				inputDescription="Introdueix l' email del contacte"
				inputType="email"
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
			on:updateGrape
		>
			Actualiza</Button
		>
		<Button
			class="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
			hover:scale-50 transition-transform color-white">Cancel·la</Button
		>
	</svelte:fragment>
</Modal>
