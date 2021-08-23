import React from "react";
import { StyleSheet, Image, View, ActivityIndicator } from "react-native";

const CustomImage = ({ height, imgSrc }) => {
    if (!height || !imgSrc) return <ActivityIndicator style={styles.container} size="large" />;
    else
        return (
            <View style={styles.container}>
                <Image style={[styles.img, { height }]} source={imgSrc} />
            </View>
        );
};

export default CustomImage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
    },
    img: {
        alignSelf: "center",
        width: "80%",
        resizeMode: "stretch",
    },
});
