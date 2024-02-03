import * as Location from "expo-location";

const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.error("Permission to access location was denied :(");
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  return location;
};

export default { getLocation };
