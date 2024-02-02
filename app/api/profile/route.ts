import axios from 'axios';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAccessToken, setAccessToken } from '../_auth';

export async function GET(request: NextRequest) {

  let responseData;
  const token = getAccessToken()?.token


  await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    responseData = res

    return NextResponse.json(responseData, { status: 200 })
  }).catch((err) => {
    return NextResponse.json({ 'ERROR': "ERROR" }, { status: 404 })
  })


  return NextResponse.json(responseData, { status: 200 })

}