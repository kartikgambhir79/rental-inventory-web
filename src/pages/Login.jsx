
// NOTE: Auto-updated: use api.login({email,password}) and api.saveAuth({token,user}) to persist auth.
// src/components/Login.jsx
import React, { useState } from "react";
import * as api from '../api/api';
import { login } from "../api/mockApi.js";
import bgImg from "../assets/Login.jpg";


export default function Login({ onLogin }) {
  const [view, setView] = useState("login");
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const resetMessages = () => {
    setErr("");
    setMsg("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    resetMessages();
    try {
      const user = api.login({ email: u, password: p });
      onLogin(user);
    } catch (e) {
      setErr(e.message);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    resetMessages();
    if (!email) return setErr("Please enter your registered email.");
    setMsg(`Password reset link sent to ${email}`);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    resetMessages();
    if (!u || !email || !p)
      return setErr("Please fill all fields to register.");
    setMsg("Account created successfully! Redirecting to login...");
    setTimeout(() => setView("login"), 1500);
  };

  return (
    <div
      className="loginWrap"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="loginCard">
        <h2 className="title">
          {view === "login"
            ? "Timeless Trunk"
            : view === "forgot"
              ? "Forgot Password"
              : "Create Account"}
        </h2>
        <p className="subtitle">
          {view === "login"
            ? "Sign in to continue"
            : view === "forgot"
              ? "Reset your password"
              : "Register a new account"}
        </p>

        {/* ✅ Animated form area */}
        <div key={view} className="formContainer fadeSlide">
          {view === "login" && (
            <form onSubmit={handleLogin}>
              <div className="field">
                <label>Username</label>
                <input
                  value={u}
                  onChange={(e) => setU(e.target.value)}
                  placeholder="Enter username"
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  value={p}
                  onChange={(e) => setP(e.target.value)}
                  placeholder="Enter password"
                />
              </div>

              <div style={{ textAlign: "right", marginBottom: "1rem" }}>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setView("forgot");
                    resetMessages();
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              {err && <div className="errorMsg">{err}</div>}
              {msg && <div className="successMsg">{msg}</div>}

              <button type="submit" className="btn">
                Log In
              </button>

              <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setView("signup");
                    resetMessages();
                  }}
                >
                  Sign Up
                </button>
              </p>
            </form>
          )}

          {view === "forgot" && (
            <form onSubmit={handleForgotPassword}>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                />
              </div>

              {err && <div className="errorMsg">{err}</div>}
              {msg && <div className="successMsg">{msg}</div>}

              <button type="submit" className="btn">
                Send Reset Link
              </button>

              <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                Back to{" "}
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setView("login");
                    resetMessages();
                  }}
                >
                  Login
                </button>
              </p>
            </form>
          )}

          {view === "signup" && (
            <form onSubmit={handleSignUp}>
              <div className="field">
                <label>Username</label>
                <input
                  value={u}
                  onChange={(e) => setU(e.target.value)}
                  placeholder="Choose a username"
                />
              </div>

              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  value={p}
                  onChange={(e) => setP(e.target.value)}
                  placeholder="Create a password"
                />
              </div>

              {err && <div className="errorMsg">{err}</div>}
              {msg && <div className="successMsg">{msg}</div>}

              <button type="submit" className="btn">
                Sign Up
              </button>

              <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                Already have an account?{" "}
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setView("login");
                    resetMessages();
                  }}
                >
                  Log In
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
