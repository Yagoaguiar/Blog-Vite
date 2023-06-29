import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PostDetail from "./PostDetail";
import style from "../styles/Home.module.css";
import {db} from "../firebase/config"

const Home = () => {
  return (
    <div className={style.home}>
      <h1>Seu perfil cria posts que nos dá feedbacks sobre nossa empresa, você pode fechá-los quando houver resposta no seu dashboard</h1>
     
    </div>
  );
};

export default Home;
