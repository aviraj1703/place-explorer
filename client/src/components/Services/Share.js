import { Share } from "react-native";

const shareDirections = (place, placeAddress) => {
  Share.share({
    title: "Share Business",
    message:
      "Business Name: " + place.name + "\n" + "Address: " + placeAddress,
  });
};

export default {
  shareDirections,
};
