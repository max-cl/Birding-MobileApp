import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import BirdsScreen from "../Screens/Birds";
import WhichBirdScreen from "../Screens/WhichBird";
import BirdDetailsScreen from "../Screens/BirdDetails";
import WhichBirdResultScreen from "../Screens/WhichBirdResult";
import MapPlacesScreen from "../Screens/MapPlaces";
import PlaceDetailsScreen from "../Screens/PlaceDetails";
import TestScreen from "../Screens/Test";

const BirdsStack = createNativeStackNavigator();
const WhichBirdStack = createNativeStackNavigator();
const MapPlacesStack = createNativeStackNavigator();

const BirdsStackScreen = () => {
    return (
        <BirdsStack.Navigator>
            <BirdsStack.Screen
                name="BirdsScreen"
                component={BirdsScreen}
                options={{
                    title: "Birds",
                }}
            />
            <BirdsStack.Screen
                name="Details"
                component={BirdDetailsScreen}
                options={{
                    title: "Details",
                }}
            />
        </BirdsStack.Navigator>
    );
};

const WhichBirdStackScreen = () => {
    return (
        <WhichBirdStack.Navigator>
            <WhichBirdStack.Screen
                name="WhichBirdScreen"
                component={WhichBirdScreen}
                options={{
                    title: "",
                }}
            />
            <WhichBirdStack.Screen
                name="WhichBirdResult"
                component={WhichBirdResultScreen}
                options={{
                    title: "Result",
                }}
            />
            <WhichBirdStack.Screen
                name="Details"
                component={BirdDetailsScreen}
                options={{
                    title: "Details",
                }}
            />
        </WhichBirdStack.Navigator>
    );
};

const MapPlacesStackScreen = () => {
    return (
        <MapPlacesStack.Navigator>
            <MapPlacesStack.Screen
                name="MapPlacesScreen"
                component={MapPlacesScreen}
                options={{
                    title: "Map",
                }}
            />
            <MapPlacesStack.Screen
                name="PlaceDetails"
                component={PlaceDetailsScreen}
                options={{
                    title: "Place",
                }}
            />
        </MapPlacesStack.Navigator>
    );
};

export { BirdsStackScreen, WhichBirdStackScreen, MapPlacesStackScreen, TestScreen };
