import { useRef, useState } from "react";
import { EmojiSvg, MediaSvg } from "./Svg";
import profilePic from "../assets/0x0.jpg";
import useAppContext from "../context/AppContextHook";

export default function AddPost({ userProfileImage }) {
    const { allPosts, setAllPosts, contextPost, setContextPost } = useAppContext();

    const ref = useRef();
    const [postData, setPostData] = useState("");
    const [file, setFile] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();

        const newPost = {
            id: Date.now(), // Unique ID
            userProfile: profilePic,
            name: "Elon Musk",
            userId: "@elonX",
            postContent: postData.trim(),
            postImage: file || "",
            likeCount: 0,
            commentCount: 0,
            comments: [
                { user: "@mike_45", comment: "Great thoughts!" },
                { user: "@lisa_92", comment: "Much needed today!" }
            ],
        };

        // Reset input fields
        setPostData("");
        setFile(null);
        ref.current.classList.add("preview-hidden");

        // Update posts
        setAllPosts((prev) => [newPost, ...prev]);
        setContextPost((prev) => [newPost, ...prev]);
    };

    const fileHandler = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        ref.current.removeAttribute("hidden");
        ref.current.classList.remove("preview-hidden");
    };

    return (
        <div className="add-post-container main-container-padding ajc-top-bn border-main-items">
            <div className="user-profile-image">
                <img src={userProfileImage} alt="profile" height="16px" width="16px" />
            </div>
            <div className="input">
                <form onSubmit={submitHandler}>
                    <textarea
                        name="post_text_content"
                        id="post-input"
                        placeholder="What is happening?!"
                        onChange={(e) => setPostData(e.target.value)}
                        value={postData}
                    ></textarea>
                    {file && <img className="post-img" id="preview-image" src={file} alt="preview" ref={ref} />}
                    <div className="other-inputes">
                        <div>
                            <label htmlFor="post-image-input">
                                <MediaSvg />
                                <input type="file" id="post-image-input" accept="image/png,image/jpeg" hidden onChange={fileHandler} />
                            </label>
                            <label htmlFor="emoji">
                                <EmojiSvg />
                            </label>
                        </div>
                        <input 
                            type="submit" 
                            id="submit" 
                            value="Post" 
                            disabled={!postData.trim() && !file} 
                            style={{ opacity: (!postData.trim() && !file) ? 0.5 : 1, cursor: (!postData.trim() && !file) ? "not-allowed" : "pointer" }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
