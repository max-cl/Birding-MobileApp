import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";

// Screens
import BirdsScreen from "./Screens/Birds";
import WhichBirdScreen from "./Screens/WhichBird";
import BirdDetailsScreen from "./Screens/BirdDetails";
import WhichBirdResultScreen from "./Screens/WhichBirdResult";
import MapPlacesScreen from "./Screens/MapPlaces";
import PlaceDetailsScreen from "./Screens/PlaceDetails";
import TestScreen from "./Screens/Test";

// Contexts
import GlobalSpinnerContextProvider from "./context/spinner-context";
import BirdsContextProvider from "./context/birds-context";
import UserContextProvider from "./context/user-context";
import PlacesContextProvider from "./context/places-context";

const BirdsStack = createNativeStackNavigator();
const WhichBirdStack = createNativeStackNavigator();
const MapPlacesStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

const App = () => {
    return (
        <GlobalSpinnerContextProvider>
            <BirdsContextProvider>
                <PlacesContextProvider>
                    <UserContextProvider>
                        <NavigationContainer initialRouteName="Birds">
                            <Tab.Navigator
                                screenOptions={({ route }) => ({
                                    tabBarIcon: ({ focused, color, size }) => {
                                        let iconName;

                                        if (route.name === "Birds") {
                                            iconName = focused ? "kiwi-bird" : "kiwi-bird";
                                            return <FontAwesome5 name={iconName} size={size} color={color} />;
                                        } else if (route.name === "WhichBird") {
                                            iconName = focused ? "question" : "question";
                                            return <Fontisto name={iconName} size={size} color={color} />;
                                        } else if (route.name === "MapPlaces") {
                                            iconName = focused ? "map-marker-alt" : "map-marker-alt";
                                            return <FontAwesome5 name={iconName} size={size} color={color} />;
                                        }

                                        // You can return any component that you like here!
                                        // return <Ionicons name={iconName} size={size} color={color} />;
                                    },
                                    tabBarActiveTintColor: "tomato",
                                    tabBarInactiveTintColor: "gray",
                                    headerShown: false,
                                })}
                            >
                                <Tab.Screen name="Birds" component={BirdsStackScreen} options={{ title: "Birds" }} />
                                <Tab.Screen
                                    name="WhichBird"
                                    component={WhichBirdStackScreen}
                                    options={{ title: "Which Bird?" }}
                                />
                                <Tab.Screen
                                    name="MapPlaces"
                                    component={MapPlacesStackScreen}
                                    options={{ title: "Places" }}
                                />
                                {/* <Tab.Screen name="Test" component={TestScreen} options={{ title: "Test" }} /> */}
                            </Tab.Navigator>
                        </NavigationContainer>
                    </UserContextProvider>
                </PlacesContextProvider>
            </BirdsContextProvider>
        </GlobalSpinnerContextProvider>
    );
};

export default App;
