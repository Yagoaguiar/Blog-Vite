import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthValue } from "../content/AuthContext";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import style from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), where("uid", "==", uid));
      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setLoading(false);
    } catch (error) {
      console.log("Error occurred while fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Tem certeza de que deseja excluir este post?");
    if (confirmation) {
      try {
        await deleteDoc(doc(db, "posts", id));
        console.log("Document deleted successfully");
        // Remove the deleted post from the posts state
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } catch (error) {
        console.log("Error occurred while deleting the document:", error);
      }
    }
  };

  const handleViewPost = (id) => {
    navigate(`/post/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.dashboard}>
      <h1>Dashboard</h1>
      <p>Gerencie seus posts</p>
      {posts.length === 0 ? (
        <div className={style.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro Post
          </Link>
        </div>
      ) : (
        <>
          <div className={style.post_header}>
            <span> Título </span>
            <span> Ações </span>
          </div>

          {posts.map((post) => (
            <div className={style.post_row} key={post.id}>
              <p>{post.title}</p>
              <div className={style.actions}>
                <button
                  onClick={() => handleViewPost(post.id)}
                  className="btn btn-outline"
                >
                  Ver
                </button>
                <Link to={`/post/edit/${post.id}`} className="btn btn-outline">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="btn btn-outline btn-danger"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
