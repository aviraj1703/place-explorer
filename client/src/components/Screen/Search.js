import { View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "../Search/SearchBar";
import GoogleMapViewFull from "../Search/GoogleMapViewFull";
import SearchResults from "../Search/SearchResults";
import GlobalApi from "../Services/GlobalApi";
import Loading from "../Shared/Loading";

export default function Search() {
  const [placeList, setPlaceList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetNearBySearchPlace("restaurant");
  }, []);

  const GetNearBySearchPlace = (value) => {
    setLoading(true);
    GlobalApi.searchByText(value).then((resp) => {
      setPlaceList(resp.data.results);
      setLoading(false);
    });
  };

  if (loading)
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </View>
    );

  return (
    <View>
      <SearchBar setSearchText={(value) => GetNearBySearchPlace(value)} />
      <GoogleMapViewFull placeList={placeList} />
      <SearchResults placeList={placeList} />
    </View>
  );
}
