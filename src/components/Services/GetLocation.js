import * as Location from "expo-location";

const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied :(");
    console.error(errorMsg);
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  return location;
};

export default { getLocation };
