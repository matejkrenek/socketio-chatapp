const chatForm = document.getElementById("chat-form")
const socket = io()

// Message from servers
socket.on("message", (message) => {
    console.log(message)
    outPutMessage(message)
})

// Message submit
chatForm.onsubmit = (e) => {
    e.preventDefault();

    // get message text from input
    const msg = chatForm.msg.value;

    // Emit message to server
    socket.emit("chatMessage", msg).then(res => chatForm.msg.value = "")
}

// output message to dom
function outPutMessage(msg) {
    const div = document.createElement("div")
    div.classList.add("message")
    div.innerHTML = `
        <p class="meta">Mary <span>9:15pm</span></p>
        <p class="text">
            ${msg}
        </p>
    `

    document.querySelector(".chat-messages").append(div)

}