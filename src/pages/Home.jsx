import { useEffect } from "react";
import useAppContext from "../context/AppContextHook";
import { data } from "../data/data";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import SearchComponent from "../components/SearchComponent";
import TagList from "../components/TagList";
import profilePic from "../assets/0x0.jpg";
import "./Home.css";
import "./Posts.css";
import "./Search.css";
import "./AddPost.css";

export default function Home() {
    const { contextPost, setContextPost, setAllPosts } = useAppContext();

    useEffect(() => {
        console.log(contextPost);
    }, [contextPost]);

    useEffect(() => {
        setContextPost(data);
        setAllPosts(data); // Store original data
    }, []);

    return (
        <div className="home-main-container">
            <div className="post-container">
                <AddPost userProfileImage={profilePic} />
                {contextPost.map((post, index) => (
                    <div key={index} className="post-item main-container-padding border-main-items ajc-top-bn">
                        <PostCard post={post} />
                    </div>
                ))}
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
