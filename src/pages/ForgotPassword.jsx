import style from "../styles/ForgotPassword.module.css";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        "Um e-mail de redefinição de senha foi enviado para o seu endereço de e-mail."
      );
      setErrorMessage("");
      setEmail("");
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(
        "Ocorreu um erro ao redefinir a senha. Por favor, verifique o endereço de e-mail e tente novamente."
      );
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div className={style.forgot_password}>
      <h2>Esqueceu a senha</h2>
      {successMessage && (
        <p className={style.success_message}>{successMessage}</p>
      )}
      {errorMessage && (
        <p className={style.error_message}>{errorMessage}</p>
      )}
      <form onSubmit={handleResetPassword}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Digite seu e-mail"
            onChange={handleEmailChange}
            value={email}
          />
        </label>
        <button className="btn" type="submit">
          Redefinir senha
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
