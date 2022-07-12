import d from "../../assets/js/NTechDOM.js";
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
import { doc } from "./pdfViewer.js";
import { logo } from "./icons.js";
const header = d.createElement("header").setAttribute({
  class: "header",
  style: "height: 100px; width: max-content",
});

header.append(
  d.createElement("div", logo, {
    class: "logo2",
  })
);
const home = d.createElement("div");

const main = d.createElement("main").setAttribute({
  class: ["home"],
});

const form = d.createElement("form").setAttribute({
  class: "form",
  name: "form",
});

const title = d.createElement(
  "div",
  "Please enter your date of birth to read the massege.",
  {
    class: "title",
  }
);

const month = d.createElement("select").setAttribute({
  required: "",
});
const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

month.append(
  d.createElement("option", "Month", {
    value: "",
  })
);

for (let x = 0; x < monthList.length; x++) {
  month.append(
    d.createElement("option", monthList[x], {
      value: x + 1,
    })
  );
}

const day = d.createElement("select").setAttribute({
  required: "",
});

day.append(
  d.createElement("option", "Day", {
    value: "",
  })
);

for (let x = 1; x <= 31; x++) {
  day.append(
    d.createElement("option", x, {
      value: x,
    })
  );
}

const year = d.createElement("select").setAttribute({
  required: "",
});

year.append(
  d.createElement("option", "Year", {
    value: "",
  })
);

for (let x = 1945; x <= 2030; x++) {
  year.append(
    d.createElement("option", x, {
      value: x,
    })
  );
}

const date = d.createElement("div", [month, day, year], {
  class: "input-field",
});

const err = d.createElement("div", "error").setAttribute({
  id: "error-field",
});

const submit = d.createElement("button", "Submit", {
  class: "button",
});

form.append(title, date, err, submit);

main.append(form);

home.append(
  header,
  main,
  d.createElement("div", "www.ValleyOBcare.com", {
    style: "text-align: center; margin-top: 150px",
  })
);

home.onload = async () => {
  document.forms["form"].onsubmit = (e) => {
    e.preventDefault();
    submitRequest();
  };
};

function GetURLParameter(parameter) {
  let data = [];
  let url = window.location.toString();

  if (url.indexOf("?") >= 0) {
    url = url.substr(url.indexOf("?"));
    let searchParams = new URLSearchParams(url);
    if (searchParams.has(parameter)) {
      data = searchParams.getAll(parameter);
    }
  }
  if (!data.length) data = "";
  else data = data[0];
  return data;
}

const submitRequest = () => {
  submit
    .setChildren(
      `
      <svg viewBox="0 0 18 18" focusable="false" ><g><path d="M15.5 9.8V8.17l-1.83-.32a5.21 5.21 0 00-.56-1.33L14.16 5 13 3.83l-1.52 1.08a8.28 8.28 0 00-1.32-.54L9.82 2.5H8.19l-.34 1.87a4.87 4.87 0 00-1.3.53L5 3.84 3.87 4.92l1 1.64a4.53 4.53 0 00-.54 1.31L2.5 8.2v1.64l1.86.34a5 5 0 00.55 1.3L3.87 13 5 14.19l1.54-1.06a4.89 4.89 0 001.31.56l.33 1.81h1.63l.33-1.86a5.38 5.38 0 001.34-.54L13 14.15 14.16 13l-1.06-1.53a5.46 5.46 0 00.57-1.34zM9 11a2 2 0 112-2 2 2 0 01-2 2z"></path></g></svg>
    `
    )
    .changeAttribute("disabled", "")
    .changeAttribute("style", [
      "background: rgb(0, 93, 180, 0.5); color: #fcfcfcb0;",
    ]);
  document.querySelector("#error-field").style.display = "none";
  const select = document.querySelectorAll("select");
  let fullDate = [];
  for (let x of select) {
    let value = x.value;
    if (value.length < 2) {
      value = value.padStart(2, "0");
    }
    fullDate.push(value);
  }
  d.post(
    "https://script.google.com/macros/s/AKfycby_Ej5m-zMH0j92eXMhsoqpv83xcAjm3zvWVYkkzor5XX8uBpzxL6VVB-e_FJZAvBLq/exec",
    {
      type: 0,
      data: JSON.stringify({
        date: fullDate.join("-"),
        id: GetURLParameter("i"),
      }),
    }
  )
    .then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, messege } = res;
      if (result) {
        if (messege == "id") {
          submit
            .setChildren("Submit")
            .removeAttribute("disabled", "style");
          document.querySelector("#error-field").style.display =
            "block";
          document.querySelector("#error-field").innerHTML =
            "Invalid Link";
        } else if (messege == "link") {
          submit
            .setChildren("Submit")
            .removeAttribute("disabled", "style");
          document.querySelector("#error-field").style.display =
            "block";
          document.querySelector("#error-field").innerHTML =
            "This link has been expired";
        } else if (messege == "date") {
          submit
            .setChildren("Submit")
            .removeAttribute("disabled", "style");
          document.querySelector("#error-field").style.display =
            "block";
          document.querySelector("#error-field").innerHTML =
            "Date of birth isn't correct.";
        } else {
          console.log(messege);
        }
      }
    })
    .catch((err) => {
      submit
        .setChildren("Submit")
        .removeAttribute("disabled", "style");
      document.querySelector("#error-field").style.display = "block";
      document.querySelector("#error-field").innerHTML =
        "Error found! Please try again.";
    });
};

export { home };
