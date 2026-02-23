import { useState } from "react";
import { api, getCsrf } from "./lib/api";
import HrSales from "./HrSales";

export default function App() {
  const [email, setEmail] = useState("hr@test.com");
  const [password, setPassword] = useState("password");
  const [me, setMe] = useState(null);
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    try {
      await getCsrf();
      await api.post("/api/login", { email, password });
      const res = await api.get("/api/me");
      setMe(res.data.user);
    } catch (e) {
      setMe(null);
      setError(e?.response?.data?.message || e.message);
    }
  };

  if (!me) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Login</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={login}>Login</button>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
      </div>
    );
  }

  return <HrSales />;
}