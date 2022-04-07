import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }, []);

  return (
    <div className="notfound">
      <h1>404</h1>
      <h2>You will be redirected to the homepage in a few seconds ...</h2>
    </div>
  );
}
