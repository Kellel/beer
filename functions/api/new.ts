
export async function onRequest(context) {
    const { env,  params, request, data } = context;
    const userID: string = data.sub
    const body = JSON.parse(request.Body)

    var newUser :UserProfile = {
        Name: body.Name,
        Beers: 0
    };

    await env.BeerUsers.put(userID, newUser)

    return new Response(JSON.stringify(newUser));
}