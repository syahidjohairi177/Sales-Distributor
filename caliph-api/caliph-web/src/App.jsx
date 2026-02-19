import { useState } from "react";
import { api, getCsrf } from "./lib/api";

export default function App() {
  const [email, setEmail] = useState("hr@test.com");
  const [password, setPassword] = useState("password");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = async () => {
    setError("");

    try {
      // STEP 1 — Get CSRF cookie
      await getCsrf();

      // STEP 2 — Login
      await api.post("/api/login", { email, password });

      // STEP 3 — Get current user
      const res = await api.get("/api/me");
      setUser(res.data.user);
    } catch (e) {
      setUser(null);
      setError(
        e?.response?.data?.message ||
        `Error: ${e?.response?.status || ""} ${e.message}`
      );
    }
  };

  const logout = async () => {
    await api.post("/api/logout");
    setUser(null);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Sanctum Login Test</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>User</h3>
      <pre>{user ? JSON.stringify(user, null, 2) : "Not logged in"}</pre>
    </div>
  );
}