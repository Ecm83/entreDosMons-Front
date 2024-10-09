<script>
	import { deleteSupplier, getSuppliers } from '$lib/api';
	import { createEventDispatcher } from 'svelte';
	import { SupplierUpdateModal } from '$lib/components/organisms';

	let openModal = false;

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

	const handleDelete = async () => {
		try {
			const result = await deleteSupplier(id);
			if (result.message === `Supplier with ID: ${id} deleted successfully`) {
				await getSuppliers();
				dispatch('deleteSupplier', { status: 'success' });
			} else {
				console.error('Error deleting supplier');
			}
		} catch (error) {
			console.error('Error deleting supplier');
			dispatch('deleteSupplier', { status: 'error' });
		}
	};
</script>

<div class="w-full" data-id={id}>
	<div class="bg-white rounded-lg shadow-lg p-3 hover:bg-secondary-50/5 transition-all">
		<div class="flex justify-between p-2">
			<div>
				<h2 class="text-xl font-bold">{companyName}</h2>
				<h3><span class="font-semibold">Nom fiscal:</span> {fiscalName}</h3>
				<h3><span class="font-semibold">NIF:</span> {NIF}</h3>
			</div>

			<div>
				<h3><span class="font-semibold">Adreça: </span> {adress}</h3>
				<h3><span class="font-semibold">CP:</span> {CP}</h3>
				<h3><span class="font-semibold">Ciutat:</span> {city}</h3>
				<h3><span class="font-semibold">País:</span> {country}</h3>
			</div>
		</div>

		<hr class="mt-4 mb-4" />

		<h3 class="text-center font-bold">Contactes</h3>
		<div class="flex justify-between p-2">
			<div>
				<h3 class="font-semibold">Empresa:</h3>
				<h3><span class="font-semibold">Telf empresa: </span>{businessPhone}</h3>
				<h3><span class="font-semibold">Email empresa: </span>{businessEmail}</h3>
			</div>

			<div>
				<h3 class="font-semibold">Persona:</h3>
				<h3><span class="font-semibold">Nom contacte: </span>{contactName}</h3>
				<h3><span class="font-semibold">Telf contacte:</span>{contactPhone}</h3>
				<h3><span class="font-semibold">Email contacte:</span>{contactEmail}</h3>
			</div>
		</div>

		<hr class="mt-4 mb-4" />

		<h3 class="text-center font-bold mb-3">Descripció</h3>
		<p>{description}</p>
		<hr class="mt-4 mb-4" />
		<div class="flex gap-3 mt-2 justify-end">
			<div class="edit">
				<button
					on:click={() => {
						openModal = true;
					}}
					class="bg-ok-50 hover:bg-ok-100 text-white font-bold py-1 px-2 rounded"
					><svg
						class="w-4 h-4 text-white dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
						/>
					</svg>
				</button>
			</div>
			<div class="delete">
				<button
					on:click={handleDelete}
					class="bg-delete-50 hover:bg-delete-100 text-white font-bold py-1 px-2 rounded"
					><svg
						class="w-4 h-4 text-white dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>

<SupplierUpdateModal
	{id}
	bind:openModal
	bind:companyName
	bind:fiscalName
	bind:NIF
	bind:country
	bind:city
	bind:adress
	bind:CP
	bind:businessPhone
	bind:contactName
	bind:contactPhone
	bind:businessEmail
	bind:contactEmail
	bind:description
	on:updateSupplier
/>
