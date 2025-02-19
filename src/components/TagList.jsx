import { useState, useEffect } from "react";
import useAppContext from "../context/AppContextHook";

export default function TagList() {
    const { tags, contextPost, setContextPost, allPosts } = useAppContext();
    const [selectedTag, setSelectedTag] = useState("All"); // Default selected is "All"

    useEffect(() => {
        console.log("Selected Tag:", selectedTag);
    }, [selectedTag]);

    const handleTagClick = (tag) => {
        setSelectedTag(tag);

        if (tag === "All") {
            setContextPost(allPosts); // Reset to show all posts
        } else {
            const filtered = allPosts.filter(post => post.postContent.includes(tag));
            setContextPost(filtered);
        }
    };

    return (
        <div className="tags-container home-aside-container">
            {/* "All" tag for resetting filter */}
            <span
                className={`tag ${selectedTag === "All" ? "selected" : ""}`}
                onClick={() => handleTagClick("All")}
            >
                All
            </span>

            {/* Display other tags */}
            {tags.length > 0 &&
                tags.map((tag, index) => (
                    <span
                        key={index}
                        className={`tag ${selectedTag === tag ? "selected" : ""}`}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </span>
                ))}
        </div>
    );
}
