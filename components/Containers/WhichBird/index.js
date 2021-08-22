import React, { useContext, useState } from "react";
import { SafeAreaView, StatusBar, ScrollView, View, StyleSheet, Text, Pressable, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// Context
import { BirdsContext } from "../../../context/birds-context";
// import { FilterContext } from "../../../context/filter-context";

const WhichBirdContainer = ({ navigation }) => {
    // Global State
    const { birds, birdColors } = useContext(BirdsContext);
    // Local States
    const [filterBird, setFilterBird] = useState({ size: undefined, color: undefined });
    const [openSizeModal, setOpenSizeModal] = useState(false);
    const [openColorModal, setOpenColorModal] = useState(false);

    const onPressWhichBirdResult = () =>
        navigation.navigate("WhichBirdResult", {
            filterBird: filterBird,
        });
    // const onPressBirdSize = () => navigation.navigate("BirdSize");

    // console.log("filterBird: ", filterBird);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/**  START Size */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={openSizeModal}
                    onRequestClose={() => {
                        setOpenSizeModal(!openSizeModal);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable
                                style={[
                                    styles.button,
                                    styles.buttonClose,
                                    styles.buttonModal,
                                    filterBird.size === "small" && styles.selected,
                                ]}
                                onPress={() => {
                                    setFilterBird({ ...filterBird, size: "small" });
                                    setOpenSizeModal(!openSizeModal);
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: "400",
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                    }}
                                >
                                    Small
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.button,
                                    styles.buttonClose,
                                    styles.buttonModal,
                                    filterBird.size === "medium" && styles.selected,
                                ]}
                                onPress={() => {
                                    setFilterBird({ ...filterBird, size: "medium" });
                                    setOpenSizeModal(!openSizeModal);
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: "400",
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                    }}
                                >
                                    Medium
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.button,
                                    styles.buttonClose,
                                    styles.buttonModal,
                                    filterBird.size === "big" && styles.selected,
                                ]}
                                onPress={() => {
                                    setFilterBird({ ...filterBird, size: "big" });
                                    setOpenSizeModal(!openSizeModal);
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: "400",
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                    }}
                                >
                                    Big
                                </Text>
                            </Pressable>

                            <AntDesign
                                name="closecircle"
                                size={24}
                                color="black"
                                onPress={() => setOpenSizeModal(!openSizeModal)}
                                style={{ position: "absolute", right: 8, top: 8 }}
                            />
                        </View>
                    </View>
                </Modal>
                {/**  END Size */}

                {/**  START Color */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={openColorModal}
                    onRequestClose={() => setOpenColorModal(!openColorModal)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalViewColors}>
                            {birdColors.map((color, index) => (
                                <Pressable
                                    key={index}
                                    style={{
                                        backgroundColor: `${color}`,
                                        borderRadius: 50,
                                        width: 64,
                                        height: 64,
                                        margin: 4,
                                        borderColor: "#C0C0C0",
                                        borderWidth: 1,
                                    }}
                                    onPress={() => {
                                        setFilterBird({ ...filterBird, color });
                                        setOpenColorModal(!openColorModal);
                                    }}
                                >
                                    <Text>{"                  "}</Text>
                                </Pressable>
                            ))}

                            <AntDesign
                                name="closecircle"
                                size={24}
                                color="black"
                                onPress={() => setOpenColorModal(!openColorModal)}
                                style={{ position: "absolute", right: 8, top: 8 }}
                            />
                        </View>
                    </View>
                </Modal>
                {/**  END Color */}

                <View style={{ position: "absolute", top: 24, right: 16 }}>
                    <Pressable
                        style={[styles.button, { width: 100 }]}
                        onPress={() => setFilterBird({ size: undefined, color: undefined })}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "400", color: "coral", textAlign: "center" }}>
                            Reset filter
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.content}>
                    <View style={styles.row}>
                        <Text style={{ fontSize: 24, fontWeight: "600" }}>1</Text>
                        <Text style={{ fontSize: 12, fontWeight: "200" }}> Which size is the bird?</Text>
                        <Pressable
                            style={[
                                styles.button,
                                styles.buttonClose,
                                filterBird.size !== undefined && styles.selected,
                            ]}
                            onPress={() => setOpenSizeModal(!openSizeModal)}
                        >
                            <Text style={{ fontSize: 12, fontWeight: "400", color: "#FFFFFF", textAlign: "center" }}>
                                {filterBird.size !== undefined ? "Chosen" : "Choose"}
                            </Text>
                        </Pressable>
                    </View>
                    <View style={styles.row}>
                        <Text style={{ fontSize: 24, fontWeight: "600" }}>2</Text>
                        <Text style={{ fontSize: 12, fontWeight: "200" }}> What color is the bird?</Text>
                        <Pressable
                            style={[
                                styles.button,
                                styles.buttonClose,
                                filterBird.color !== undefined && styles.selected,
                            ]}
                            onPress={() => setOpenColorModal(!openColorModal)}
                        >
                            <Text style={{ fontSize: 12, fontWeight: "400", color: "#FFFFFF", textAlign: "center" }}>
                                {filterBird.color !== undefined ? "Chosen" : "Choose"}
                            </Text>
                        </Pressable>
                    </View>
                    <View style={[styles.row, styles.rowButtonFind]}>
                        <Pressable style={[styles.button, styles.buttonFind]} onPress={() => onPressWhichBirdResult()}>
                            <Text style={{ fontSize: 16, fontWeight: "400", color: "#FFFFFF", textAlign: "center" }}>
                                Find Birds
                            </Text>

                            <Text style={{ fontSize: 12, fontWeight: "400", color: "#3F3F3F", textAlign: "center" }}>
                                {`${
                                    birds
                                        .filter((f) =>
                                            filterBird.size === undefined
                                                ? true
                                                : f.size.toUpperCase() === filterBird.size.toUpperCase()
                                        )
                                        .filter((f) =>
                                            filterBird.color === undefined ? true : f.color.includes(filterBird.color)
                                        ).length
                                } results`}

                                {/* {`${
                                    birds.filter((f) => {
                                        return filterBird.color === undefined
                                            ? true
                                            : f.color.includes(filterBird.color) &&
                                                  (filterBird.size === undefined
                                                      ? true
                                                      : f.size.toUpperCase() === filterBird.size.toUpperCase());
                                    }).length
                                } results`} */}

                                {/* {filterBird.size && filterBird.color
                                    ? `${
                                          birds
                                              .filter((b) =>
                                                  b.color
                                                      .map((c) => c)
                                                      .includes(
                                                          filterBird.color
                                                              ? filterBird.color
                                                              : ""
                                                      )
                                              )
                                              .filter((f) =>
                                                  f.size
                                                      .toUpperCase()
                                                      .includes(
                                                          filterBird.size
                                                              ? filterBird.size.toUpperCase()
                                                              : ""
                                                      )
                                              ).length
                                      } results`
                                    : `${birds.length} results`} */}
                            </Text>
                        </Pressable>
                    </View>
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
    scrollView: {
        position: "relative",
    },
    content: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 80,
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
        textAlign: "center",
        width: 64,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    buttonFind: {
        backgroundColor: "coral",
        width: 96,
    },
    rowButtonFind: {
        borderWidth: 0,
        borderColor: "#FFFFFF",
    },

    // Modal
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        position: "relative",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 240,
        height: 240,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        padding: 24,
    },
    modalViewColors: {
        margin: 0,
        backgroundColor: "white",
        position: "relative",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 240,
        height: 400,
        justifyContent: "space-evenly",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 56,
        paddingHorizontal: 12,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    buttonModal: {
        width: 72,
    },
    selected: {
        backgroundColor: "coral",
    },
});
export default WhichBirdContainer;
