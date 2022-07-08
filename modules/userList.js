import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { loading } from "./loading.js";
const userList = d.createElement("div");

const main = d
  .createElement("main")
  .setAttribute({ class: ["main"] });
const h1 = d.createElement("h1", "Users List");

const table = d
  .createElement("table")
  .setAttribute({ class: "table" });
const thead = d.createElement("thead");

const titles = [
  "Sr No.",
  "Issue Date",
  "Name",
  "Email",
  "Password",
  "Update",
];

const theadTr = d.createElement("tr");
for (let x of titles) {
  theadTr.append(d.createElement("th", x));
}

thead.append(theadTr);

const tbody = d.createElement("tbody");

const dataPrint = (data) => {
  let tr = d.createElement("tr");
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      tr.append(d.createElement("td", data[i][j]));
    }
    tbody.append(tr);
  }
};

// for (let i = 0; i < 10; i++) {
//   dataPrint([
//     [
//       i + 1,
//       "05-072022T12:00:00:00",
//       "Test",
//       "email@gmail.com",
//       "username",
//       "Update",
//     ],
//   ]);
// }

table.append(thead, tbody);

const button = d.createElement("button", "Add New User", {
  onclick: "window.location='#/userAdd'",
});

main.append(
  h1,
  table,
  d.createElement("div", button, {
    class: "button-div",
  })
);

userList.append(header, loading);

userList.onload = () => {
  header.onload();
  userList._rendered = false;
  userList.setChildren([header, main]);
  document.getElementById("root").innerHTML = userList._render();
};
export { userList };
