import React, { useContext, useState, useRef } from "react";
import { SafeAreaView, StatusBar, ScrollView, View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

// Context
import { BirdsContext } from "../../../context/birds-context";

const { height, width } = Dimensions.get("window");
const LATITUDE_DELTA = 1.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

const MapBirdsContainer = ({ navigation }) => {
    // Global States
    const { birds } = useContext(BirdsContext);
    // Local States
    const [initialRegion, setInitialRegion] = useState({
        latitude: 28.291565,
        longitude: -16.629129,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    // Refs
    const _map = useRef(null);

    // useEffect(() => {
    //     if (_map.current) {
    //         _map.current.animateCamera(
    //             {
    //                 center: {
    //                     latitude: 28.291565,
    //                     longitude: -16.629129,
    //                 },
    //                 zoom: 8,
    //             },
    //             25000
    //         );
    //     }
    // }, []);

    const onRegionChange = () => setInitialRegion(initialRegion);

    const onPressBirdDetails = (birdId) => navigation.push("Details", { birdId: birdId });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <MapView
                        ref={_map}
                        style={styles.map}
                        region={initialRegion}
                        onRegionChange={onRegionChange}
                        // initialRegion={initialRegion}
                        // zoomEnabled={true}
                        // zoomControlEnabled={true}
                        // showsCompass={true}
                        // showScale={true}
                        // showsIndoors={true}
                        // showsUserLocation
                        // ScrollEnabled={true}
                        // showsBuildings={true}
                        // showsMyLocationButton={false}
                    >
                        {birds.map((bird) => (
                            <Marker
                                key={bird._id}
                                identifier={bird._id}
                                // coordinate={bird.coordinates}
                                coordinate={{
                                    latitude: bird.coordinates.latitude,
                                    longitude: bird.coordinates.longitude,
                                }}
                                title={bird.name}
                                description={bird.name}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    console.log("Hola: ", bird.id);
                                }}
                                tracksViewChanges={false}
                                onCalloutPress={() => onPressBirdDetails(bird.id)}
                            >
                                {/* <View style={{ backgroundColor: "red", padding: 10 }}>
                                    <Text>SF</Text>
                                </View> */}
                            </Marker>
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
export default MapBirdsContainer;
