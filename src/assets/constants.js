import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
  HiSearch,
} from "react-icons/hi";

export const genres = [
  { title: "Pop", value: "POP", color: "#E13300" },
  { title: "Hip-Hop", value: "HIP_HOP_RAP", color: "#7358FF" },
  { title: "Dance", value: "DANCE", color: "#0D72EA" },
  { title: "Electronic", value: "ELECTRONIC", color: "#E8115B" },
  { title: "Soul", value: "SOUL_RNB", color: "#148A08" },
  { title: "Alternative", value: "ALTERNATIVE", color: "#B02897" },
  { title: "Rock", value: "ROCK", color: "#D84000" },
  { title: "Latin", value: "LATIN", color: "#E1118C" },
  { title: "Film", value: "FILM_TV", color: "#C39687" },
  { title: "Country", value: "COUNTRY", color: "#BFD8E5" },
  { title: "Worldwide", value: "WORLDWIDE", color: "#BC5900" },
  { title: "Reggae", value: "REGGAE_DANCE_HALL", color: "#7D4B32" },
  { title: "House", value: "HOUSE", color: "#1E3264" },
  { title: "K-Pop", value: "K_POP", color: "#E1118C" },
];

export const links = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Search", to: "/search", icon: HiSearch },
  { name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];
