import axios from "axios";
import { cookies } from "next/headers";
import { setupCache } from "axios-cache-adapter";

// * Below are server side util functions to call data in the app
// * these are designed to be used in SSR components or used as functions in CSR comps

const cookie = cookies();
const authToken = cookie.get("t")?.value;

export async function getTotalSavedSongs() {
  const totalSongs = await axios
    .get(`https://api.spotify.com/v1/me/tracks`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      return res.data.total;
    })
    .catch((err) => {
      console.log(":::ERROR:::", err?.response?.data);
      return err?.response?.data?.error?.status;
    });

  return totalSongs;
}

export async function getAllSavedSongs() {
  const totalSongs = await getTotalSavedSongs();
  const totalPages = totalSongs / 50;
  let totalSongArray: any = [];

  for (let i = 0; i <= totalPages; i++) {
    const res = await fetch(
      `https://api.spotify.com/v1/me/tracks?limit=50&offset=${i * 50}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        cache: "force-cache",
      }
    );
    const resData = await res.json();
    resData.items.forEach((song: any) => {
      totalSongArray.push(song);
    });
    console.log(":::RESDATA:::", resData);
  }

  return totalSongArray;
}

export async function getSavedSongs(nextPageOfResults?: number) {
  const indexOffset = nextPageOfResults ?? 0;
  const songData = await axios
    .get(
      `https://api.spotify.com/v1/me/tracks?limit=50&offset=${indexOffset}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(":::ERROR:::", err?.response?.data);
      return err?.response?.data?.error?.status;
    });

  return songData;
}

export async function getTopSongs(nextPageOfResults?: number) {
  const indexOffset = nextPageOfResults ?? 0;

  const topSongsData = await axios
    .get(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&offset=${indexOffset}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(":::ERROR:::", err?.response?.data);
      return err?.response?.data?.error?.status;
    });

  return topSongsData;
}

export async function getUserInformation() {
  const userData = await axios
    .get(`https://api.spotify.com/v1/me/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(":::ERROR:::", err?.response?.data);
      return err?.response?.data?.error?.status;
    });

  return userData;
}
