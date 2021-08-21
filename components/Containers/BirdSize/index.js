import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, StatusBar, ScrollView, View, StyleSheet, Text, Pressable } from "react-native";

// Context
import { FilterContext } from "../../../context/filter-context";

const BirdSizeContainer = ({ navigation }) => {
    // Global State
    const { filter, selectSizeBird } = useContext(FilterContext);

    // const onPressWhichResult = () => {
    //     // console.log("onPress: ", birdId);
    //     navigation.navigate("WhichBirdResult");
    // };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={async () => {
                            await selectSizeBird("small");
                            navigation.goBack();
                        }}
                    >
                        <Text style={{ fontSize: 12, fontWeight: "400", color: "#FFFFFF", textAlign: "center" }}>
                            Small
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonClose]} onPress={() => selectSizeBird("medium")}>
                        <Text style={{ fontSize: 12, fontWeight: "400", color: "#FFFFFF", textAlign: "center" }}>
                            Medium
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonClose]} onPress={() => selectSizeBird("big")}>
                        <Text style={{ fontSize: 12, fontWeight: "400", color: "#FFFFFF", textAlign: "center" }}>
                            Big
                        </Text>
                    </Pressable>
                    {/* <View style={[styles.row, styles.rowButtonFind]}>
                        <Pressable style={[styles.button, styles.buttonFind]} onPress={() => onPressWhichResult()}>
                            <Text style={{ fontSize: 16, fontWeight: "400", color: "#FFFFFF" }}>Find Birds</Text>
                        </Pressable>
                    </View>  */}
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
    scrollView: {},
    content: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: "50%",
        padding: 16,
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        padding: 12,
        marginTop: 24,
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: "oldlace",
        width: 72,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    buttonFind: {
        backgroundColor: "coral",
    },
    rowButtonFind: {
        borderWidth: 0,
        borderColor: "#FFFFFF",
    },
});
export default BirdSizeContainer;
