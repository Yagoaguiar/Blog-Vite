import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../styles/EditPost.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", id));
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setPost({ id: postDoc.id, ...postData });
          setTitle(postData.title);
          setBody(postData.body);
          setImage(postData.image);
        } else {
          console.log("Post not found");
        }
      } catch (error) {
        console.log("Error occurred while fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    if (!title || !body) {
      setFormError("Por favor, preencha os campos Title e Body");
      return;
    }

    try {
      const postData = {
        title,
        body,
        image: newImage || image,
      };

      await updateDoc(doc(db, "posts", id), postData);
      console.log("Post updated successfully");
      navigate(`/post/${id}`);
    } catch (error) {
      console.log("Error occurred while updating post:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewImage(URL.createObjectURL(file));
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit_post">
      <div className="card">
        <h2>Edit Post</h2>

        <form>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label>Image:</label>
            <img src={newImage || image} alt="Post" type="button" />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <button type="button" onClick={handleUpdate}>
            Update Post
          </button>
          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditPost;
