
export async function onRequest(context) {
    const { env,  data } = context;
    return new Response(JSON.stringify(data.profile));
}
