<script>
	import { VoiceRecognition } from '$lib/components/molecules';
	import { Modal } from 'flowbite-svelte';
	import { CustomButton, Input } from '$lib/components/atoms';
	import { addSupplier, getSuppliers } from '$lib/api';

	import { onMount, createEventDispatcher } from 'svelte';

	export let openModal = false;

	let dispatch = createEventDispatcher();

	$: companyName = '';
	$: brandName = '';
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
				companyName,
				brandName,
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
			companyName = '';
			brandName = '';
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

<Modal title="Crear nou proveïdor" bind:open={openModal} size="lg" autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<Input
				divId="companyName"
				inputDescription="Introdueix el nom comercial"
				inputType="text"
				bind:inputValue={brandName}
				inputClass={'focus:border-black'}
			/>
		</div>

		<div class="mb-4">
			<Input
				divId="brandName"
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
