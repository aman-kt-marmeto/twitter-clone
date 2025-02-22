import { useEffect, useRef, useState } from "react";
import useAppContext from "../context/AppContextHook";
import { data } from "../data/data";
import { data2 } from "../data/data2";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import SearchComponent from "../components/SearchComponent";
import TagList from "../components/TagList";
import profilePic from "../assets/0x0.jpg";
import "./Home.css";
import "./Posts.css";
import "./Search.css";
import "./AddPost.css";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function Home() {
    const { contextPost, setContextPost, setAllPosts, allPosts } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const observerTarget = useRef(null);

    useEffect(() => {
        const savedPosts = localStorage.getItem('posts');
        if (!savedPosts) {
            // First visit: use static data and save it
            setContextPost(data);
            setAllPosts(data);
            localStorage.setItem('posts', JSON.stringify(data));
        } else {
            // Subsequent visits: use data from localStorage
            const parsedPosts = JSON.parse(savedPosts);
            setContextPost(parsedPosts);
            setAllPosts(parsedPosts);
        }
    }, []);

    useEffect(()=>{
        if (allPosts.length > 0) {
            localStorage.setItem('posts', JSON.stringify(allPosts));
        }
        setContextPost(allPosts)
    },[allPosts , setAllPosts])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading && !allDataLoaded) {
                    loadMorePosts();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.disconnect();
            }
        };
    }, [loading, allDataLoaded, observerTarget.current]);

    const loadMorePosts = () => {
        if (loading || allDataLoaded) return; // Add guard clause
        
        console.log("--------loadMorePosts--------")
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            setAllPosts(prevPosts => {
                const newPosts = [...prevPosts, ...data2];
                localStorage.setItem('posts', JSON.stringify(newPosts));
                return newPosts;
            });
            setContextPost(prevPosts => [...prevPosts, ...data2]);
            setLoading(false);
            setAllDataLoaded(true); // Since we only have one set of additional data
        }, 1500);
    };
    return (
        <div className="home-main-container">
            <div className="post-container">
                <AddPost userProfileImage={profilePic} />
                <button 
                    onClick={() => {
                        localStorage.clear();
                        setAllPosts([]);
                        setContextPost([]);
                        setAllDataLoaded(false);
                    }}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: 'var(--primary-color)',
                        border: 'none',
                        borderRadius: '4px',
                        color: 'white',
                        cursor: 'pointer',
                        margin: '12px'
                    }}
                >
                    Clear Local Storage
                </button>
                {contextPost.length > 0 ? (
                    <>
                        {contextPost.map((post, index) => (
                            <div key={index} className="post-item main-container-padding border-main-items ajc-top-bn">
                                <PostCard post={post} />
                            </div>
                        ))}
                        {!allDataLoaded && !loading && (
                            <div ref={observerTarget}>
                                <LoadingSkeleton />
                            </div>
                        )}
                        {loading && <LoadingSkeleton />}
                    </>
                ) : (
                    <div className="no-posts-found">No Posts Found</div>
                )}
            </div>

            <aside className="home-aside-container">
                <div className="aside-inner-right">
                    <SearchComponent />
                    <TagList />
                </div>
            </aside>
        </div>
    );
}
