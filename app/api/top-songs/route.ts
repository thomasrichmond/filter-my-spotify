import axios from 'axios';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAccessToken, setAccessToken } from '../_auth';
import { cookies } from 'next/headers';


let topSongs: any;

export async function GET(request: NextRequest) {

  const cookie = cookies();
  const authToken = cookie.get("t")?.value;
  const skipParam = request.url.split('=')[1];

  await axios
    .get(`https://api.spotify.com/v1/me/top/tracks?limit=50&offset=${skipParam}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      topSongs = res.data;
    })
    .catch((err) => {
      console.log(":::ERROR TRACKS:::", err?.response?.data);
      return err?.response?.data;
    });


  return NextResponse.json(topSongs, { status: 200 })

}