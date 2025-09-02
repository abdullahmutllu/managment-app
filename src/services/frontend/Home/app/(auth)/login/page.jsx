'use client';
import AuthScene from "../AuthScene";
import Cookies from "js-cookie";

const LoginPage = () => {
  const handleLogin = (data) => {
    console.log('Login attempt:', data);
    Cookies.set("token", "test-user-token", { expires: 1 }); // 1 gün geçerli
    window.location.href = "/"; // Anasayfaya yönlendir
  };

  return <AuthScene mode="login" onFormSubmit={handleLogin} />;
};

export default LoginPage;
