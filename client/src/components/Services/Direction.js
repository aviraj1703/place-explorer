import { Platform, Linking } from "react-native";

const getDirections = (place, placeAddress) => {
  const url = Platform.select({
    ios:
      "maps:" +
      place.geometry.location.lat +
      "," +
      place.geometry.location.lng +
      "?q=" +
      placeAddress,
    android:
      "geo:" +
      place.geometry.location.lat +
      "," +
      place.geometry.location.lng +
      "?q=" +
      placeAddress,
  });

  Linking.openURL(url);
};

export default {
  getDirections,
};
