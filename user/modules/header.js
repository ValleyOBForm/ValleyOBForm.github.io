import d from "../../assets/js/NTechDOM.js";
import {
  docIcon,
  sendIcon,
  inboxIcon,
  logoutIcon,
  logo,
} from "./icons.js";
import { pages } from "../assets/js/pages.js";
const header = d.createElement("header").setAttribute({
  class: "header",
});

const item = {
  Documents: ["documentList", docIcon],
  "Send Mail": ["sendMail", sendIcon],
  Inbox: ["inbox", inboxIcon],
  Logout: ["logout", logoutIcon],
};

const nav = d.createElement("nav");

for (let x in item) {
  nav.append(
    d.createElement(
      "div",
      [d.createElement("div", item[x][1]), d.createElement("div", x)],
      {
        onclick: "window.location='#/" + item[x][0] + "'",
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
    document: "documentList",
    inbox: "inbox",
    mail: "sendMail",
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
  // userName.setChildren([
  //   window.localStorage["com.valleyobform.login.user"].substr(1),
  // ]);
};
export { header };
