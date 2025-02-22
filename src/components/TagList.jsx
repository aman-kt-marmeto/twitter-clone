import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAppContext from "../context/AppContextHook";

export default function TagList() {
    const { tags, setContextPost, allPosts } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();
    
    const urlParams = new URLSearchParams(location.search);
    const initialTag = urlParams.get("tag") || "All";
    const [selectedTag, setSelectedTag] = useState(initialTag);

    useEffect(() => {
        const queryParams = new URLSearchParams();
        if (selectedTag !== "All") {
            queryParams.set("tag", selectedTag);
        }
        navigate(`?${queryParams.toString()}`, { replace: true });

        if (selectedTag === "All") {
            setContextPost(allPosts);
        } else {
            const filtered = allPosts.filter(post => post.postContent.includes(selectedTag));
            setContextPost(filtered);
        }
    }, [selectedTag, navigate, allPosts, setContextPost]);

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
    };

    return (
        <div className="tags-container home-aside-container">
            <span
                className={`tag ${selectedTag === "All" ? "selected" : ""}`}
                onClick={() => handleTagClick("All")}
            >
                All
            </span>

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
