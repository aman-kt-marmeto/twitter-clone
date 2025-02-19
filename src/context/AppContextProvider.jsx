import {  useState } from "react";

import AppContext from "./AppContext";


export default function AppProvider({ children }) {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedtags] = useState("")
    const [contextPost, setContextPost] = useState([])
    return (
        <AppContext.Provider value={{ tags, setTags, contextPost, setContextPost, selectedTags, setSelectedtags }}>
            {children}
        </AppContext.Provider>
    );
};
