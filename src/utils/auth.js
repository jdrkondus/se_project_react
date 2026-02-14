import { baseUrl } from "./api.js";

function signUp(values) {
  console.log("Signing up with values:", values);
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then(async (res) => {
    if (res.ok) return res.json();
    const errorBody = await res.json().catch(() => ({}));
    // Prefer backend error message if available
    const errorMsg = errorBody.message || `Error: ${res.status}`;
    return Promise.reject(errorMsg);
  });
}

function signIn(values) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then(async (res) => {
    if (res.ok) return res.json();
    const errorBody = await res.json().catch(() => ({}));
    const errorMsg = errorBody.message || `Error: ${res.status}`;
    return Promise.reject(errorMsg);
  });
}

function updateUserProfile({ name, avatar, token }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }).catch((err) => {
    console.error("Update User Profile error:", err);
    throw new Error(err);
  });
} 


function validateToken(token) {
  return fetch(`${baseUrl}/profile/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }).catch((err) => {
    console.error("Validate Token error:", err);
    throw new Error(err);
  });
}

function signOut() {
  localStorage.removeItem("jwt");
}

export { signUp, signIn, signOut, validateToken, updateUserProfile };