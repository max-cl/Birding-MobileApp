import React, { useContext, useState } from "react";
import { SafeAreaView, StatusBar, ScrollView, View, StyleSheet, Text, Pressable } from "react-native";

const MapBirdsContainer = ({ navigation }) => {
    // Global State
    // const { birds } = useContext(BirdsContext);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <Text>Map</Text>
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
        flexDirection: "column",
        justifyContent: "center",
    },
});
export default MapBirdsContainer;
