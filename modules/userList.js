import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
const userList = d.createElement("div");

userList.append(header);

userList.onload = () => {
  header.onload();
};
export { userList };