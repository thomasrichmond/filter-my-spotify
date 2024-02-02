// "use client";
import axios from "axios";
import { IUserProps } from "./User.types";
import {
  getSavedSongs,
  getTopSongs,
  getUserInformation,
} from "@/app/utils/user-data";

const User = async ({}: IUserProps) => {
  const accountDetails = await getUserInformation();
  const savedSongs = await getSavedSongs();
  const topSongs = await getTopSongs();

  // TODO Build in retry token functionality when data returns 401
  if (savedSongs === 401 || topSongs === 401) {
    //retryToken();
    //Get song data again
  }

  const userData = savedSongs.items.map((song) => {
    console.log(song.track.name);
    console.log(song);
  });

  // console.log(savedSongs);
  console.log(":::user:::", accountDetails);

  return (
    <div>
      <h1>Hello {accountDetails?.display_name}</h1>
    </div>
  );
};

export default User;
