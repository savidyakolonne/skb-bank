import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAsgardeo } from "@asgardeo/react";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const { isSignedIn, user } = useAsgardeo();
  const navigate = useNavigate();

  // When Asgardeo SSO completes and the user is signed in,
  // redirect them to the dashboard automatically.
  useEffect(() => {
    if (isSignedIn && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [isSignedIn, user, navigate]);

  return <AppRoutes />;
}