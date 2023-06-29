import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import style from "../styles/Home.module.css";

const HomeLogado = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const snapshot = await getDocs(postsCollection);
        const fetchedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.log("Error occurred while fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={style.home}>
      <h1>
        Seu perfil cria posts que nos dá feedbacks sobre nossa empresa, você
        pode fechá-los quando houver resposta no seu dashboard
      </h1>
      <h2>Posts:</h2>
      <div className={style.cardContainer}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className={style.card} key={post.id}>
              <h3 className={style.cardTitle}>{post.title}</h3>
              <p className={style.cardBody}>{post.body}</p>
              {post.tags && (
                <ul className={style.tags}>
                  {post.tags.map((tag) => (
                    <li key={tag} className={style.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              <Link to={`/post/${post.id}`} className={style.cardLink}>
                Ver detalhes
              </Link>
            </div>
          ))
        ) : (
          <p>Nenhum post encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default HomeLogado;
