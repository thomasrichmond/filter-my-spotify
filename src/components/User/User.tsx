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
import { getRefreshToken } from "@/app/utils/authorise-user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const User = async ({}: IUserProps) => {
  let accountDetails = await getUserInformation();
  let savedSongs = await getSavedSongs();
  let topSongs = await getTopSongs();
  let requestSuccess = true;

  // const totalSongList = await getAllSavedSongs();

  //* Refresh token logic so user can stay signed into app
  if (savedSongs === 401 || topSongs === 401) {
    requestSuccess = false;
    const refresh = await getRefreshToken();

    if (refresh) {
      requestSuccess = true;
      // revalidatePath("/");
      // TODO confirm if the redirect triggers the re-redner correctly
      redirect("/");
    }
  }

  return (
    <div>
      {requestSuccess && (
        <>
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
        </>
      )}
    </div>
  );
};

export default User;
