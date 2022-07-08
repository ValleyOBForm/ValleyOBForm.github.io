import d from "../../../assets/js/NTechDOM.js";
import { login } from "../../modules/login.js";
import { pages } from "./pages.js";
import { documentList } from "../../modules/documentList.js";
console.log("version " + d.version);
console.log("Developer : " + d.meta.developer.name);
console.log("Developer Profile : " + d.meta.developer.profile);

if (window.localStorage["com.valleyobform.login.user"]) {
  pages.root = "documentList";
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
};
window.addEventListener("hashchange", hashchange, false);

window.closeDiv = (q) => {
  document.querySelector(q).style.display = "none";
};
