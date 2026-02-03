import { signOut } from "./auth";

const baseUrl = "https://api.wtwrwardrobe.ufodns.com";

function getCurrentUser(token) {
  return fetch(`${baseUrl}/profile/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function updateProfile(token, { name, email }) {
  return fetch(`${baseUrl}/profile/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  }).then((res) => {
      return res.ok ? res.json(): Promise.reject(`Error: ${res.status}`);
  });
    }

function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // Try to parse error as JSON, fallback to text
    return res.json().catch(() => res.text()).then((err) => {
      throw new Error(err);
    });
  });
}

function addItem({ name, imageUrl, weather, token }) {


  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function deleteItem(_id, token) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}



export { getItems, addItem, deleteItem, baseUrl, getCurrentUser, updateProfile };
