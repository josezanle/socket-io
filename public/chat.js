const socket = io();

let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener("click", function () {
  socket.emit("chat:message", {
    message: message.value,
    username: username.value,
  });
});

//escuchar al otro chat si tipea
message.addEventListener("keypress", function () {
  socket.emit("chat:typing", username.value);
});

socket.on("chat:message", function (data) {
  // finalizar escucha del "tipeando"
  actions.innerHTML = "";

  // añadir la data dentro del input "output"
  output.innerHTML += `
   <p>
   <strong>${data.username}</strong>: ${data.message}
   </p>
   `;
});

// escribir dentro del input actions, si hay alguien tipeando
socket.on("chat:typing", function (data) {
  actions.innerHTML = `<p><em>${data} Esta escribiendo un mensaje.</em></p>`;
});
