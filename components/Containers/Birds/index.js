import React, { useState, useLayoutEffect, useContext } from "react";
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Modal,
    Pressable,
    TextInput,
} from "react-native";
import { MaterialIcons, FontAwesome, FontAwesome5, AntDesign } from "@expo/vector-icons";

// Components
import CustomImage from "../../../components/CustomImage";

// Utils
import imagesUtil from "../../../assets/images/images";

// Context
import { BirdsContext } from "../../../context/birds-context";

const options = ["All Birds", "Birds I've seen"];
const BirdsContainer = ({ navigation }) => {
    // Local States
    const [selectedIndexOption, setSelectedIndexOption] = useState(0);
    const [showSeen, setShowSeen] = useState(false);
    const [orderBy, setOrderBy] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [searchBird, setSearchBird] = useState("");
    // Global States
    const { birds } = useContext(BirdsContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome5
                    name="search"
                    size={24}
                    color="black"
                    onPress={() => setOpenSearchModal(!openSearchModal)}
                />
            ),
            headerRight: () => {
                if (orderBy) {
                    return (
                        <FontAwesome
                            name="sort-alpha-desc"
                            size={24}
                            color="black"
                            onPress={() => setOrderBy(!orderBy)}
                        />
                    );
                } else {
                    return (
                        <FontAwesome
                            name="sort-alpha-asc"
                            size={24}
                            color="black"
                            onPress={() => setOrderBy(!orderBy)}
                        />
                    );
                }
            },
        });
    }, [navigation, birds]);

    const onPressBirdDetails = (birdId) => {
        // console.log("onPress: ", birdId);
        navigation.push("Details", {
            birdId: birdId,
        });
    };

    const onPressOptions = (optionIndex) => {
        // console.log("optionIndex: ", optionIndex);
        // console.log("showSeen: ", showSeen);
        setSelectedIndexOption(optionIndex);
        setShowSeen(!showSeen);
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={openSearchModal}
                    onRequestClose={() => {
                        setOpenSearchModal(!openSearchModal);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={{
                                    height: 32,
                                    width: 160,
                                    padding: 8,
                                    borderColor: "#C0C0C0",
                                    borderWidth: 1,
                                }}
                                // defaultValue="Search for a bird..."
                                placeholder="Search for a bird..."
                                value={searchBird}
                                onChangeText={setSearchBird}
                            />
                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setSearchBird("")}>
                                <Text style={styles.textStyle}>Reset</Text>
                            </Pressable>
                            <AntDesign
                                name="closecircle"
                                size={24}
                                color="black"
                                onPress={() => setOpenSearchModal(!openSearchModal)}
                                style={{ position: "absolute", right: 8, top: 8 }}
                            />
                        </View>
                    </View>
                </Modal>

                <View style={styles.row}>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onPressOptions(index)}
                            style={[styles.button, selectedIndexOption === index && styles.selected]}
                        >
                            <Text style={[styles.buttonLabel, selectedIndexOption === index && styles.selectedLabel]}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {!showSeen ? (
                    <View style={styles.content}>
                        {birds.length > 0 &&
                            birds
                                .sort((a, b) => (orderBy ? a.name < b.name : a.name > b.name))
                                .filter((b) => b.name.toUpperCase().includes(searchBird.toUpperCase()))
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
                ) : (
                    <View style={styles.content}>
                        {birds.length > 0 &&
                            birds
                                .sort((a, b) => (orderBy ? a.name < b.name : a.name > b.name))
                                .filter((f) => f.checked === showSeen)
                                .map((d) => (
                                    <TouchableOpacity key={d.id} onPress={() => onPressBirdDetails(d.id)}>
                                        <View style={styles.box}>
                                            <CustomImage style={styles.img} imgSrc={imagesUtil[`${d.img}`]} />
                                            <Text style={styles.birdName}>{d.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                    </View>
                )}
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
        // borderRadius: 4,
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

export default BirdsContainer;
