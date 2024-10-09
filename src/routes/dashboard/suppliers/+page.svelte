<script>
	import { onMount } from 'svelte';
	import { suppliers } from '$lib/stores';
	import { getSuppliers } from '$lib/api';
	import { CustomButton, UserAlert } from '$lib/components/atoms';
	import { SupplierCard, SupplierCreateModal } from '$lib/components/organisms';

	let openModal = false;

	let showAlert = false;
	let alertColor = '';
	let alertType = '';
	let alertText = '';

	let suppliersData = [];

	$: $suppliers, (suppliersData = $suppliers);

	const handleCreate = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText =
			e.detail.status === 'success' ? 'Proveïdor creat' : `No s'ha pogut crear el proveïdor.`;
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
				? 'Proveïdor actualizat'
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
		Proveïdors<CustomButton
			buttonText={'Crea proveïdor'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => (openModal = true)}
		/>
	</h1>
	{#if suppliersData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha proveïdors per mostrar. Crea el primer amb el botó "Crea proveïdor"</p>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-1 sm:grid-cols-1">
			{#each suppliersData as supplier (supplier.id)}
				<SupplierCard
					on:deleteSupplier={handleDelete}
					on:updateSupplier={handleUpdate}
					id={supplier.id}
					companyName={supplier.companyName}
					fiscalName={supplier.fiscalName}
					NIF={supplier.NIF}
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
