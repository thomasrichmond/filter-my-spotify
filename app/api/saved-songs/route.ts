import axios from 'axios';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAccessToken, setAccessToken } from '../_auth';
import { cookies } from 'next/headers';

let savedSongs: any;

export async function GET(request: NextRequest) {

  const cookie = cookies();
  const authToken = cookie.get("t")?.value;
  const skipParam = request.url.split('=')[1];
  let combinedData: any;

  await axios
    .get(`https://api.spotify.com/v1/me/tracks?limit=50&offset=${skipParam}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(async (res) => {

      savedSongs = res.data.items;

      //* Commented as it rates limits far too quickly, and spotify genre seeds are awful.
      // const genrePromise = savedSongs.map(async (song: any) => {

      //   await axios.get(`https://api.spotify.com/v1/artists/${song.track.album.artists[0].id}`, {
      //     headers: {
      //       Authorization: `Bearer ${authToken}`,
      //     },
      //   }).then((res) => {
      //     const targetObject = {
      //       genre: res.data.genres[0]
      //     }

      //     const combinedObj = Object.assign(targetObject, song)
      //     combinedRes.push(combinedObj)
      //   })
      // })

      // await Promise.all(genrePromise).then(() => {
      //   combinedData = JSON.stringify(combinedRes)
      // })


    })
    .catch((err) => {
      console.log(":::ERROR TRACKS:::", err?.response?.data);
      return err?.response?.data;
    });


  return NextResponse.json(savedSongs, { status: 200 })
}