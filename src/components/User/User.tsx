import axios from "axios";
import { IUserProps } from "./User.types";
import {
  getAllSavedSongs,
  getSavedSongs,
  getTopSongs,
  getTotalSavedSongs,
  getUserInformation,
  setRandomCookies,
} from "@/app/utils/user-data";
import SavedSongs from "../SavedSongs";
import { Suspense } from "react";
import TotalSongs from "../TotalSongs";
import { cookies } from "next/headers";

const User = async ({}: IUserProps) => {
  let accountDetails = await getUserInformation();
  let savedSongs = await getSavedSongs();
  let topSongs = await getTopSongs();
  let requestSuccess = true;
  const cookieStore = cookies();
  let refreshedAccess = undefined;
  const refresh = cookieStore.get("r")?.value;
  let tokenHasError = false;

  //* Refresh token logic so user can stay signed into app
  if (savedSongs === 401 || topSongs === 401) {
    tokenHasError = true;
    requestSuccess = false;

    const res = await fetch(`http://localhost:3000/api/refresh?r=${refresh}`);
    const resData = await res.json();

    requestSuccess = resData.requestSuccess;
    refreshedAccess = resData.accessToken;

    //TODO More testing to ensure this is not needed, then removing and refactoring.
    // accountDetails = await getUserInformation(refreshedAccess);
    // savedSongs = await getSavedSongs(undefined, refreshedAccess);
    // topSongs = await getTopSongs(undefined, refreshedAccess);

    accountDetails = await getUserInformation();
    savedSongs = await getSavedSongs();
    topSongs = await getTopSongs();
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
            <SavedSongs
              songPayload={savedSongs}
              refreshToken={refreshedAccess}
              tokenHasError={tokenHasError}
            />
          </Suspense>
          {/* <Suspense fallback={<h1>Loading total songs...</h1>}>
            <TotalSongs refreshToken={refreshedAccess} />
          </Suspense> */}
        </>
      )}
    </div>
  );
};

export default User;
