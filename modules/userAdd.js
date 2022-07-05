import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
const userAdd = d.createElement("div");

const main = d
  .createElement("main")
  .setAttribute({ class: ["main"] });
const h1 = d.createElement("h1", "Add New User");

main.append(h1);

userAdd.append(header, main);

userAdd.onload = () => {
  header.onload();
};
export { userAdd };
