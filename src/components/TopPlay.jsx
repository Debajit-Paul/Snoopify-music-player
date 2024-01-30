import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazam";

import "swiper/css";

const TopChartCard = ({
  song,
  i,
  activeSong,
  isPlaying,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className=" w-full lg:w-[32.59%] flex flex-row items-center md:bg-black md:bg-opacity-50 bg-opacity-70 hover:bg-[#3535357a] pl-0 pr-4 cursor-pointer mb-2 rounded-lg backdrop-blur-lg justify-between">
    <Link to={`/songs/${song.key}`}>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-l-md"
          src={song?.images?.coverart}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <p className=" text-lg font-medium text-white w-40 truncate">
            {song?.title}
          </p>
          {/* <Link to={`/artists/${song?.artists[0]?.adamid}`}>
          <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link> */}
        </div>
      </div>
    </Link>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={() => handlePlayClick(song, i)}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  // useEffect(() => {
  //   divRef.current.scrollIntoView({ behavior: "smooth" });
  // });

  const topPlays = data?.slice(7, 13);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div ref={divRef} className="flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold text-3xl text-white text-left">
            Top Charts
          </h2>
          <Link to="/top-charts">
            <p className="text-white font-semibold text-base cursor-pointer hover:underline">
              see more
            </p>
          </Link>
        </div>

        <div className=" flex flex-wrap gap-3 mt-6 animate-slideup">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold text-3xl text-white text-left">
            Top Artist
          </h2>
          <Link to="/top-artists">
            <p className="text-white font-semibold text-base cursor-pointer hover:underline">
              see more
            </p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlidesBounds
          centeredSlides
          modules={FreeMode}
          className="mt-6"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "20%", height: "auto" }}
              className="animate-slideright md:bg-[#353535d3] hover:bg-[#353535] pt-3 rounded-lg"
            >
              <Link
                to={
                  song.artists
                    ? `/artists/${song?.artists[0]?.adamid}`
                    : "/top-artists"
                }
                className="flex-1 flex flex-col justify-center mx-3"
              >
                <img
                  src={song?.images?.background}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
                <p className=" text-sm text-center text-gray-300 my-3 mb-5 w-30 truncate">
                  {song?.subtitle}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default TopPlay;
