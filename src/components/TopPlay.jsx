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
  <div className="w-full lg:w-[31%] flex flex-wrap flex-row items-center bg-gray-800 bg-opacity-70 hover:bg-[#3535357a] pl-0 pr-4 cursor-pointer mb-2 ml-2 rounded-lg backdrop-blur-lg">
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-[87px] h-[87px] rounded-l-md"
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className=" text-base font-medium text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0]?.adamid}`}>
          <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
    </div>
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

  const topPlays = data?.tracks?.slice(0, 6);

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
            <p className="text-white font-semibold text-base cursor-pointer">
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
            <p className="text-white font-semibold text-base cursor-pointer">
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
              style={{ width: "18%", height: "auto" }}
              className="animate-slideright bg-[#353535d3] hover:bg-[#353535] pt-4 rounded-lg"
            >
              <Link
                to={`/artists/${song?.artists[0].adamid}`}
                className="flex-1 flex flex-col justify-center mx-3"
              >
                <img
                  src={song?.images.background}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
                <p className=" text-sm text-center text-gray-300 mt-1">
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
