import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";

import { genres } from "../assets/constants";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="p-2 text-gray-400 focus-within:text-gray-600 pr-8 sm:w-1/2 w-screen relative"
      >
        <label htmlFor="search-field" className="sr-only">
          Search all song
        </label>
        <div className="flex flex-row justify-center items-start">
          <FiSearch className="w-7 h-7 text-black relative left-11 top-3" />
          <input
            name="search-field"
            autoComplete="off"
            id="search-field"
            placeholder="What do you want to listen to ?"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" flex-1 bg-white rounded-full pl-[60px] text-lg text-gray-800 p-3 placeholder-slate-800 outline-none border-none"
          />
        </div>
      </form>
      <div className="sm:w-full w-screen flex flex-wrap sm:justify-start justify-center gap-8 px-8 mt-8">
        {genres.map((genre) => (
          <div
            key={genre.value}
            style={{
              backgroundColor: genre.color,
            }}
            className="animate-slideright sm:w-[11.5rem] sm:h-[12rem] w-[9rem] h-[10rem]  bg-[#181818] p-2 text-white rounded-lg font-bold p-5 text-[23px] truncate cursor-pointer"
            onClick={() => navigate(`/genre/${genre.value}`)}
          >
            {genre.title}
          </div>
        ))}
      </div>
    </>
  );
};

export default Searchbar;
