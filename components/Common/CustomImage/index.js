import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomImage = ({ height, imgSrc }) => {
    if (!imgSrc)
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>Image not found</Text>
                <MaterialCommunityIcons
                    style={{ textAlign: "center" }}
                    name="emoticon-sad-outline"
                    size={32}
                    color="black"
                />
            </View>
        );
    else
        return (
            <View style={styles.container}>
                <Image style={[styles.img, { height: height || 80 }]} source={imgSrc} />
            </View>
        );
};

export default CustomImage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignContent: "center",
    },
    img: {
        alignSelf: "center",
        width: "100%",
        resizeMode: "stretch",
    },
});
