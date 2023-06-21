import style from "../styles/Home.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [query, setQuery] = useState("");
  const [posts] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
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
        <h1>Post</h1>
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
