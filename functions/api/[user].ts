
export interface UserProfile {
    Name: string;
    ID: string;
    beers: number;
}

export async function onRequest(context) {
    const { env,  params } = context;
    let user = params.user
    const userProfile:UserProfile = await env.BeerUsers.get(user)
    if (userProfile == null) {
        return new Response('User not found', { status : 404 })
    }
    return new Response(JSON.stringify(userProfile));
}