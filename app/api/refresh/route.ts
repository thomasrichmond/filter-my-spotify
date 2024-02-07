import axios from 'axios';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const refreshToken = request.nextUrl.searchParams.get('r') ?? null
  const url = "https://accounts.spotify.com/api/token";
  let refreshSuccess = false;
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const credentialsBase64 = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );
  let access = '';


  const body = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  };

  await axios
    .post(url, body, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentialsBase64}`,
      },
    })
    .then((res: any) => {
      refreshSuccess = true;
      console.log(res.data)
      access = res.data.access_token
    })
    .catch((err) => {
      console.log(err?.response?.data);
    });

  let response = NextResponse.json(refreshSuccess, { status: 200 })
  response.cookies.set("cook", access!, { httpOnly: true });
  response.cookies.set("t", access!, { httpOnly: true });

  return response
}
