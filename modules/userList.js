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

const dateCovert = (date) => {
  date = new Date(date);
  return (
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0") +
    "-" +
    date.getFullYear()
  );
};

const dataPrint = (data) => {
  for (let i = 0; i < data.length; i++) {
    let tr = d.createElement("tr");
    tr.append(d.createElement("td", i + 1));
    tr.append(
      d.createElement("td", dateCovert(data[i][0].substr(1)))
    );
    for (let j = 1; j < data[i].length; j++) {
      tr.append(d.createElement("td", data[i][j].substr(1)));
    }
    tr.append(
      d.createElement(
        "td",
        d.createElement("img").setAttribute(
          {
            src: "./edit.svg",
            edit: i,
          },
          { style: "padding: 0;" }
        )
      )
    );
    tbody.append(tr);
  }
};

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
  delete header.userEdit;
  tbody.setChildren([""]);
  userList._rendered = false;
  userList.setChildren([header, loading]);
  document.getElementById("root").innerHTML = userList._render();
  header.onload();
  d.post(
    "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
    {
      type: 1,
      data: JSON.stringify({
        database: window.localStorage["com.valleyobform.login"],
      }),
    }
  )
    .then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data } = res;
      if (result) {
        userList._rendered = false;
        userList.setChildren([header, main]);
        document.getElementById("root").innerHTML =
          userList._render();
        header.onload();
        dataPrint(data);
        for (let i = 0; i < data.length; i++) {
          document.querySelector(`img[edit="${i}"]`).onclick = () => {
            header.userEdit = {
              data: data[i],
              index: i,
            };
            window.location = "#/userAdd";
          };
        }
        if (
          document.querySelector(
            "#nav" + window.location.hash.toString().replace("#/", "")
          )
        ) {
          document.querySelector(
            "#nav" + window.location.hash.toString().replace("#/", "")
          ).onclick = () => {
            eval(
              window.location.hash.toString().replace("#/", "")
            ).onload();
          };
        }
      } else alert("Error! Try again.");
    })
    .catch((err) => {
      alert("Error! Try again.");
      console.log(err);
    });
};
export { userList };
