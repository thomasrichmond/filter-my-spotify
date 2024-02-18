"use client";
import { getSavedSongs, getTotalSavedSongs } from "@/app/utils/user-data";
import { ISavedSongsProps } from "./SavedSongs.types";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { setRefreshCookies } from "@/app/utils/authorise-user";

const SavedSongs = ({
  songPayload,
  refreshToken,
  tokenHasError,
}: ISavedSongsProps) => {
  const [userData, setUserData] = useState<any>(songPayload.items);
  const [viewMoreCount, setViewMoreCount] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const skipIndex = 50 * viewMoreCount;

  const getUserData = async () => {
    setIsDataLoading(true);

    await axios
      .get(`api/saved-songs?skip=${skipIndex}`)
      .then((res) => {
        let resArray: any = [];
        JSON.parse(res.data).forEach((song: any, index: number) => {
          resArray.push(song);
        });
        setUserData(userData.concat(resArray));
        setViewMoreCount(viewMoreCount + 1);
        setIsDataLoading(false);
      })
      .catch((err) => {
        setIsDataLoading(false);
        return err;
      });
  };

  useEffect(() => {
    if (tokenHasError) {
      setRefreshCookies(refreshToken);
    }
  }, []);

  const data = userData.map((song: any, songIndex: number) => {
    return (
      <Card
        key={`song-card-${songIndex}`}
        title={song.track.name}
        description={song.track.artists[0].name}
        imageUrl={song.track.album.images[0].url}
        genre={song.genre}
      />
    );
  });

  return (
    <div>
      <h1>User data: </h1>
      <div className="grid grid-cols-4 gap-3">{data}</div>
      <Button
        type="button"
        label={isDataLoading ? "Loading..." : "View more"}
        click={() => {
          getUserData();
        }}
      />
    </div>
  );
};

export default SavedSongs;
