import React, { FormEvent, useState, useEffect } from "react";
import styles from "./register.module.scss";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import imgNGCASH from "../../assets/img/img_ngcash_register.png";
import Loading from "../Loading";

type loginProps = {
  onGetUsername: (nomeUsuario: string) => void;
};

const Register = ({ onGetUsername }: loginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(true);

  useEffect(() => {
    setInterval(() => setIsLoadingLogin(false), 2000);
  }, [isLoadingLogin]);

  const navigate = useNavigate();

  const handleEfetuarLogin = (event: FormEvent) => {
    event.preventDefault();
    if (username === "") {
      Swal.fire("Validação", "Favor prencher o Username", "warning");
      return;
    }

    if (password === "") {
      Swal.fire("Validação", "Favor preencher a senha", "warning");
      return;
    }
    navigate("/homepage");
    onGetUsername(username);
  };

  return (
    <>
      {isLoadingLogin && <Loading />}
      <div className={styles.main_register}>
        <div className={styles.left_register}>
          <h1>
            Cadastre-se e faça <br /> parte do nosso time!
          </h1>
          <img
            src={imgNGCASH}
            className={styles.left_register_image}
            alt="NGCASH"
          />
        </div>
        <form id="formRegister" onSubmit={handleEfetuarLogin}>
          <div className={styles.right_register}>
            <div className={styles.card_register}>
              <h1>REGISTER</h1>
              <div className={styles.textfield}>
                <label htmlFor="Username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  autoComplete="off"
                  value={username || ""}
                  onChange={({ target: { value } }) => {
                    setUsername(value);
                  }}
                />
              </div>
              <div className={styles.textfield}>
                <label htmlFor="Password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  placeholder="Password"
                  value={password}
                  onChange={({ target: { value } }) => {
                    setPassword(value);
                  }}
                />
              </div>
              <button
                className={styles.buttonShowPassword}
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
              <button className={styles.btn_register} type="submit">
                <span className={styles.btn_register2}>Register</span>
              </button>
              <div className={styles.login}>
                <h1>Have an account?</h1>
                <a href="/">
                  <button type="button" className={styles.btn_login}>
                    Log in
                  </button>
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
