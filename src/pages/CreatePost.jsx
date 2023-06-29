import style from "../styles/CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInsertDocument } from "../hooks/useInserDocuments";
import { useAuthValue } from "../content/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();

  const { user } = useAuthValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }
    console.log(tagsArray);
    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if (formError) return;
    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });
    navigate("/");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={style.create__post}>
      <h2>Criar post</h2>
      <p>Venha compartilhar histórias, estamos curiosos para saber!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="text"
            required
            placeholder="Pense num bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Imagem:</span>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageUpload}
          />
        </label>
        {image && (
          <div>
            <span>Preview:</span>
            <img
              className={style.create__post__image}
              src={image}
              alt="Preview"
            />
          </div>
        )}
        <label>
          <span>Descreva a sua história:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Criar post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
