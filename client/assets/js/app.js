import d from "../../../assets/js/NTechDOM.js";
import { home } from "../../modules/home.js";
console.log("version " + d.version);
console.log("Developer : " + d.meta.developer.name);
console.log("Developer Profile : " + d.meta.developer.profile);

d.render("root", home);

window.closeDiv = (q) => {
  document.querySelector(q).style.display = "none";
};
