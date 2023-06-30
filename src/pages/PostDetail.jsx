import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import "../styles/PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", id));
        if (postDoc.exists()) {
          setPost({ id: postDoc.id, ...postDoc.data() });
        } else {
          console.log("Post not found");
        }
      } catch (error) {
        console.log("Error occurred while fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post_detail">
      <div className="card">
        <h2>{post.title}</h2>
        <img src={post.image} alt="Post" />
        <p>{post.body}</p>
        <div className="tags">
          <p><span>Tags:</span></p>
          <p>{post.tags}</p>
        </div>
        <p className="createdby">Created by: {post.createdBy}</p>
      </div>
    </div>
  );
};

export default PostDetail;
