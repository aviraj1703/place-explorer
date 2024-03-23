import { Platform, Linking } from "react-native";

const getDirections = (place, placeAddress) => {
  let placeLatitude, placeLongitude;
  if (place.latitude && place.longitude) {
    placeLatitude = place.latitude;
    placeLongitude = place.longitude;
  } else {
    placeLatitude = place.geometry.location.lat;
    placeLongitude = place.geometry.location.ng;
  }
  const url = Platform.select({
    ios: "maps:" + placeLatitude + "," + placeLongitude + "?q=" + placeAddress,
    android:
      "geo:" + placeLatitude + "," + placeLongitude + "?q=" + placeAddress,
  });

  Linking.openURL(url);
};

export default {
  getDirections,
};
