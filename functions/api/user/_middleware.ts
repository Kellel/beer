export async function onRequest(context) {
	const { env, next, data } = context;
	const userID = data.user.sub;
	const kvData = await env.BeerUsers.get(userID);
	console.log("Data: " + kvData);

	if (kvData == null) {
		return new Response('User not found', { status: 404 })
	}

	const userProfile:UserProfile = JSON.parse(kvData);
	console.log(userProfile);

	data.profile = userProfile;

	return await next();	
}


