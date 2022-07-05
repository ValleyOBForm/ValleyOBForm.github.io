import d from "../assets/js/NTechDOM.js";
import { pages } from "../assets/js/pages.js";
const header = d.createElement("header").setAttribute({
  class: "header",
});

const item = {
  Users: "userList",
  Documents: "documentList",
  Inbox: "inbox",
  "Change Password": "changePass",
  Logout: "logout",
};

const nav = d.createElement("nav");

for (let x in item) {
  nav.append(
    d.createElement("div", x, {
      onclick: "window.location='#/" + item[x] + "'",
      id: "nav" + item[x],
    })
  );
}

header.append(
  nav,
  d.createElement("div", "ValleyOB Form", { class: "name" })
);

header.onload = () => {
  let active = document.querySelector(
    `#nav${window.location.hash.toString().replace("#/", "")}`
  );

  if (active) {
    active.style.color = "#004a7f";
  }
};
export { header };
