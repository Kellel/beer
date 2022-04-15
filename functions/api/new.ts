
export async function onRequest(context) {
    const { env,  params, request, data } = context;
    const userID: string = data.user.sub
    console.log(data)

    const body = await request.json()
    console.log("New user: " + body.name)

    var newUser :UserProfile = {
        name: body.name,
        beers: 0
    };

    var userString = JSON.stringify(newUser);

    console.log(userID, newUser);
    await env.BeerUsers.put(userID, userString)

    return new Response(userString);
}
