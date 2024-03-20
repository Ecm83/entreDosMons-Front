<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<NavBar />
<div class="container max-w-screen-xl mx-auto p-4">
	<slot />
</div>
