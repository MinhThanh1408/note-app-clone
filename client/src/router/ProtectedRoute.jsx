import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function ProtectedRoute({ chidlren }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  });

  return <Outlet />;
}

export default ProtectedRoute;
