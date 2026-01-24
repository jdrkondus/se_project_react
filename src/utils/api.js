const baseUrl = "http://localhost:3001";
const token = localStorage.getItem("jwt");

function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function addItem({ name, imageUrl, weather }) {
  console.log("addItem function called with:", { name, imageUrl, weather });
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function deleteItem(_id) {
  console.log("deleteItem function called with:", { _id });
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export { getItems, addItem, deleteItem };
