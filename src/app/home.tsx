import { View, Text, Alert } from "react-native";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Categories, CategoriesProps } from "@/components/categories";
import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";
import MapView, { Marker, Callout } from "react-native-maps"
import * as Location from 'expo-location';
import { colors, fontFamily } from "@/styles/theme";
import { router } from "expo-router" 

type MarketsProps = PlaceProps & {
  latitude: number,
  longitude: number
}

type LocationProps = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState("")
  const [markets, setMarkets] = useState<MarketsProps[]>([])
  const [currentLocation, setCurrentLocation] = useState<LocationProps>({
    latitude: -23.561187293883442,
    longitude: -46.656451388116494,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  }) // fake/random initial user location

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories")
      setCategories(data)
      setCategory(data[0].id)
    } catch (error) {
      console.log(error)
      Alert.alert("Categorias", "não foi possível carregar as categorias")
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) {
        return
      }

      const { data } = await api.get("/markets/category/" + category)
      setMarkets(data)
    } catch (error) {
      console.log(error)
      Alert.alert("Locais", "Não foi possível carregar os locais")
    }
  }

  async function getCurrentLocation() {
    try {
      const locationPermision = await Location.getForegroundPermissionsAsync()

      const { status } = locationPermision.status == "undetermined" ?
        await Location.requestForegroundPermissionsAsync() :
        locationPermision.status == "granted" ? { "status": true } :
          { "status": false }

      if (status) {
        const { coords } = await Location.getCurrentPositionAsync()
        setCurrentLocation({ latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }) // current user location
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    getCurrentLocation()

  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [category])

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories data={categories} onSelect={setCategory} selected={category} />
      <MapView
        style={{ flex: 1 }}
        region={currentLocation}
      >
        <Marker coordinate={currentLocation} identifier="current" image={require("@/assets/location.png")} />

        {
          markets.map((item) => (
            <Marker key={item.id} identifier={item.id} coordinate={{ latitude: item.latitude, longitude: item.longitude }} image={require("@/assets/pin.png")}>

              <Callout onPress={
                // @ts-ignore
                () => router.navigate(`/market/${item.id}`)}>
                <View>
                  <Text style={{ fontSize: 14, color: colors.gray[600], fontFamily: fontFamily.medium }}>
                    {item.name}
                  </Text>

                  <Text style={{fontSize: 12, color: colors.gray[600], fontFamily: fontFamily.regular }}>
                    {item.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))
        }
      </MapView>
      <Places data={markets} />
    </View>
  )
}