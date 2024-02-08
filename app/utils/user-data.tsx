import axios from "axios";
import { cookies } from "next/headers";

// * Below are server side util functions to call data in the app
// * these are designed to be used in SSR components or used as functions in CSR comps

const cookie = cookies();
const authToken = cookie.get("t")?.value;

export async function getTotalSavedSongs(refreshToken?: string) {
  const token = refreshToken ?? authToken;
  const totalSongs = await axios
    .get(`https://api.spotify.com/v1/me/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data.total;
    })
    .catch((err) => {
      console.log(":::ERROR TOTAL SONGS:::", err?.response?.data);
      return err?.response?.data?.error?.status;
    });

  return totalSongs;
}

export async function getAllSavedSongs(refreshToken?: string) {
  const token = refreshToken ?? authToken;
  const totalSongs = await getTotalSavedSongs(refreshToken);
  const totalPages = totalSongs / 50;
  let totalSongArray: any = [];

  for (let i = 0; i <= totalPages; i++) {
    const res = await fetch(
      `https://api.spotify.com/v1/me/tracks?limit=50&offset=${i * 50}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "force-cache",
      }
    );
    const resData = await res.json();
    resData.items.forEach((song: any) => {
      totalSongArray.push(song);
    });
  }

  return totalSongArray;
}

export async function getSavedSongs(
  nextPageOfResults?: number,
  refreshToken?: string
) {
  const token = refreshToken ?? authToken;
  const indexOffset = nextPageOfResults ?? 0;
  const songData = await axios
    .get(
      `https://api.spotify.com/v1/me/tracks?limit=50&offset=${indexOffset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(":::ERROR SAVED SONGS:::", err?.response?.data);
      return err?.response?.data?.error?.status;
    });

  return songData;
}

export async function getTopSongs(
  nextPageOfResults?: number,
  refreshToken?: string
) {
  const token = refreshToken ?? authToken;
  const indexOffset = nextPageOfResults ?? 0;
  const topSongsData = await axios
    .get(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&offset=${indexOffset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(":::ERROR TOP SONGS:::", err?.response?.data);
      return err?.response?.data?.error?.status;
    });

  return topSongsData;
}

export async function getUserInformation(refreshToken?: string) {
  const token = refreshToken ?? authToken;
  const userData = await axios
    .get(`https://api.spotify.com/v1/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(":::ERROR USER INFORMATION:::", err?.response?.data);
      return err?.response?.data?.error?.status;
    });

  return userData;
}
