import style from "../styles/About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={style.about}>
      <h2>
        sobre o <span>Blog</span>
      </h2>
      <p>
        Esse projeto foi feito para faculdade, pensando em trabalhar com rotas,
        validações e firabase.
      </p>
      <p>Todo código foi feito em react </p>
      <Link to="/posts/create" className="btn">
        Criar post
      </Link>
    </div>
  );
};

export default About;
