import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "../Search/SearchBar";
import GoogleMapViewFull from "../Search/GoogleMapViewFull";
import SearchResults from "../Search/SearchResults";
import GlobalApi from "../Services/GlobalApi";

export default function Search() {
  const [placeList, setPlaceList] = useState(null);

  useEffect(() => {
    GetNearBySearchPlace("restaurant");
  }, []);

  const GetNearBySearchPlace = (value) => {
    GlobalApi.searchByText(value).then((resp) => {
      setPlaceList(resp.data.results);
    });
  };

  return (
    <View>
      <SearchBar setSearchText={(value) => GetNearBySearchPlace(value)} />
      <GoogleMapViewFull placeList={placeList} />
      <SearchResults placeList={placeList} />
    </View>
  );
}
