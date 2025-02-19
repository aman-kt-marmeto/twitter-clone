import { useState, useEffect } from "react";
import { SearchSvg, CrossSvg } from "./Svg";
import useAppContext from "../context/AppContextHook";

export default function SearchComponent() {
    const { allPosts, setContextPost } = useAppContext(); 
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setContextPost(allPosts); // Reset to all posts when search is cleared
        } else {
            const filteredPosts = allPosts.filter(post => 
                post.postContent.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setContextPost(filteredPosts);
        }
    }, [searchTerm, allPosts, setContextPost]);

    const clearSearch = () => {
        setSearchTerm(""); // Clear search input
    };

    return (
        <div className="search-component">
            <SearchSvg className="searchsvg" />
            <input
                type="text"
                id="search-input"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <CrossSvg onClick={clearSearch} style={{ cursor: "pointer" }} />}
        </div>
    );
}
