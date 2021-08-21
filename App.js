import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, AntDesign, Fontisto } from "@expo/vector-icons";

// Screens
import BirdsScreen from "./Screens/Birds";
import WhichBirdScreen from "./Screens/WhichBird";
import BirdDetailsScreen from "./Screens/BirdDetails";
import WhichBirdResultScreen from "./Screens/WhichBirdResult";
import BirdSizeScreen from "./Screens/BirdSize";

const BirdsStack = createNativeStackNavigator();
const WhichBirdStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
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
            {/* <WhichBirdStack.Screen
                name="BirdSize"
                component={BirdSizeScreen}
                options={{
                    title: "Size",
                }}
            /> */}
        </WhichBirdStack.Navigator>
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
                        } else if (route.name === "WhichBird") {
                            iconName = focused ? "question" : "question";
                            return <Fontisto name={iconName} size={size} color={color} />;
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
                <Tab.Screen name="WhichBird" component={WhichBirdStackScreen} options={{ title: "Which Bird?" }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
