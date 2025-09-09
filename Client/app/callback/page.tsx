"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CallbackPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");

        if (error) {
          setStatus("error");
          setMessage(`Authorization failed: ${error}`);
          return;
        }

        if (!code) {
          setStatus("error");
          setMessage("Authorization code not received");
          return;
        }

        const storedState = localStorage.getItem("oauth_state");
        if (state !== storedState) {
          setStatus("error");
          setMessage("Invalid state parameter");
          return;
        }

        const tokenResponse = await fetch(
          `${process.env.NEXT_PUBLIC_RESOURCE_SERVER_URL}/token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              code: code,
              redirect_uri: `${process.env.NEXT_PUBLIC_CLIENT_URL}/callback`,
              client_id: "my-oauth-app-fisa",
              client_secret: "abcde",
            }),
          }
        );

        if (!tokenResponse.ok) {
          throw new Error("Token exchange failed");
        }

        const tokenData = await tokenResponse.json();

        localStorage.setItem("access_token", tokenData.access_token);
        if (tokenData.refresh_token) {
          localStorage.setItem("refresh_token", tokenData.refresh_token);
        }

        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_RESOURCE_SERVER_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          localStorage.setItem("user_data", JSON.stringify(userData));
        }

        setStatus("success");
        setMessage("Authentication successful!");

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } catch (err) {
        setStatus("error");
        setMessage("Authentication failed. Please try again.");
      }
    };

    handleCallback();
  }, [searchParams]);

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
          {status === "loading" && "Processing..."}
          {status === "success" && "Success!"}
          {status === "error" && "Error"}
        </h1>

        {status === "loading" && (
          <p style={{ color: "#666" }}>OAuth2 인증을 처리하고 있습니다...</p>
        )}

        {status === "success" && (
          <>
            <div
              style={{
                backgroundColor: "#d4edda",
                color: "#155724",
                padding: "10px",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            >
              {message}
            </div>
            <p style={{ color: "#666" }}>잠시 후 홈페이지로 이동합니다...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div
              style={{
                backgroundColor: "#f8d7da",
                color: "#721c24",
                padding: "10px",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            >
              {message}
            </div>
            <a
              href="/login"
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
              다시 로그인
            </a>
          </>
        )}
      </div>
    </div>
  );
}
