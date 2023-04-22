import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsByGenreQuery } from "../redux/services/shazam";

const Genre = () => {
  const { genreType } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreType);

  if (isFetching) return <Loader title={`Loading ${genreType} Songs`} />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col px-6">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className=" font-black">{genreType}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Genre;
