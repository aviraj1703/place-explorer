import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "@env";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const API_KEY = GOOGLE_MAPS_API_KEY;

const nearByPlcaes = (latitude, longitude, value) =>
  axios.get(
    BASE_URL +
      "/nearbysearch/json?" +
      "keyword=cruise" +
      "&location=" +
      latitude +
      "," +
      longitude +
      "&radius=1500" +
      "&type=" +
      value +
      "&key=" +
      API_KEY
  );

export default { nearByPlcaes };
