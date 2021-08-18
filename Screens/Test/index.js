import React from "react";
import { StyleSheet, SafeAreaView, StatusBar, Text, View } from "react-native";

const TestScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Test Page</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
});
export default TestScreen;
