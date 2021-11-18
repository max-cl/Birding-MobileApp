import React, { useState, createContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL, KEY_SCURE_STORE } from "@env";

// Contexts
import { useGlobalSpinnerActionsContext } from "./spinner-context";

// Create Context Object
export const UserContext = createContext();

// Create a provider for components to consume and subscribe to changes
const UserContextProvider = (props) => {
    // Context States
    const [setGlobalSpinner] = useGlobalSpinnerActionsContext();
    // Local States
    const [user, setUser] = useState([]);

    useEffect(() => {
        let isMounted = true;
        // SecureStore.deleteItemAsync("token");
        (async () => {
            try {
                setGlobalSpinner(true);
                const token = await SecureStore.getItemAsync(KEY_SCURE_STORE);
                if (token) {
                    // console.log("🔐 Here's your value 🔐 \n" + token);
                    const birdsFetched = await axios.get(`${API_URL}/user/${token}`);
                    if (isMounted) {
                        setUser(birdsFetched.data);
                        setGlobalSpinner(false);
                        // console.log("UserBirds Fetched: ", birdsFetched.data.data);
                    } else {
                        return null;
                    }
                } else {
                    // console.log("No values stored under that key.");
                    const userBirdsCreated = await axios.post(`${API_URL}/user`, {});
                    if (isMounted) {
                        await SecureStore.setItemAsync(KEY_SCURE_STORE, `${userBirdsCreated.data.token}`);
                        setUser(userBirdsCreated.data.data);
                        setGlobalSpinner(false);
                        // console.log("UserBirds Created: ", userBirdsCreated.data);
                    } else {
                        return null;
                    }
                }
            } catch (error) {
                console.log("Error Bird-Context: ", error);
            }
        })();
        return () => {
            isMounted = false;
        };
    }, [setGlobalSpinner]);

    const updateUserBirdChecked = async (birdId) => {
        try {
            const userCopy = { ...user };
            const bird = userCopy.data
                .filter((f) => f.birdId === birdId)
                .map((b) => {
                    return { ...b, checked: b.checked ? false : true };
                })[0];
            const indexBird = userCopy.data.findIndex((t) => t.birdId === birdId);
            userCopy.data.splice(indexBird, 1);
            userCopy.data.push(bird);
            await axios.put(`${API_URL}/user`, {
                token: user._id,
                birdId,
                checked: bird.checked,
            });

            setUser(userCopy);
            console.log("User Bird Checked Updated: ");
        } catch (error) {
            console.log("Error updateUserBirdChecked: ", error);
        }
    };

    const userSetters = {
        user,
        updateUserBirdChecked,
    };

    return <UserContext.Provider value={{ ...userSetters }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
