import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.data[0]?.attributes;
  return (
    <div className="relative w-full flex flex-col">
      <div className=" w-full bg-gradient-to-l from-transparent to-[#060e18] sm:h-[350px] h-[250px]">
        <div className="absolute flex items-center px-6 sm:mt-[11%] mt-[21%] items-end">
          <img
            src={
              artistId
                ? artist?.artwork?.url
                    .replace("{w}", "500")
                    .replace("{h}", "500")
                : songData?.images?.coverart
            }
            alt="art"
            className="sm:w-48 w-28 sm:h-48 h-28 object-cover"
          />

          <div className="ml-5">
            <p className=" font-bold sm:text-6xl text-3xl text-white">
              {artistId ? artist?.name : songData?.title}
            </p>
            {!artistId && (
              <Link to={`/artists/${songData?.artists[0].adamid}`}>
                <p className=" text-white text-base mt-2 hover:underline">
                  {songData?.subtitle}
                </p>
              </Link>
            )}
            <p className=" text-white text-base mt-2">
              {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailsHeader;
