import React, { useContext, useState, useRef } from "react";
import { SafeAreaView, StatusBar, ScrollView, View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

// Context
import { PlacesContext } from "../../../context/places-context";

const { height, width } = Dimensions.get("window");
const LATITUDE_DELTA = 2.6;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

const MapPlacesContainer = ({ navigation }) => {
    // Global States
    const { places } = useContext(PlacesContext);
    // Local States
    const [initialRegion, setInitialRegion] = useState({
        latitude: 28.291565,
        longitude: -16.629129,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    // Refs
    const _map = useRef(null);

    const onRegionChange = () => setInitialRegion(initialRegion);

    const onPressPlaceDetails = (placeId) => navigation.push("PlaceDetails", { placeId });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <MapView
                        ref={_map}
                        style={styles.map}
                        region={initialRegion}
                        onRegionChange={onRegionChange}
                        initialRegion={initialRegion}
                    >
                        {places.map((place) => (
                            <Marker
                                key={place._id}
                                identifier={place._id}
                                // coordinate={places.coordinates}
                                coordinate={{
                                    latitude: place.coordinates.latitude,
                                    longitude: place.coordinates.longitude,
                                }}
                                title={place.title}
                                description={place.description}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    console.log("Hola: ", place._id);
                                }}
                                tracksViewChanges={false}
                                onCalloutPress={() => onPressPlaceDetails(place._id)}
                            />
                        ))}
                    </MapView>
                    <Pressable
                        style={{
                            position: "absolute",
                            backgroundColor: "#C0C0C0",
                            width: 64,
                            height: 32,
                            justifyContent: "center",
                            alignItems: "center",
                            top: 24,
                            left: 24,
                        }}
                        onPress={() =>
                            setInitialRegion({
                                latitude: 28.291565,
                                longitude: -16.629129,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            })
                        }
                    >
                        <Text style={{ color: "blue", fontWeight: "800" }}>Reset</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#FFFFFF",
    },
    scrollView: { flex: 1 },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});
export default MapPlacesContainer;
