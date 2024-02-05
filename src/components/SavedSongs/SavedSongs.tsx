"use client";
import { getSavedSongs, getTotalSavedSongs } from "@/app/utils/user-data";
import { ISavedSongsProps } from "./SavedSongs.types";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button/Button";

const SavedSongs = ({ songPayload }: ISavedSongsProps) => {
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
        res.data.items.forEach((song: any, index: number) => {
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

  const data = userData.map((song: any, songIndex: number) => {
    return (
      <ul key={`saved-songs-${songIndex}`}>
        <li>Track name: {song.track.name}</li>
        <li> Artist: {song.track.artists[0].name}</li>
        <li>Image: {song.track.album.images[0].url}</li>
      </ul>
    );
  });

  return (
    <div>
      <h1>User data: </h1>
      {data}
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