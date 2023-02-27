function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const socket = io()
const messages = document.querySelector('.messages')
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const nameBlock = document.querySelector(".name")
const colorName = getRandomColor()

const modal = document.querySelector(".modal")
const btn = document.querySelector(".btnReg")
const header = document.querySelector("header")

const avatar = document.querySelector(".avatar")


btn.addEventListener("click", () => {
    const userName = document.querySelector("#userName").value
    if (!userName) {
        return
    }
    nameBlock.innerHTML = `${userName}`
    modal.classList.remove("active")
    header.classList.add("active")
})

document.querySelector("#userAvatar").addEventListener("input", () => {
    let render = new FileReader()
    render.readAsDataURL(document.querySelector("#userAvatar").files[0])
    render.onload = () => {
        document.querySelector(".preview").setAttribute("src", render.result)
        avatar.setAttribute("src", render.result)
    }
})


form.addEventListener("submit", (e) => {
    e.preventDefault()

    if(input.value) {
        socket.emit("chat message", {
            message: input.value, 
            name: nameBlock.textContent,
            color: colorName,
            avatar: document.querySelector(".preview").getAttribute('src')
        })
        input.value = ""
    }
})

socket.on("chat message", (data) => {
    const item = document.createElement('div')
    item.classList.add("message")
    item.innerHTML = `<img src="${data.avatar}" alt="" class="avatar"> <span style="color:${data.color}">${data.name}</span>: ${data.message}`
    item.innerHTML = `
    <div class="avatarka">
        <img src="${data.avatar}" alt="" class="avatar">
    </div>
    <div class="info">
        <div>
            <span style="color: ${data.color}">${data.name}</span>
            <p>${data.message}</p>
        </div>
    </div>
    
    `
    messages.append(item)
    window.scrollTo(0, document.body.scrollHeight)
})