import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
const documentAdd = d.createElement("div");

const main = d
  .createElement("main")
  .setAttribute({ class: ["main"] });
const h1 = d.createElement("h1", "Add New PDF Document");

const form = d
  .createElement("form")
  .setAttribute({ class: "form", name: "form" });

const documentDiv = d
  .createElement(
    "div",
    d.createElement("label", [
      "Docuement Name",
      d.createElement("span", " *"),
    ])
  )
  .setAttribute({ class: ["form-item"] });

const documentName = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  spellcheck: "false",
  type: "text",
  oninput: "nin(this, 'documentName')",
  //minlength: "5",
});

documentDiv.append(
  d.createElement("div", documentName, {
    class: "input-field",
  }),
  d.createElement("div", "Error Found").setAttribute({
    class: "error-div",
  })
);

const documentFileDiv = d
  .createElement(
    "div",
    d.createElement("label", [
      "Docuement",
      d.createElement("span", " *"),
    ])
  )
  .setAttribute({ class: ["form-item"] });

const documentFile = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  spellcheck: "false",
  type: "file",
  onchange: "fch(this, 'documentFile')",
  style: "margin-bottom:0",
});

documentFileDiv.append(
  d.createElement("div", documentFile, {
    class: "input-field",
  }),
  d
    .createElement("div", "Only PDF, Word files may be uploaded.")
    .setAttribute({
      class: "error-div",
      id: "file-error",
    })
);

const button = d.createElement("button", "Add", {
  class: "button",
  type: "submit",
});

const button2 = d.createElement("button", "Delete", {
  class: ["button", "delBtn"],
  type: "button",
});

const iframe = d.createElement("iframe").setAttribute({
  class: "iframe",
});

const error = d.createElement("div", "", { class: "error" });
const errDiv = d.createElement("div", "Error! Please try again.", {
  style: "width: 100%; text-align: left;",
});
const closeBtn = `
<svg onclick="closeDiv('.error')" aria-hidden="true" style="fill: rgb(207, 34, 46); cursor: pointer" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
`;
error.append(errDiv, closeBtn);

const success = d.createElement("div", "", {
  class: "success",
});
const succDiv = d.createElement(
  "div",
  "Successfully added new user!",
  {
    style: "width: 100%; text-align: left;",
  }
);
const closeBtn2 = `
<svg onclick="closeDiv('.success')" aria-hidden="true" style="fill: rgb(34, 207, 92); cursor: pointer" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
`;
success.append(succDiv, closeBtn2);

form.append(documentDiv, documentFileDiv, error, success, button);

main.append(h1, form);

documentAdd.append(header, main);

documentAdd.onload = () => {
  header.onload();
  form.reset();
  if (header.documentEdit) {
    h1.setChildren("Edit Document Name");
    let { data } = header.documentEdit;
    const src =
      "https://valleyobform.github.io/documents/" + data[2].substr(1);
    documentName.changeAttribute("value", data[1].substr(1));
    button.setChildren("Edit");
    form.setChildren([
      documentDiv,
      error,
      success,
      button,
      button2,
      iframe.changeAttribute("src", src),
    ]);
    document.forms["form"].onsubmit = (e) => {
      e.preventDefault();
      editRequest(
        data[0].substr(1),
        data[2].substr(1),
        data[3].substr(1)
      );
    };
    document.querySelector(".delBtn").onclick = () => {
      deleteRequest(data[3].substr(1));
    };
    return;
  }

  document.forms["form"].onsubmit = (e) => {
    e.preventDefault();
    addRequest();
  };

  window.nin = (v, i) => {
    eval(i).changeAttributeN("value", v.value);
  };

  window.fch = (v, input) => {
    let file = v.files[0];
    let Err = document.getElementById("file-error");
    Err.style.opacity = "0";
    Err.style.marginTop = "-20px";
    Err.style.marginLeft = "150px";
    if (file.type == "application/pdf") {
      eval(input).changeAttributeN("file", v.files[0]);
    } else {
      Err.style.opacity = "1";
      Err.style.marginTop = "0";
      Err.style.marginLeft = "0";
      eval(input).changeAttributeN("file", v.files[0]);
      eval(input).changeAttribute("t", "");
      Err.innerText = "Only PDF files may be uploaded.";
    }

    if (file.size > 5242880) {
      eval(input).changeAttribute("t", "");
      Err.style.opacity = "1";
      Err.style.marginTop = "0";
      Err.style.marginLeft = "0";
      Err.innerText = "Error! PDF file size < 5MB";
    }
  };
};

const addRequest = () => {
  button
    .setChildren(
      `
      <svg viewBox="0 0 18 18" focusable="false" ><g><path d="M15.5 9.8V8.17l-1.83-.32a5.21 5.21 0 00-.56-1.33L14.16 5 13 3.83l-1.52 1.08a8.28 8.28 0 00-1.32-.54L9.82 2.5H8.19l-.34 1.87a4.87 4.87 0 00-1.3.53L5 3.84 3.87 4.92l1 1.64a4.53 4.53 0 00-.54 1.31L2.5 8.2v1.64l1.86.34a5 5 0 00.55 1.3L3.87 13 5 14.19l1.54-1.06a4.89 4.89 0 001.31.56l.33 1.81h1.63l.33-1.86a5.38 5.38 0 001.34-.54L13 14.15 14.16 13l-1.06-1.53a5.46 5.46 0 00.57-1.34zM9 11a2 2 0 112-2 2 2 0 01-2 2z"></path></g></svg>
    `
    )
    .changeAttribute("disabled", "")
    .changeAttribute("style", [
      "background: rgb(0, 93, 180, 0.5); color: #fcfcfcb0;",
    ]);
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  d.readFiles(documentFile.getAttribute("file")[0])
    .then(async (files) => {
      const auth =
        "Z2hwX2JhN1dyUmREeWQ4M2lGSWFqRFBCcFJpNll5dEtyWTBrbTdFOQ==";
      const octokit = new Octokit({
        auth: window.atob(auth),
      });
      let fileName = documentName.getAttribute("value")[0];
      if (fileName.substr(fileName.length - 4) == ".pdf")
        fileName = fileName.substr(0, fileName.length - 4);

      let fileId = fileName + new Date().getTime() + ".pdf";
      let spitBase = files[0].split(",");
      let type = spitBase[0].split(";")[0].replace("data:", "");
      let file = spitBase[1];
      let test = await octokit.request(
        "PUT /repos/ValleyOBForm/documents/contents/" + fileId,
        {
          owner: "OWNER",
          repo: "REPO",
          path: "PATH",
          message: "my commit message",
          committer: {
            name: "ValleyOBForm",
            email: "valleyobform@gmail.com",
          },
          content: file,
        }
      );
      d.post(
        "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
        {
          type: 7,
          data: JSON.stringify({
            date: "",
            fileName: fileName,
            fileId: fileId,
            //content: files[0],
            database: window.localStorage["com.valleyobform.login"],
          }),
        }
      )
        .then((res) => {
          res = JSON.parse(JSON.parse(res).messege);
          const { result } = res;
          if (result) {
            form.reset();
            main.setChildren([h1, form]);
            success.changeAttribute("style", "display: flex");
            button
              .setChildren("Add")
              .removeAttribute("disabled", "style");
          } else {
            errDiv.setChildren("Error! Try agian");
            error.changeAttribute("style", "display: flex");
            button
              .setChildren("Add")
              .removeAttribute("disabled", "style");
            console.log("Error! Please try again.", data);
          }
        })
        .catch((err) => {
          errDiv.setChildren("Error! Try agian");
          error.changeAttribute("style", "display: flex");
          button
            .setChildren("Add")
            .removeAttribute("disabled", "style");
          console.log("Error! Please try again.", err);
        });
    })
    .catch((err) => {
      errDiv.setChildren("Error! Try agian");
      error.changeAttribute("style", "display: flex");
      button.setChildren("Add").removeAttribute("disabled", "style");
      console.log("Error! Please try again.", err);
    });
};

const editRequest = (date, fileId, id) => {
  button
    .setChildren(
      `
      <svg viewBox="0 0 18 18" focusable="false" ><g><path d="M15.5 9.8V8.17l-1.83-.32a5.21 5.21 0 00-.56-1.33L14.16 5 13 3.83l-1.52 1.08a8.28 8.28 0 00-1.32-.54L9.82 2.5H8.19l-.34 1.87a4.87 4.87 0 00-1.3.53L5 3.84 3.87 4.92l1 1.64a4.53 4.53 0 00-.54 1.31L2.5 8.2v1.64l1.86.34a5 5 0 00.55 1.3L3.87 13 5 14.19l1.54-1.06a4.89 4.89 0 001.31.56l.33 1.81h1.63l.33-1.86a5.38 5.38 0 001.34-.54L13 14.15 14.16 13l-1.06-1.53a5.46 5.46 0 00.57-1.34zM9 11a2 2 0 112-2 2 2 0 01-2 2z"></path></g></svg>
    `
    )
    .changeAttribute("disabled", "")
    .changeAttribute("style", [
      "background: rgb(0, 93, 180, 0.5); color: #fcfcfcb0;",
    ]);
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  let fileName = documentName.getAttribute("value")[0];
  if (fileName.substr(fileName.length - 4) == ".pdf")
    fileName = fileName.substr(0, fileName.length - 4);
  d.post(
    "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
    {
      type: 8,
      data: JSON.stringify({
        date: date,
        fileName: fileName,
        fileId: fileId,
        id: id,
        database: window.localStorage["com.valleyobform.login"],
      }),
    }
  )
    .then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, messege } = res;
      if (result) {
        succDiv.setChildren("Successfully changed user data.");
        success.changeAttribute("style", "display: flex");
        button
          .setChildren("Edit")
          .removeAttribute("disabled", "style");
      } else {
        errDiv.setChildren("Error! Try agian");
        error.changeAttribute("style", "display: flex");
        button
          .setChildren("Edit")
          .removeAttribute("disabled", "style");
        console.log("Error! Please try again.");
      }
    })
    .catch((err) => {
      errDiv.setChildren("Error! Try agian");
      error.changeAttribute("style", "display: flex");
      button.setChildren("Edit").removeAttribute("disabled", "style");
      console.log("Error! Please try again.", err);
    });
};

const deleteRequest = (id) => {
  button.changeAttribute("disabled", "");
  button2
    .setChildren(
      `
      <svg viewBox="0 0 18 18" focusable="false" ><g><path d="M15.5 9.8V8.17l-1.83-.32a5.21 5.21 0 00-.56-1.33L14.16 5 13 3.83l-1.52 1.08a8.28 8.28 0 00-1.32-.54L9.82 2.5H8.19l-.34 1.87a4.87 4.87 0 00-1.3.53L5 3.84 3.87 4.92l1 1.64a4.53 4.53 0 00-.54 1.31L2.5 8.2v1.64l1.86.34a5 5 0 00.55 1.3L3.87 13 5 14.19l1.54-1.06a4.89 4.89 0 001.31.56l.33 1.81h1.63l.33-1.86a5.38 5.38 0 001.34-.54L13 14.15 14.16 13l-1.06-1.53a5.46 5.46 0 00.57-1.34zM9 11a2 2 0 112-2 2 2 0 01-2 2z"></path></g></svg>
    `
    )
    .changeAttribute("disabled", "")
    .changeAttribute("style", [
      "background: rgb(138, 18, 18, 0.5); color: #fcfcfcb0;",
    ]);
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  d.post(
    "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
    {
      type: 9,
      data: JSON.stringify({
        id: id,
        database: window.localStorage["com.valleyobform.login"],
      }),
    }
  )
    .then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result } = res;
      if (result) {
        button2
          .setChildren("Delete")
          .removeAttribute("disabled", "style");
        form.setChildren(success);
        succDiv.setChildren("Successfully delete user.");
        success.changeAttribute("style", "display: flex");
      } else {
        errDiv.setChildren("Error! Try agian");
        error.changeAttribute("style", "display: flex");
        button.removeAttribute("disabled", "style");
        button2
          .setChildren("Delete")
          .removeAttribute("disabled", "style");
        console.log("Error! Please try again.");
      }
    })
    .catch((err) => {
      errDiv.setChildren("Error! Try agian");
      error.changeAttribute("style", "display: flex");
      button.removeAttribute("disabled", "style");
      button2
        .setChildren("Delete")
        .removeAttribute("disabled", "style");
      console.log("Error! Please try again.", data);
    });
};
export { documentAdd };
