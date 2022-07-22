import d from "../../assets/js/NTechDOM.js";
import { doc } from "../user/modules/pdfViewer.js";
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

const titles = [
  "Sr No.",
  "Document Name",
  "Date of Birth",
  "Download",
  "Delete",
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
    tr.append(d.createElement("td", data[i][0].substr(1)));
    tr.append(
      d.createElement("td", dateCovert(data[i][1].substr(1)))
    );
    tr.append(
      d.createElement(
        "td",
        d.createElement("img").setAttribute(
          {
            src: "./download.svg",
            download: i,
          },
          { style: "padding: 0;" }
        )
      )
    );
    tr.append(
      d.createElement(
        "td",
        d.createElement("img").setAttribute(
          {
            src: "./delete.svg",
            delete: i,
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
    "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
    {
      type: 10,
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
          document.querySelector(`img[download="${i}"]`).onclick =
            () => {
              const a = document.createElement("a");
              a.style.display = "none";
              a.target = "_blank";
              a.href =
                "https://drive.google.com/uc?export=download&id=" +
                data[i][2].substr(1);
              a.download = data[i][0].substr(1) + ".pdf";
              document.body.appendChild(a);
              a.click();
              a.remove();
            };
          document.querySelector(`img[delete="${i}"]`).onclick =
            () => {
              removeRequest(i);
            };
        }
        document.querySelector(".searchInput").onsearch = (e) => {
          let searchValue = e.target.value;
          if (searchValue == "") inbox.onload();
          else {
            searchRequest(searchValue);
          }
        };
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

const removeRequest = (index) => {
  let id = document
    .querySelectorAll(".table tbody tr")
    [index].querySelectorAll("td")[4];
  id.innerHTML = `<img class="spinerImg" src="./spiner.svg">`;

  d.post(
    "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
    {
      type: 11,
      data: JSON.stringify({
        database: window.localStorage["com.valleyobform.login"],
        index: index,
      }),
    }
  )
    .then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result } = res;
      if (result) {
        inbox.onload();
      } else alert("Error! Try again.");
    })
    .catch((err) => {
      alert("Error! Try again.");
      console.log(err);
    });
};

const searchRequest = (value) => {
  header.onload();
  tbody.setChildren([""]);
  inbox._rendered = false;
  inbox.setChildren([header, loading]);
  document.getElementById("root").innerHTML = inbox._render();

  let type = "string";
  if (
    value.match(
      /^(((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))[-/]?[0-9]{4}|02[-/]?29[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/gm
    )
  ) {
    type = "date";
  }

  d.post(
    "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
    {
      type: 12,
      data: JSON.stringify({
        database: window.localStorage["com.valleyobform.login"],
        type: type,
        value: value,
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
          document.querySelector(`img[download="${i}"]`).onclick =
            () => {
              const a = document.createElement("a");
              a.style.display = "none";
              a.target = "_blank";
              a.href =
                "https://drive.google.com/uc?export=download&id=" +
                data[i][2].substr(1);
              a.download = data[i][0].substr(1) + ".pdf";
              document.body.appendChild(a);
              a.click();
              a.remove();
            };
          document.querySelector(`img[delete="${i}"]`).onclick =
            () => {
              removeRequest(i);
            };
        }
        document.querySelector(".searchInput").onsearch = (e) => {
          let searchValue = e.target.value;
          if (searchValue == "") inbox.onload();
          else {
            searchRequest(searchValue);
          }
        };
        document.querySelector(".searchInput").value = value;
        document.querySelector(
          "#nav" + window.location.hash.toString().replace("#/", "")
        ).onclick = () => {
          eval(
            window.location.hash.toString().replace("#/", "")
          ).onload();
        };
      } else alert("Error! Try again.");
    })
    .catch((err) => {
      alert("Error! Try again.");
      console.log(err);
    });
};

export { inbox };
