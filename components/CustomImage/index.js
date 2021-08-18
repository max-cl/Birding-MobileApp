import React from "react";
import { Image, Text } from "react-native";

const CustomImage = ({ style, imgSrc }) => {
    if (!style || !imgSrc) return <Text>Loading</Text>;
    else return <Image style={style} source={imgSrc} />;
};

export default CustomImage;
