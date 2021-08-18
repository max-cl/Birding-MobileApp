import React, { useContext } from "react";
import { SafeAreaView, StatusBar, ScrollView, View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import styled from "styled-components/native";

// Components
import CustomImage from "../../../components/CustomImage";

// fakeData
// import { fakeData } from "../../../fakeData";

// Utils
import imagesUtil from "../../../assets/images/images";

// Context
import { BirdsContext } from "../../../context/birds-context";

const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
    padding: 20px;
    flex-direction: column;
`;

const StyledTitle = styled.Text`
    font-size: 24px;
    font-weight: 800;
    text-align: center;
`;

const StyledDescription = styled.Text`
    font-size: 14px;
    font-weight: 400;
    text-align: justify;
`;

const BirdDetailsContainer = ({ route }) => {
    const { birdId } = route.params;
    // Global State
    const [birds, setBirds] = useContext(BirdsContext);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    {birds
                        .filter((f) => f.id === birdId)
                        .map((bird) => (
                            <View key={bird.id} style={{ flex: 1 }}>
                                <View
                                    style={{
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <CustomImage style={styles.img} imgSrc={imagesUtil[`${bird.img}`]} />
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 8,
                                    }}
                                >
                                    <Pressable
                                        style={styles.button}
                                        onPress={() => {
                                            const birdsCopy = [...birds];
                                            const bird = birdsCopy
                                                .filter((f) => f.id === birdId)
                                                .map((b) => {
                                                    return { ...b, checked: b.checked ? false : true };
                                                })[0];
                                            const indexBird = birdsCopy.findIndex((t) => t.id === birdId);
                                            birdsCopy.splice(indexBird, 1);
                                            birdsCopy.push(bird);
                                            setBirds(birdsCopy);
                                        }}
                                    >
                                        <Text style={{ color: "lightblue", fontWeight: "900", textAlign: "center" }}>
                                            {bird.checked ? "Market as seen" : "No seen"}
                                        </Text>
                                    </Pressable>
                                </View>
                                <View style={{ flex: 3, padding: 8 }}>
                                    <StyledTitle>{bird.name}</StyledTitle>
                                    <StyledDescription>{bird.description}</StyledDescription>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        padding: 8,
                                    }}
                                >
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <Text style={{ fontWeight: "800" }}>Size: </Text>
                                        <StyledDescription>{bird.size}</StyledDescription>
                                    </View>
                                </View>
                            </View>
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
        backgroundColor: "#FFFFFF",
    },
    scrollView: {
        // backgroundColor: "pink",
        // marginHorizontal: 0,
    },
    content: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    img: {
        alignSelf: "center",
        height: 260,
        width: "100%",
        resizeMode: "stretch",
    },
    button: {
        borderRadius: 4,
        backgroundColor: "#2196F3",
        minWidth: "42%",
        padding: 16,
        marginBottom: 8,
    },
});
export default BirdDetailsContainer;
