import HighlightHashtags from "./HighlightHashtags";
import { BookmarkSvg, CommentSvg, CopylinkSvg, EngagementSvg, LikeSvg, RepostSvg } from "./Svg";


export default function PostCard({post}) {
  return (
    <div className='post-card'>
      <div className="post-profile-image">
        <img className="post-img" src={post.userProfile} alt="profile-picture" />
      </div>
      <div className="post-nd-name">
        <div className="post-user-details">
            <span className="post-user-name">{post.name}</span> <span className="post-user-id">{post.userId}</span>
        </div>
        <div className="post-content">
            <div className="post-text">
              <HighlightHashtags text={post.postContent}/>
            </div>
            {post.postImage ? (<div className="post-image">
                <img src={post.postImage} alt="post-image" />
            </div>):""}
        </div>
        <div className="likes-nd-comments">
          <div className="comment">
            <CommentSvg/>
            <span>{post.commentCount}</span>
          </div>
          <div className="repost">
            <RepostSvg/><span>20</span>
          </div>
          <div className="likes">
            <LikeSvg/> <span>{post.likeCount}</span>
          </div>
          <div className="engagement">
            <EngagementSvg/><span>1M</span>
          </div>
          <div className="bookmark-nd-copylink">
            <div className="bookmark-post">
              <BookmarkSvg/>
            </div>
            <div className="copy-post-link">
              <CopylinkSvg/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
