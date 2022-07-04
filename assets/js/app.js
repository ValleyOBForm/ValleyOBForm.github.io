import d from "./NTechDOM.js";
import { login } from "../../modules/login.js";
console.log("version " + d.version);
console.log("Developer : " + d.meta.developer.name);
console.log("Developer Profile : " + d.meta.developer.profile);

d.render("root", login);
