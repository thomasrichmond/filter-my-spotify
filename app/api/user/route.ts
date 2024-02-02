import axios from 'axios';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAccessToken, setAccessToken } from '../_auth';
import { cookies } from 'next/headers';

let savedSongs: any;
let topSongs: any;
let savedSuccess = false
let topSongSuccess = false

export async function GET(request: NextRequest) {

  const cookie = cookies();
  const authToken = cookie.get("t")?.value;

  await axios
    .get("https://api.spotify.com/v1/me/tracks", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {

      savedSuccess = true
      savedSongs = res.data;
    })
    .catch((err) => {
      // retryToken();
      return err;
    });

  await axios
    .get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      topSongSuccess = true;
      topSongs = res.data;
    })
    .catch((err) => {
      // retryToken();
      console.log(":::ERROR TRACKS:::", err?.response?.data);
      return err;
    });

  const userObject = {
    isSongSaved: savedSuccess,
    isTopSaved: topSongSuccess,
    savedSongs: savedSongs,
    topSongs: topSongs,
  }

  return NextResponse.json(userObject, { status: 200 })

}