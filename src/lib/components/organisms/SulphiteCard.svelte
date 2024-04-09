<script>
	import { deleteSulphite, getSulphites } from '$lib/api/sulphitesCalls';
	import testTube from '$lib/assets/img/testTube.png';
	export let sulphiteMin;
	export let sulphiteMax;
	export let id;

	const handleDelete = async () => {
		const result = await deleteSulphite(id);
		if (result.message === `Sulphite with ID: ${id} deleted successfully`) {
			await getSulphites();
		} else {
			console.error('Error deleting sulphite');
		}
	};
</script>

<div class="w-full" data-id={id}>
	<div class="bg-white rounded-lg shadow-lg p-3 hover:bg-secondary-50/5 transition-all">
		<img src={testTube} alt="Probeta d' assaig" class="w-12 inline" />
		<h2 class="text-xl font-bold">
			De {sulphiteMin} a {sulphiteMax} de sulfits (H<sub>2</sub>SO<sub>3</sub>)
		</h2>
		<div class="flex gap-3 mt-2 justify-end">
			<div class="edit">
				<button class="bg-ok-50 hover:bg-ok-100 text-white font-bold py-1 px-2 rounded"
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
