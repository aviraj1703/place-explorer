import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "@env";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const API_KEY = GOOGLE_MAPS_API_KEY;

console.log(API_KEY);

const nearByPlcaes = () =>
  axios.get(
    BASE_URL +
      "/nearbysearch/json?" +
      "keyword=cruise" +
      "&location=-33.8670522%2C151.1957362&radius=1500&type=restaurant" +
      "&key=" +
      API_KEY
  );

export default { nearByPlcaes };
