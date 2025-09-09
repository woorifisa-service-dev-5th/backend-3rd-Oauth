"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    setIsLoading(true);
    setError("");

    try {
      const authServerUrl = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;
      const clientId = "my-oauth-app-fisa";
      const clientSecret = "abcde";
      const redirectUri = encodeURIComponent(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}`
        // /login/oauth2/code/my-oauth-app-fisa`
      );
      const scope = "read write"; // 필요한 scope
      const state = Math.random().toString(36).substring(2); // 임의 문자열

      localStorage.setItem("oauth_state", state);

      const authUrl = `${authServerUrl}/oauth2/authorize?response_type=code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

      window.location.href = authUrl; // 브라우저를 인가 서버로 이동
    } catch (err: any) {
      setError(err.message || "로그인 실패");
      setIsLoading(false);
    }
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
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>로그인</h1>

        {error && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? "#6c757d" : "black",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
            width: "100%",
            fontSize: "16px",
          }}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <a href="/" style={{ color: "black", textDecoration: "none" }}>
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
