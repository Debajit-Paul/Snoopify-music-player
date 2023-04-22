import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import PlayPause from "../components/PlayPause";

import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazam";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });

  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i = 0) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title="Searching song details" />;
  }

  if (error) return <Error />;
  console.log(data);

  return (
    <div className="flex flex-col">
      <DetailsHeader
        songData={songData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />

      <div className="mb-10 px-6">
        <div className=" mt-7 cursor-pointer">
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={songData}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(songData)}
          />
        </div>

        <h2 className=" text-white text-3xl mt-7 font-bold">Lyrics</h2>

        <div className="mt-8">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p key={i} className="text-white text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-white text-base my-1">Sorry, no lyrics found!</p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={Object.values(data)}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
