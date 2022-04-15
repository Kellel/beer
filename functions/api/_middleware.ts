import * as jose from 'jose'

  const cloudflareAccessMiddleware =
    async ({ request, env, next, data }) => {
      const aud = env.AUD;
      const certUrl = "https://" + env.TEAM_DOMAIN + "/cdn-cgi/access/certs";
      console.log(certUrl);

      const jwt = request.headers.get("CF-Access-JWT-Assertion");

      return new Response("foo", { status: 403 });

      const JWKS = jose.createRemoteJWKSet(new URL(certUrl));
      const { payload, header } = await jose.jwtVerify(jwt, JWKS, { audience: aud });
      console.log(payload);
  
      if (!payload)
        return new Response("Access denied.", { status: 403 });
  
      // We could also use the data object to pass information between middlewares
      data.user = payload;
  
      return await next();
    };
  
export const onRequest = [cloudflareAccessMiddleware];
