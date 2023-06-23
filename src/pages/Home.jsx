import style from "../styles/Home.module.css";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import PostDetail from "./Post.Detail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };
  return (
    <div className={style.home}>
      <h1>Veja o que há de novo </h1>
      <form onSubmit={handleSubmit} className={style.search_form}>
        <input
          type="text"
          placeholder="pesquise por tags também"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Aguarde...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={style.nopost}>
            <p>Não achei esse post</p>
            <Link to="/posts/create" className="btn">
              Criar seu post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
