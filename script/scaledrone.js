const ROOM_ID = "sjsVkk1CwHhTtAqH";
let actUsers = [];

const drone = new ScaleDrone(ROOM_ID, {
  data: {
    name: fullNames(),
    color: getRandomColor(),
  },
});

drone.on("open", (error) => {
  if (error) {
    return console.error(error);
  }

  const room = drone.subscribe("observable-room");

  room.on("open", (error) => {
    if (error) {
      return console.error(error);
    }
    console.log("Successfully joined room");
  });

  room.on("members", (m) => {
    actUsers = m;
    updateMembersDOM();
  });

  room.on("member_join", (member) => {
    actUsers.push(member);
    updateMembersDOM();
  });

  room.on("member_leave", ({ id }) => {
    const index = actUsers.findIndex((member) => member.id === id);
    actUsers.splice(index, 1);
    updateMembersDOM();
  });

  room.on("data", (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    }
  });
});

drone.on("close", (event) => {
  console.log("Connection was closed", event);
});

function fullNames() {
  const names = [
    "Luka Ivanušec",
    "Stefan Ristovski",
    "Ivan Nevistić",
    "Josip Šutalo",
    "Dominik Livaković",
    "Bruno Petković",
    "Dario Špikić",
    "Luka Stojković",
    "Lukas Kačavenda",
    "Martin Baturina",
    "Josip Mišić",
    "Marko Bulat",
    "Danijel Zagorac",
    "Boško Šutalo",
    "Robert Ljubičić",
    "Antonio Marin",
    "Josip Drmić",
    "Petar Sučić",
    "Gabriel Rukavina",
    "Luka Menalo",
    "Dino Perić"
  ];

  return names[Math.floor(Math.random() * names.length)];
}

function getRandomColor() {
  var r = Math.floor(Math.random() * 128 + 127).toString(16);
  var g = Math.floor(Math.random() * 128 + 127).toString(16);
  var b = Math.floor(Math.random() * 128 + 127).toString(16);

  r = r.length === 1 ? "0" + r : r;
  g = g.length === 1 ? "0" + g : g;
  b = b.length === 1 ? "0" + b : b;

  return "#" + r + g + b;
}


const DOM = {
  formMsg: document.querySelector(".formMsg"),
  msg: document.querySelector(".messageBox"),
  typeMsg: document.querySelector(".inputMsg"),
  actUsers: document.querySelector(".activeNow"),
};
DOM.formMsg.addEventListener("submit", sendMessage);


function sendMessage() {
  const value = DOM.typeMsg.value;

  if (value === "") {
    return;
  }

  DOM.typeMsg.value = "";
  drone.publish({
    room: "observable-room",
    message: value,
  });
}

function updateMembersDOM() {
  DOM.actUsers.innerHTML = `${actUsers.map((value) => {
    return `<span style="color: ${value.clientData.color}">${value.clientData.name}</span>`;
  })
    .join("<br>")}`;
}


function createMessageElement(text, member) {
  const clientID = drone.clientId;
  const messageFromMe = member.id === clientID;
  const className = messageFromMe ? "message currentMember" : "message";
  const { name, color } = member.clientData;
  const msg = document.createElement("div");

  msg.className = "messageText";
  msg.appendChild(document.createTextNode(text));

  const profile = document.createElement("div");
  profile.className = "profile";

  const character = document.createElement("div");
  character.appendChild(document.createTextNode(name));
  character.style.color = color;
  character.className = "name";

  profile.appendChild(character);

  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}`.padStart(2, "0");
  const date = new Intl.DateTimeFormat(navigator.language).format(now);
  const msgDateTime = document.createElement("div");

  msgDateTime.textContent = `${date}, ${time}`;
  msgDateTime.classList.add("time-date");

  const element = document.createElement("div");
  element.appendChild(profile);
  element.appendChild(msg);
  element.className = className;
  element.append(msgDateTime);

  return element;
}

function addMessageToListDOM(text, member) {
  const element = DOM.msg;
  const wasTop = element.scrollTop === element.scrollHeight - element.clientHeight;
  element.appendChild(createMessageElement(text, member));
  if (wasTop) {
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }
}

const typeMsg = DOM.typeMsg;