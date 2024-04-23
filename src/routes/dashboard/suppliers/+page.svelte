<script>
	import { suppliers } from '$lib/stores';
	import { getSuppliers } from '$lib/api';
	import { onMount } from 'svelte';
	import { CustomButton, UserAlert } from '$lib/components/atoms';
	import { SupplierCreateModal, SupplierCard } from '$lib/components/organisms';

	let openModal = false;

	let suppliersData = [];

	$: $suppliers, (suppliersData = $suppliers);

	let showAlert = false;
	let alertColor = '';
	let alertType = '';
	let alertText = '';

	const handleCreate = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText = e.detail.status === 'success' ? 'Proveïdor creat' : `No s'ha crear el proveïdor.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	const handleUpdate = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText =
			e.detail.status === 'success'
				? 'Proveïdor actualitzat'
				: `No s'ha pogut actualitzar el proveïdor.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	const handleDelete = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText =
			e.detail.status === 'success' ? 'Proveïdor eliminat' : `No s'ha pogut eliminar el proveïdor.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	onMount(async () => {
		await getSuppliers();
	});
</script>

{#if showAlert}
	<UserAlert color={alertColor} infoAlert={alertType} infoText={alertText} />
{/if}

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Proveïdors <CustomButton
			buttonText={'Crea nou Proveïdor'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				openModal = true;
			}}
		/>
	</h1>

	{#if $suppliers.length === 0}
		<p>No hi ha proveïdors</p>
	{:else}
		<div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
			{#each suppliersData as supplier (supplier.id)}
				<SupplierCard
					on:updateSupplier={handleUpdate}
					on:deleteSupplier={handleDelete}
					id={supplier.id}
					companyName={supplier.companyName}
					brandName={supplier.brandName}
					country={supplier.country}
					city={supplier.city}
					adress={supplier.adress}
					CP={supplier.CP}
					businessPhone={supplier.businessPhone}
					contactName={supplier.contactName}
					contactPhone={supplier.contactPhone}
					businessEmail={supplier.businessEmail}
					contactEmail={supplier.contactEmail}
					description={supplier.description}
				/>
			{/each}
		</div>
	{/if}
</div>

<SupplierCreateModal bind:openModal on:createSupplier={handleCreate} />
