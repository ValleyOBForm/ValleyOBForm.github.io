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
  const navList = {
    user: "userList",
    document: "documentList",
    inbox: "inbox",
    changePass: "changePass",
  };

  let ele;
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
  //document.body.style.backgroundColor = "#cccccc";
};
export { header };
