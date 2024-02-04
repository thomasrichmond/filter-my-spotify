import axios from "axios";
import { cookies } from "next/headers";

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
