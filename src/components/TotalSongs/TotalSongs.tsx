import { getAllSavedSongs, getTotalSavedSongs } from "@/app/utils/user-data";
import { ITotalSongsProps } from ".";

const TotalSongs = async ({ songPayload }: ITotalSongsProps) => {
  const totalSongs = await getAllSavedSongs();

  console.log(totalSongs);
  const data = totalSongs.map((song: any, songIndex: number) => {
    return (
      <ul key={`saved-songs-${songIndex}`}>
        <li>Track name: {song?.track?.name}</li>
        <li> Artist: {song?.track?.artists[0]?.name}</li>
        <li>Image: {song?.track?.album?.images[0]?.url}</li>
      </ul>
    );
  });

  return (
    <div>
      <h1>Total songs: </h1>
      {data}
    </div>
  );
};

export default TotalSongs;
