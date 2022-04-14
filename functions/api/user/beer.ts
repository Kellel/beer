export async function onRequest(context) {
	const { env, request, data } = context;
	
	var user = data.profile;
	user.beers += 1;

	var userString = JSON.stringify(user)

	await env.BeerUsers.put(data.user.sub, userString)
	return new Response(userString)
}
