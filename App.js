import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, AntDesign, FontAwesome } from "@expo/vector-icons";

// Screens
import BirdsScreen from "./Screens/Birds";
import TestScreen from "./Screens/Test";
import BirdDetailsScreen from "./Screens/BirdDetails";

const BirdsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
    return (
        <BirdsStack.Navigator>
            <BirdsStack.Screen
                name="BirdsScreen"
                component={BirdsScreen}
                options={{
                    title: "BIRDS",
                }}
            />
            <BirdsStack.Screen
                name="Details"
                component={BirdDetailsScreen}
                options={{
                    title: "DETAILS",
                }}
            />
        </BirdsStack.Navigator>
    );
};

const App = () => {
    return (
        <NavigationContainer initialRouteName="Birds">
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Birds") {
                            iconName = focused ? "kiwi-bird" : "kiwi-bird";
                            return <FontAwesome5 name={iconName} size={size} color={color} />;
                        } else if (route.name === "TestScreen") {
                            iconName = focused ? "questioncircle" : "questioncircle";
                            return <AntDesign name={iconName} size={size} color={color} />;
                        }

                        // You can return any component that you like here!
                        // return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "tomato",
                    tabBarInactiveTintColor: "gray",
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Birds" component={HomeStackScreen} options={{ title: "Birds" }} />
                <Tab.Screen
                    name="TestScreen"
                    component={TestScreen}
                    options={{
                        title: "TestScreen",
                        headerLeft: () => (
                            <AntDesign name="left" size={24} color="black" onPress={() => alert("Hola")} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
