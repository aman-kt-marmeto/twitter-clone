import { useEffect } from 'react';
import useAppContext from '../context/AppContextHook';
// Assuming this is the correct path for your context

const HighlightHashtags = ({ text }) => {
    const { tags, setTags, contextPost } = useAppContext(); // Accessing tags and setTags from the context

    const renderTextWithHashtags = (text) => {
        return text.split(/(\#[a-zA-Z0-9_]+)/g).map((part, index) =>
            part.startsWith("#") ? (
                <span key={index} className="hashtag">
                    {part}
                </span>
            ) : (
                <span key={index}>{part}</span>
            )
        );
    };

    // Extract hashtags and update the tags array in context
    useEffect(() => {
        // Extract hashtags from the text of the post
        const hashtags = text.match(/(\#[a-zA-Z0-9_]+)/g) || []; // Default to an empty array if no hashtags found

        // Add new hashtags to the existing tags array, ensuring no duplicates
        const updatedTags = new Set([...tags, ...hashtags]); // Use Set to eliminate duplicates

        // Update the tags in context with the new unique hashtags
        setTags(prev => [...new Set([...prev,...updatedTags])]); // Convert Set back to an array to update the context
    }, [contextPost]);
    console.log(tags)

    return <p className="post-content">{renderTextWithHashtags(text)}</p>;
};

export default HighlightHashtags;
