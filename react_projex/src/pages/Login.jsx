import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/constants";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8080/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      login(data.token, data.username);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
        <p className="text-center text-gray-600 mb-4">
          Sign in to your account
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={inputClass}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClass}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up
          </a>
        </p>
        <p className="text-center text-xs text-gray-400 mt-4">
          © 2025 Dummy App. All rights reserved.
        </p>
      </div>
    </div>
  );
}
