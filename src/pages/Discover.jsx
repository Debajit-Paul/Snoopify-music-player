import { useDispatch, useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { selectGenreListId } from "../redux/features/playerSlice";
import { TopPlay } from "../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import "swiper/css";

import { useGetSongsByGenreQuery } from "../redux/services/shazam";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="flex flex-col px-6 w-screen sm:w-full truncate">
      <Swiper
        slidesPerView="auto"
        spaceBetween={13}
        freeMode
        grabCursor
        modules={FreeMode}
        className="mt-2 mb-6"
      >
        {genres.map((genre) => (
          <SwiperSlide
            key={genre.value}
            style={{ width: "10%", height: "auto" }}
            className="animate-slideright bg-[#181818] p-2 text-white rounded-lg text-center cursor-pointer"
            onClick={() => dispatch(selectGenreListId(genre.value))}
          >
            {genre.title}
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <TopPlay />
      </div>
      <div className="flex justify-between items-center sm:flex-row flex-col mt-9 mb-6">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle || "POP"}
        </h2>
      </div>

      <div className="sm:w-full w-screen flex flex-wrap sm:justify-start justify-start gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
