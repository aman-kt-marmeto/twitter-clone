import { useState, useEffect } from 'react';
import useAppContext from '../context/AppContextHook';

export default function TagList() {
    const { tags, contextPost, setContextPost } = useAppContext(); // Assume `posts` is stored in context
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        console.log("Selected Tags:", selectedTags);
    }, [selectedTags]);

    const handleTagClick = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
        const filtered = contextPost.filter(post =>
          {  console.log(post)
            return post.postContent.includes(tag)}
        );
        setContextPost(filtered);
    };


    return (
        <div className='tags-container home-aside-container'>
            {tags.length > 0 ? tags.map((tag, index) => (
                <span 
                    key={index}
                    className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                    onClick={() => handleTagClick(tag)}
                >
                    {tag}
                </span>
            )) : ""}
        </div>
    );
}
