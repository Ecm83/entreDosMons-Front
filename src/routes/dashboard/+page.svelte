<script>
	import { user } from '../../store/user.js';
	import { derived } from 'svelte/store';

	const userInfo = derived(user, ($user) => ({
		userEmail: $user ? $user.user.email : '',
		token: $user ? $user.token : ''
	}));

	user.subscribe(($user) => {
		console.log('Store user:', $user);
	});
</script>

<h1>DASHBOARD PAGE MAIN</h1>

{#if $userInfo}
	<p>Usuari: {$userInfo.userEmail}</p>
	<p>Token: {$userInfo.token}</p>
{/if}
