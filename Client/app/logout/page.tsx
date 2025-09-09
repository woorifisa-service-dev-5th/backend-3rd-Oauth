"use client";

import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    const logout = async () => {
      // 서버 로그아웃 요청
      // TODO: 로그아웃 요청 경로 확인하기
      await fetch(`/oauth/logout`, {
        method: "POST",
        credentials: "include",
      });
    };

    logout();
  }, []);

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
        <h1 style={{ marginBottom: "20px" }}>로그아웃 완료</h1>
        <p style={{ marginBottom: "30px", color: "#666" }}>
          성공적으로 로그아웃되었습니다.
        </p>
        <a
          href="/"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            display: "inline-block",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
}
