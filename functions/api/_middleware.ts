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
	// DEV just return dummy data
	if (aud === "DEV"){
		var dummy: JWT = {
			email: "test@foo.com",
			sub: "1234-abcd-1234-abca"
		}
		return dummy
	}
    var decoded: JWT = jwt_decode(jwtAssertion)
    if (decoded.aud[0] != aud) {
        return false
    }

    return decoded;
  };

  const cloudflareAccessMiddleware =
    async ({ request, env, next, data }) => {
      const  aud = env.AUD;
  
      const jwtPayload = await validateJWT(
        request.headers.get("CF-Access-JWT-Assertion"),
        aud
      );
  
      if (jwtPayload === false)
        return new Response("Access denied.", { status: 403 });
  
      // We could also use the data object to pass information between middlewares
      data.user = jwtPayload;
  
      return await next();
    };
  
  export const onRequest = [cloudflareAccessMiddleware];
