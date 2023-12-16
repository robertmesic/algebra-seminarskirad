document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('darkmode-toggle');
    const appName = document.querySelector(".appName");
    const usersInChat = document.querySelector(".activeUsers");
    const messages = document.querySelector(".messageBox");
    const formMsgs = document.querySelector(".formMsg");
    const inpMsgs = document.querySelector(".inputMsg");
    const body = document.body;

    function changeBackgroundImage() {
        if (darkModeToggle.checked) {
            body.style.backgroundImage = "url('../assets/images/main.png')";
            appName.style.color = "white";
            usersInChat.style.color = "white";
        } else {
            body.style.backgroundImage = "url('../assets/images/white.png')";
            appName.style.color = "black";
            usersInChat.style.color = "black";
            messages.style.backgroundColor = "rgba(192, 192, 192, 0.5)";
            inpMsgs.style.backgroundColor = "#d3d3d3";
            formMsgs.style.color = "black";
        }
    }
    changeBackgroundImage();

    darkModeToggle.addEventListener('change', changeBackgroundImage);
});