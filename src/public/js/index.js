const socket = io();
const container = document.getElementById("realTimeProductsContainer");

socket.on("products", (data) => {
  let html = "";
  data.forEach((product) => {
    html += `<div style="width: 30%;">
    <div style="display: grid; place-content: center;">
      <img
        src="${product.thumbnails[0]}"
        alt="${product.title}"
        style="aspect-ratio: 1; width: 200px; object-fit: cover;"
      />
    </div>
    <h2>${product.title}</h2>
    <h2>${product.price}</h2>
    <p>${product.description}</p>
  </div>`;
  });
  container.innerHTML = html;
});
