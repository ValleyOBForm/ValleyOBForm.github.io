import d from "./NTechDOM.js";
import { login } from "../../modules/login.js";
import { pages } from "./pages.js";
import { userList } from "../../modules/userList.js";
import { userAdd } from "../../modules/userAdd.js";
import { changePass } from "../../modules/changePass.js";
import { documentList } from "../../modules/documentList.js";
import { documentAdd } from "../../modules/documentAdd.js";
import { inbox } from "../../modules/inbox.js";

console.log("version " + d.version);
console.log("Developer : " + d.meta.developer.name);
console.log("Developer Profile : " + d.meta.developer.profile);

if (window.localStorage["com.valleyobform.login"]) {
  pages.root = "userList";
  pages.page = { ...pages.list };
  if (pages.page[window.location.hash.toString().replace("#/", "")]) {
    d.render(
      "root",
      eval(
        pages.page[window.location.hash.toString().replace("#/", "")]
      ).init()
    );
  } else {
    d.render("root", eval(pages.page[pages.root]));
  }
} else d.render("root", login);

window.hashchange = () => {
  if (window.location.hash.toString().replace("#/", "") == "logout") {
    delete window.localStorage["com.valleyobform.login"];
    pages.page = {};
    pages.root = "login";
    d.render("root", login);
  } else if (
    pages.page[window.location.hash.toString().replace("#/", "")]
  ) {
    d.render(
      "root",
      eval(
        pages.page[window.location.hash.toString().replace("#/", "")]
      ).init()
    );
  } else {
    d.render("root", eval(pages.root));
  }
};
window.addEventListener("hashchange", hashchange, false);

window.closeDiv = (q) => {
  document.querySelector(q).style.display = "none";
};
