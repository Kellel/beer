import jwt_decode from 'jwt-decode';

interface JWT {
    aud: [string];
    email: string;
    exp: number;
    iat: number;
    iss: string;
    nonce: string;
    sub: string;
}

const validateJWT = async (jwtAssertion: string | null, aud: string) => {
    // If the JWT is valid, return the JWT payload
    // Else, return false
    // https://developers.cloudflare.com/cloudflare-one/identity/users/validating-json
    var decoded: JWT = jwt_decode(jwtAssertion)
    if (decoded.aud[0] != aud) {
        return false
    }

    return decoded;
  };

  const cloudflareAccessMiddleware =
    async ({ request, env, next, data }) => {
      const { aud } = (env.AUD);
  
      const jwtPayload = await validateJWT(
        request.headers.get("CF-Access-JWT-Assertion"),
        aud
      );
  
      if (jwtPayload === false)
        return new Response("Access denied.", { status: 403 });
  
      // We could also use the data object to pass information between middlewares
      data.user = jwtPayload.email;
  
      return await next();
    };
  
  export const onRequest = [cloudflareAccessMiddleware];