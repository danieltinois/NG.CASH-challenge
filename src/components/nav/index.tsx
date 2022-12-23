import React, { useState, useEffect } from "react";
import styles from "./nav.module.scss";
import img from "../../assets/img/logo_ng.png";
import Header from "../header";
import Loading from "../Loading";

type HomePageProps = {
  nomeUsuario: string;
};

const HomePage = ({ nomeUsuario }: HomePageProps) => {
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(true);

  useEffect(() => {
    setInterval(() => setIsLoadingLogin(false), 2000);
  }, [isLoadingLogin]);

  return (
    <>
      {isLoadingLogin && <Loading />}
      <div className={styles.container}>
        <nav className={styles.main_nav}>
          <a href=" " className={styles.textngcash}>
            <img src={img} alt="logo_ng" className={styles.logo_img}></img>
            NG.CASH
          </a>
        </nav>
        <nav>
          <div className={styles.textfield}>
            <ul>
              <li className={styles.texthelp}>
                <a
                  className={styles.texthelp}
                  href="https://help.ng.cash/pt-BR/"
                >
                  Pedir ajuda
                </a>
              </li>
            </ul>
            <ul>
              <li className={styles.textlogout}>
                <a className={styles.textlogout} href="/">
                  Sair
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className={styles.main_header}>
        <Header nomeUsuario={nomeUsuario} />
      </div>
    </>
  );
};

export default HomePage;
