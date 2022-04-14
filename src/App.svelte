<script>
	import {onMount, tick} from 'svelte';

	let user = {};

	onMount(async() => {
		const res = await fetch("/api/user/profile");
		user = await res.json();
	});

	async function handleUpdate() {
		const res = await fetch("/api/user/beer");
		user = await res.json();
		await tick();
	}

</script>

	<div bind:this={user}>
		<h1>Hello {user.name}!</h1>
		<p>You've had { user.beers } beers</p>
	</div>
	<button on:click={handleUpdate}>Drink Beer</button>
