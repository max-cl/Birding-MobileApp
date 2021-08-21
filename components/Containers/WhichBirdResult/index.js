import React, { useContext } from "react";
import { StatusBar, SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Components
import CustomImage from "../../../components/CustomImage";

// Utils
import imagesUtil from "../../../assets/images/images";

// Context
import { BirdsContext } from "../../../context/birds-context";

const WhichBirdResultContainer = ({ route, navigation }) => {
    // Route Params
    const { filterBird } = route.params;
    // Global States
    const { birds } = useContext(BirdsContext);

    const onPressBirdDetails = (birdId) => {
        navigation.push("Details", {
            birdId: birdId,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    {birds.length > 0 &&
                        birds
                            .sort((a, b) => a.name < b.name)
                            .filter((b) =>
                                b.size
                                    .toUpperCase()
                                    .includes(
                                        filterBird.birdSizeSelected ? filterBird.birdSizeSelected.toUpperCase() : ""
                                    )
                            )
                            .map((d) => (
                                <TouchableOpacity key={d.id} onPress={() => onPressBirdDetails(d.id)}>
                                    <View style={styles.box}>
                                        <CustomImage style={styles.img} imgSrc={imagesUtil[`${d.img}`]} />
                                        <Text style={styles.birdName}>{d.name}</Text>
                                    </View>
                                    <MaterialIcons
                                        size={16}
                                        color={"coral"}
                                        name={d.checked ? "check-box" : ""}
                                        style={styles.checkbox}
                                    />
                                </TouchableOpacity>
                            ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 0,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    button: {
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: "oldlace",
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "42%",
        textAlign: "center",
    },
    selected: {
        backgroundColor: "coral",
        borderWidth: 0,
    },
    buttonLabel: {
        fontSize: 12,
        fontWeight: "500",
        color: "coral",
    },
    selectedLabel: {
        color: "white",
    },
    content: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    box: {
        width: 105,
        height: 120,
        padding: 2,
        backgroundColor: "#F5F5F5",
        position: "relative",
    },
    img: {
        alignSelf: "center",
        height: "100%",
        width: "100%",
        resizeMode: "stretch",
    },
    birdName: {
        position: "absolute",
        fontWeight: "600",
        bottom: 2,
        left: 4,
        fontSize: 8,
    },
    checkbox: {
        position: "absolute",
        left: 0,
        top: 0,
    },

    // Modal
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        position: "relative",
        borderRadius: 20,
        padding: 48,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        fontSize: 16,
        fontWeight: "400",
        color: "#FFFFFF",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default WhichBirdResultContainer;
