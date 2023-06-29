import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import styles from "../styles/PostDetail.module.css";

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
    <div className={styles.post_detail}>
      <h2>{post.title}</h2>
      <img src={post.image} alt="Post" />
      <p>{post.body}</p>
      <p>{post.tags}</p>
    </div>
  );
};

export default PostDetail;
