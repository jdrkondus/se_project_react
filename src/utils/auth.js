import { baseUrl } from "./api.js";

function signUp(values) {
  
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }).catch((err) => {
    console.error("Sign Up error:", err);
    throw new Error(err);
  });
}

function signIn(values) {
  
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }).catch((err) => {
    console.error("Sign In error:", err);
    throw new Error(err);
  });
}

function validateToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }).catch((err) => {
    console.error("Validate Token error:", err);
    throw new Error(err);
  });
}

function signOut() {
  localStorage.removeItem("jwt");
}

export { signUp, signIn, signOut, validateToken };