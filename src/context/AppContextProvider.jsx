import { useState } from "react";
import AppContext from "./AppContext";

export default function AppProvider({ children }) {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState("All");
    const [contextPost, setContextPost] = useState([]);
    const [allPosts, setAllPosts] = useState([]); // Store all posts

    return (
        <AppContext.Provider value={{ 
            tags, setTags, 
            contextPost, setContextPost, 
            allPosts, setAllPosts, 
            selectedTags, setSelectedTags 
        }}>
            {children}
        </AppContext.Provider>
    );
};
