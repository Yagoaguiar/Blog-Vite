import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PostDetail from "./PostDetail";
import style from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={style.home}>
     <h1> Use esse portal para fazer posts sobre nossos produtos</h1>
    </div>
  );
};

export default Home;
