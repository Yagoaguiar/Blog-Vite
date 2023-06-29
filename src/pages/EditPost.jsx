import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import style from "../styles/EditPost.module.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState(null); // Armazena a nova imagem selecionada

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
    try {
      const postData = {
        title,
        body,
        image: newImage || image, // Use a nova imagem selecionada, se disponível, caso contrário, mantenha a imagem existente
      };

      await updateDoc(doc(db, "posts", id), postData);
      console.log("Post updated successfully");
      navigate(`/post/${id}`); // Redirecionar para a página de detalhes do post
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
    <div className={style["edit-post"]}>
      <h2>Edit Post</h2>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Image:</label>
          <img src={newImage || image} alt="Post" />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <button type="button" onClick={handleUpdate}>
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
