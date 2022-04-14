export async function onRequest(context) {
	const { env, next, data } = context;
	const userID = data.user.sub;
	const userProfile:UserProfile = JSON.parse(await env.BeerUsers.get(userID));

	if (userProfile == null) {
		return new Response('User not found', { status: 404 })
	}

	console.log(userProfile);

	data.profile = userProfile;

	return await next();	
}


