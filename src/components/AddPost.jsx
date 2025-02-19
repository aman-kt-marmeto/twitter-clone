import { useRef, useState } from "react";
import { EmojiSvg, MediaSvg } from "./Svg";
import profilePic from "../assets/0x0.jpg"
import useAppContext from "../context/AppContextHook";

export default function AddPost({userProfileImage}) {

  let data = {
    "id": 2,
    "userProfile":profilePic,
    "name": "Elone Musk",
    "userId": "@eloneX",
    "postContent": "",
    "postImage": "",
    "likeCount": 0,
    "commentCount": 0,
    "comments": [
        {
            "user": "@mike_45",
            "comment": "Great thoughts!"
        },
        {
            "user": "@lisa_92",
            "comment": "Much needed today!"
        }
    ]
}

  const {contextPost, setContextPost} = useAppContext()
  
  const ref = useRef();
  const [postData, setPostData] = useState("")
  const [file, setFile] = useState();


  const submitHandler = async (e) => {
    e.preventDefault();
    setPostData("");
    setFile("");
    ref.current.classList.add('preview-hidden');
    data.postContent = postData
    data.postImage = file
    data.id = data.id + 100
    setContextPost((prev) =>{
      return [data, ...prev]
    })
    console.log(contextPost)
  }


  const fileHandler = (e)=>{
    console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        ref.current.removeAttribute('hidden');
        ref.current.classList.remove('preview-hidden');
  }

  return (
    <div className="add-post-container main-container-padding ajc-top-bn border-main-items">
      <div className="user-profile-image">
        <img src={userProfileImage} alt="profile image" height={"16px"} width={"16px"} />
      </div>
      <div className="input">
        <form onSubmit={submitHandler}>
            <textarea name="post_text_content" id="post-input" placeholder="What is happening?!" onChange={(e)=>{setPostData(e.target.value)}} value={postData}></textarea>
            <img className="post-img preview-hidden" id="preview-image" src={file} alt="your image" ref={ref} hidden/>
            <div className="other-inputes">
                <div>
                <label htmlFor="post-image-input">
                <MediaSvg/>
                <input type="file" name="pick-image" id="post-image-input" accept="image/png,image/jpeg" hidden onChange={fileHandler}/>
                </label>
                <label htmlFor="emoji">
                    <EmojiSvg/>
                </label>
                </div>
                <input type="submit" name="submit" id="submit" value={"Post"} />
            </div>
        </form>
      </div>
    </div>
  )
}
