import d from "../../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { loading } from "./loading.js";
const inbox = d.createElement("div");

const main = d
  .createElement("main")
  .setAttribute({ class: ["main"] });
const searchInput = d.createElement("input").setAttribute({
  type: "search",
  class: "searchInput",
  placeholder: "search by name or date(mm-dd-yyyy)",
  autocomplete: "off",
  spellcheck: "false",
});
const h1 = d.createElement("h1", [
  "Inbox",
  d.createElement("div", searchInput, { class: "searchInputDiv" }),
]);

const table = d
  .createElement("table")
  .setAttribute({ class: "table" });
const thead = d.createElement("thead");

const titles = ["Sr No.", "Issue Date", "Document Name", "View"];

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
    for (let j = 1; j < data[i].length - 2; j++) {
      tr.append(d.createElement("td", data[i][j].substr(1)));
    }
    tr.append(
      d.createElement(
        "td",
        d.createElement("img").setAttribute(
          {
            src: "./view.svg",
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

main.append(h1, table);

inbox.append(header, loading);

inbox.onload = () => {
  delete header.documentEdit;
  header.onload();
  tbody.setChildren([""]);
  inbox._rendered = false;
  inbox.setChildren([header, loading]);
  document.getElementById("root").innerHTML = inbox._render();
  d.post(
    "https://script.google.com/macros/s/AKfycby9aYhOTJFe6qKsEpJ5CSfpntcrk4OWhCoZqiEVSA/exec",
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
        inbox._rendered = false;
        inbox.setChildren([header, main]);
        document.getElementById("root").innerHTML = inbox._render();
        header.onload();
        dataPrint(data);
        for (let i = 0; i < data.length; i++) {
          document.querySelector(`img[edit="${i}"]`).onclick = () => {
            header.sendEmail = {
              data: data[i],
            };
            window.location = "#/sendEmail";
          };
        }
      } else alert("Error! Try again.");
    })
    .catch((err) => {
      alert("Error! Try again.");
      console.log(err);
    });
};
export { inbox };
