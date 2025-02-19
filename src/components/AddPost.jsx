import { useRef, useState } from "react";
import { EmojiSvg, MediaSvg } from "./Svg";
import profilePic from "../assets/0x0.jpg";
import useAppContext from "../context/AppContextHook";

export default function AddPost({ userProfileImage }) {
    const { setAllPosts, setContextPost } = useAppContext();
  
    const ref = useRef(null);
    const [postData, setPostData] = useState("");
    const [file, setFile] = useState(null);
  
    const submitHandler = (e) => {
        e.preventDefault();
        if (!postData.trim()) return; // Prevent adding empty posts

        const newPost = {
            id: Date.now(), // Unique ID
            userProfile: profilePic,
            name: "Elon Musk",
            userId: "@elonX",
            postContent: postData,
            postImage: file,
            likeCount: 0,
            commentCount: 0,
            comments: [],
        };

        // Append the new post while keeping the old ones
        setAllPosts(prevPosts => [newPost, ...prevPosts]);
        setContextPost(prevPosts => [newPost, ...prevPosts]);

        // Reset fields
        setPostData("");
        setFile(null);
        if (ref.current) {
            ref.current.classList.add("preview-hidden");
        }
    };

    const fileHandler = (e) => {
        if (e.target.files.length > 0) {
            const imageURL = URL.createObjectURL(e.target.files[0]);
            setFile(imageURL);
            if (ref.current) {
                ref.current.removeAttribute("hidden");
                ref.current.classList.remove("preview-hidden");
            }
        }
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

                    {/* Image Preview */}
                     <img className="post-img preview-hidden" id="preview-image" src={file} alt="Preview" ref={ref} />

                    <div className="other-inputes">
                        <div>
                            <label htmlFor="post-image-input">
                                <MediaSvg />
                                <input
                                    type="file"
                                    id="post-image-input"
                                    accept="image/png, image/jpeg"
                                    hidden
                                    onChange={fileHandler}
                                />
                            </label>
                            <label htmlFor="emoji">
                                <EmojiSvg />
                            </label>
                        </div>
                        <input type="submit" id="submit" value="Post" disabled={!postData.trim()} />
                    </div>
                </form>
            </div>
        </div>
    );
}
