import { useCallback, useState } from "react";

// Hook
export const useToggle = (initialState = false) => {
    // Initialize the state
    const [state, setState] = useState(initialState);

    // Define and memorize toggler function in case we pass down the component
    const toggle = useCallback(() => setState((state) => !state));

    return [state, toggle];
};
