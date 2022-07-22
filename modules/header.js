import d from "../../assets/js/NTechDOM.js";
import {
  userIcon,
  docIcon,
  inboxIcon,
  logoutIcon,
  changePassIcon,
  logo,
} from "./icons.js";
import { pages } from "../assets/js/pages.js";
const header = d.createElement("header").setAttribute({
  class: "header",
});

const item = {
  Users: ["userList", userIcon],
  Documents: ["documentList", docIcon],
  Inbox: ["inbox", inboxIcon],
  "Change Password": ["changePass", changePassIcon],
  Logout: ["logout", logoutIcon],
};

const nav = d.createElement("nav");

for (let x in item) {
  nav.append(
    d.createElement(
      "div",
      [d.createElement("div", item[x][1]), d.createElement("div", x)],
      {
        onclick:
          item[x][0] != "sendEmail"
            ? "window.location='#/" + item[x][0] + "'"
            : "",
        id: "nav" + item[x][0],
        class: "div",
      }
    )
  );
}
header.append(
  d.createElement("div", logo, {
    class: "logo2",
  }),
  nav
);

header.onload = () => {
  const navList = {
    user: "userList",
    document: "documentList",
    inbox: "inbox",
    changePass: "changePass",
  };

  let ele = "user";
  for (let x in navList) {
    if (
      window.location.hash.toString().replace("#/", "").indexOf(x) >=
      0
    ) {
      ele = x;
    }
  }

  const element = navList[ele];
  if (element) {
    let active = document.querySelector(`#nav${element}`);

    if (active) {
      active.style.color = "#0e78c4";
      active.style.fill = "#0e78c4";
    }
  }
};
export { header };
