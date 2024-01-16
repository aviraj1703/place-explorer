import { Share } from "react-native";

const shareDirections = (place) => {
  Share.share({
    title: "Share Business",
    message:
      "Business Name: " + place.name + "\n" + "Address: " + place.vicinity
        ? place.vicinity
        : place.formatted_address,
  });
};

export default {
  shareDirections,
};
