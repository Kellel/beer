<script>
	import {onMount} from 'svelte';
	import http from './store.ts'	
	const user = http({});

	let loaded;
	let userProfile;
	user.subscribe(value => {
		if (value && value.name) {
			loaded = true;
		} else {
			loaded = false;
		}
	});
	user.subscribe(value => {
		userProfile = value;
		console.log("setting userprofile" + value);
	});

	
	onMount(async () => {
		user.get();
	})

	function increment() {
		user.beer();
	}

	function onSubmit(e) {
		const formData = new FormData(e.target);

		const data = {};
		for (let field of formData) {
			const [key,value] = field;
			data[key] = value;
		}
		console.log("User: " + data.name);
		console.log(data);
		user.new(data);
		user.get();
	}


</script>

{#if loaded }
<div >
	<h1>Hello {userProfile.name}!</h1>
	<p>You've had { userProfile.beers } beers</p>
</div>
<button on:click={increment}>Drink Beer</button>
{:else}
<p>Welcome! What is your name?</p>
<form on:submit|preventDefault={onSubmit}>
  <label for="name">Name</label>
  <input type="text" id="name" name="name">
  <button type="submit">Submit</button>
</form>
{/if}
