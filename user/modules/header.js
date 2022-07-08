import d from "../../assets/js/NTechDOM.js";
import { pages } from "../assets/js/pages.js";
const header = d.createElement("header").setAttribute({
  class: "header",
});

const item = {
  Documents: "documentList",
  Inbox: "inbox",
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
const userName = d.createElement("div", "", {
  class: "name",
});
header.append(nav, userName);

header.onload = () => {
  const navList = {
    document: "documentList",
    inbox: "inbox",
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
      active.style.color = "#004a7f";
    }
  }
  userName.setChildren([
    window.localStorage["com.valleyobform.login.user"].substr(1),
  ]);
};
export { header };
