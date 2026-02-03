import { baseUrl } from "./api.js";



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

export { signUp, signIn, signOut, validateToken, updateUserProfile };