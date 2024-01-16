import { Platform, Linking } from "react-native";

const getDirections = (place) => {
  const url = Platform.select({
    ios:
      "maps:" +
      place.geometry.location.lat +
      "," +
      place.geometry.location.lng +
      "?q=" +
      place.vicinity,
    android:
      "geo:" +
      place.geometry.location.lat +
      "," +
      place.geometry.location.lng +
      "?q=" +
      place.vicinity,
  });

  Linking.openURL(url);
};

export default {
  getDirections,
};
