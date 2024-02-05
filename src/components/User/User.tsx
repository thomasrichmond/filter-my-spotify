import axios from "axios";
import { IUserProps } from "./User.types";
import {
  getAllSavedSongs,
  getSavedSongs,
  getTopSongs,
  getTotalSavedSongs,
  getUserInformation,
} from "@/app/utils/user-data";
import SavedSongs from "../SavedSongs";
import { Suspense } from "react";
import TotalSongs from "../TotalSongs";

const User = async ({}: IUserProps) => {
  const accountDetails = await getUserInformation();
  const savedSongs = await getSavedSongs();
  const topSongs = await getTopSongs();

  const totalSongList = await getAllSavedSongs();

  // TODO Build in retry token functionality when data returns 401
  // TODO this needs to happen to reduce undefined val errors with data fetching
  if (savedSongs === 401 || topSongs === 401) {
    //retryToken();
    //Get song data again
  }

  return (
    <div>
      <h1>Hello {accountDetails?.display_name}</h1>
      <h3>
        Here are all of {accountDetails?.display_name}&apos;s recently saved
        songs
      </h3>
      <Suspense fallback={<h1>Loading...</h1>}>
        <SavedSongs songPayload={savedSongs} />
      </Suspense>
      <Suspense fallback={<h1>Loading total songs...</h1>}>
        <TotalSongs />
      </Suspense>
    </div>
  );
};

export default User;
