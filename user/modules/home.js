import d from "../../assets/js/NTechDOM.js";
import { header } from "./header.js";
const home = d.createElement("div");

const main = d
  .createElement("main")
  .setAttribute({ class: ["main", "home"] });

const list = {
  "Documents List": ["documentList", "Send Email"],
  Inbox: ["inbox", ""],
};

for (let x in list) {
  main.append(
    d.createElement(
      "div",
      [
        d.createElement("span", x, { class: "div" }),
        d.createElement("span", " | "),
        d.createElement("span", list[x][1]),
      ],
      {
        onclick: "window.location='#/" + list[x][0] + "'",
        style: "padding: 8px 16px; cursor: pointer",
      }
    )
  );
}

home.append(header, main);

home.onload = () => {
  header.onload();
  //   main.setChildren([""]);
  //   home._rendered = false;
  //   home.setChildren([header]);
  //   document.getElementById("root").innerHTML = home._render();
};
export { home };
