import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import { ThemeProvider } from "styled-components/native";
// Stacks
import { BirdsStackScreen, WhichBirdStackScreen, MapPlacesStackScreen, TestScreen } from "./Stacks";

// Contexts
import GlobalSpinnerContextProvider from "./context/spinner-context";
import BirdsContextProvider from "./context/birds-context";
import UserContextProvider from "./context/user-context";
import PlacesContextProvider from "./context/places-context";

// Theme
import { theme } from "./Theme";

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <ThemeProvider theme={theme}>
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
                                        },
                                        tabBarActiveTintColor: "tomato",
                                        tabBarInactiveTintColor: "gray",
                                        headerShown: false,
                                    })}
                                >
                                    <Tab.Screen
                                        name="Birds"
                                        component={BirdsStackScreen}
                                        options={{ title: "Birds" }}
                                    />
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
                                    <Tab.Screen name="Test" component={TestScreen} options={{ title: "Test" }} />
                                </Tab.Navigator>
                            </NavigationContainer>
                        </UserContextProvider>
                    </PlacesContextProvider>
                </BirdsContextProvider>
            </GlobalSpinnerContextProvider>
        </ThemeProvider>
    );
};

export default App;
