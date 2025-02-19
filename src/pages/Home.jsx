import profilePic from "../assets/0x0.jpg"
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import SearchComponent from "../components/SearchComponent";
import "./Home.css"
import "./Posts.css"
import "./Search.css"
import "./AddPost.css"
import useAppContext from "../context/AppContextHook";
import { useEffect } from "react";
import TagList from "../components/TagList";
import { data } from "../data/data";



export default function Home() {
    const {contextPost, setContextPost} = useAppContext()

    useEffect(() => {
        console.log(contextPost)
    }, [contextPost])

    useEffect(()=>{
            setContextPost(data)
        }, []);

    return (
    <>
    <div className="home-main-container">
        <div className="post-container">
        <AddPost userProfileImage={profilePic}></AddPost>
        {
            contextPost.map((post,index)=>(
                <div key={index} className="post-item main-container-padding border-main-items ajc-top-bn">
                    <PostCard post={post}></PostCard>
                </div>
            ))
        }
        </div>
        <aside className="home-aside-container">
            <div className="aside-inner-right">
            <SearchComponent/>
            <TagList/>
            </div>
        </aside>
    </div>
    </>
    );
}
