import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
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
  "Name",
  "Phone",
  "Email",
  "Username",
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

for (let i = 0; i < 10; i++) {
  dataPrint([titles]);
}

table.append(thead, tbody);

main.append(h1, table);

userList.append(header, main);

userList.onload = () => {
  header.onload();
};
export { userList };
