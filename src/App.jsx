import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
  Genre,
} from "./pages";

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const navigator = useNavigate();
  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-b from-[#bd1818] from-10% via-[#240c0c] via-20% to-black from-90%">
        {/* <Searchbar /> */}
        <div className="h-[60px] top-0 px-6">
          <ArrowBackIosIcon
            sx={{
              fontSize: "40px",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
            className=" mt-2 p-2 rounded-full"
            onClick={() => navigator(-1)}
          />
          <ArrowForwardIosIcon
            sx={{
              fontSize: "40px",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
            className=" mt-2 p-2  ml-3 rounded-full"
            onClick={() => navigator(+1)}
          />
        </div>

        <div className=" h-[calc(100vh-60px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/search" element={<Searchbar />} />
              <Route path="/genre/:genreType" element={<Genre />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* {activeSong?.title && (
        
      )} */}
      <div className="absolute h-[90px] bottom-0 left-0 right-0 flex animate-slideup bg-[#181818] backdrop-blur-lg z-10">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default App;
