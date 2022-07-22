import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { loading } from "./loading.js";
const documentList = d.createElement("div");

const main = d
  .createElement("main")
  .setAttribute({ class: ["main"] });
const h1 = d.createElement("h1", "PDF Documents");

const table = d
  .createElement("table")
  .setAttribute({ class: "table" });
const thead = d.createElement("thead");

const titles = ["Sr No.", "Issue Date", "Document Name", "Update"];

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
    for (let j = 1; j < data[i].length - 1; j++) {
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

const button = d.createElement("button", "Add New PDF", {
  onclick: "window.location='#/documentAdd'",
});

main.append(
  h1,
  table,
  d.createElement("div", button, {
    class: "button-div",
  })
);

documentList.append(header, loading);

documentList.onload = () => {
  delete header.documentEdit;
  tbody.setChildren([""]);
  documentList._rendered = false;
  documentList.setChildren([header, loading]);
  document.getElementById("root").innerHTML = documentList._render();
  header.onload();
  d.post(
    "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
    {
      type: 6,
      data: JSON.stringify({
        database: window.localStorage["com.valleyobform.login"],
      }),
    }
  )
    .then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data } = res;
      if (result) {
        documentList._rendered = false;
        documentList.setChildren([header, main]);
        document.getElementById("root").innerHTML =
          documentList._render();
        header.onload();
        dataPrint(data);
        for (let i = 0; i < data.length; i++) {
          document.querySelector(`img[edit="${i}"]`).onclick = () => {
            header.documentEdit = {
              data: data[i],
              index: i,
            };
            window.location = "#/documentAdd";
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
export { documentList };
