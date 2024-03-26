<script>
	import '../../app.css';
	import LeftMenu from '../../lib/components/molecules/LeftMenu.svelte';
	// import { LeftMenu } from '$lib/components/molecules';
</script>

<div class="container mx-auto">
	<!-- <h1>DASHBOARD PAGE MAIN</h1> -->
	<div class="flex gap-4">
		<div class="">
			<LeftMenu />
		</div>
		<div class="w-full">
			<div class="flex flex-wrap mx-2">
				<slot />
			</div>
		</div>
	</div>
</div>
