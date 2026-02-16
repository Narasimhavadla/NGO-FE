import { useState } from "react";
import NGOLoginPage from "../pages/login";
import RegisterPage from "../pages/register";

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? (
        <NGOLoginPage toggle={() => setShowLogin(false)} />
      ) : (
        <RegisterPage toggle={() => setShowLogin(true)} />
      )}
    </>
  );
}
