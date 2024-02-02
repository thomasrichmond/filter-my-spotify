import axios from 'axios';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAccessToken, setAccessToken } from '../_auth';

export async function GET(request: NextRequest) {

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const credentialsBase64 = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const refreshToken = getAccessToken()?.refreshToken
  const url = 'https://accounts.spotify.com/api/token'


  const postBody = {
    'grant_type': 'refresh_token',
    'refresh_token': refreshToken
  }

  const postHeaders = {
    'content-type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${credentialsBase64}`
  }

  await axios.post(url, postBody, { headers: postHeaders }).then((res) => {
    const accessObject = {
      token: res.data.access_token,
      tokenType: res.data.token_type,
      expiresIn: res.data.expires_in,
      refreshToken: res.data.refresh_token,
      scope: res.data.scope
    }

    setAccessToken(accessObject)
  })

  return NextResponse.json({ status: 200 })
}