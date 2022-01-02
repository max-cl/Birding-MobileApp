import React, { useContext, useState, useRef } from "react";
import { Dimensions, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";

// Context
import { PlacesContext } from "../../../context/places-context";

// Common
import { StyledSafeAreaView, StyledScrollView } from "../../Common";
const { height, width } = Dimensions.get("window");

const StyledContainerReset = styled.View`
    position: absolute;
    top: ${(props) => props.theme.margin * 2}px;
    right: ${(props) => props.theme.margin * 2}px;
`;

const StyledPressableReset = styled(Pressable)`
    width: ${(props) => props.theme.width * 20}px;
    text-align: center;
    padding: ${(props) => props.theme.padding * 2}px;
    background-color: ${(props) => props.theme.tertiaryColor};
`;

const StyledButtonLabel = styled.Text`
    font-size: ${(props) => props.theme.fontSize * 1.75}px;
    color: ${(props) => props.theme.white};
    text-align: center;
`;

const StyledMapView = styled(MapView)`
    width: ${width}px;
    height: ${height}px;
`;

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
        <StyledSafeAreaView>
            <StyledScrollView>
                <StyledMapView
                    ref={_map}
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
                </StyledMapView>

                <StyledContainerReset>
                    <StyledPressableReset
                        onPress={() =>
                            setInitialRegion({
                                latitude: 28.291565,
                                longitude: -16.629129,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            })
                        }
                    >
                        <StyledButtonLabel>Reset</StyledButtonLabel>
                    </StyledPressableReset>
                </StyledContainerReset>
            </StyledScrollView>
        </StyledSafeAreaView>
    );
};

export default MapPlacesContainer;
