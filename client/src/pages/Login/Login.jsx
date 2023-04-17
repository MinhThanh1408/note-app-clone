import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const auth = getAuth();

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    await signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    if (user?.uid) {
      console.log("Login exist");
      navigate("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div>
      <Typography variant='h5' sx={{ mb: "20px" }}>
        Welcome to Note App
      </Typography>
      <Button variant='outlined' onClick={handleLoginWithGoogle}>
        Login with GG
      </Button>
    </div>
  );
}

export default Login;
