"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/logout";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "30px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>
          {isAuthenticated ? `Hello, ${user?.username}!` : "Hello, World!"}
        </h1>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Logout
          </button>
        ) : (
          <a
            href="/login"
            style={{
              backgroundColor: "black",
              color: "white",
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              display: "inline-block",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
}
