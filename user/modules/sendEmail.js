import d from "../../assets/js/NTechDOM.js";
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
import { header } from "./header.js";
import { doc } from "./pdfViewer.js";
const sendEmail = d.createElement("div");

const main = d.createElement("main").setAttribute({
  class: ["main"],
  style: "margin-bottom: 0; padding-bottom: 0; margin-top: 0;",
});

const form = d.createElement("div").setAttribute({
  class: "iframe",
  style: "margin-top :0; padding-top: 0;",
});

async function convertDataURIToBinary(fileId) {
  let dataURI = await d.getBlobData64(
    "https://raw.githubusercontent.com/valleyobformdocument/documents/main/" +
      fileId
  );
  var raw = window.atob(dataURI.split(",")[1]);
  var rawLength = raw.length;

  var array = new Uint8Array(new ArrayBuffer(rawLength));
  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i) & 0xff;
  }
  return array;
}

const emailDiv = d
  .createElement("div", d.createElement("label", "Email"))
  .setAttribute({ class: ["form-item"] });

const email = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  spellcheck: "false",
  type: "email",
  //   oninput: "noAccess(this)",
  onkeypress: "event.preventDefault();",
  placeholder: "cut & paste only",
});

emailDiv.append(
  d.createElement("div", email, {
    class: "input-field",
  })
);

const dateDiv = d
  .createElement("div", d.createElement("label", ["Date of birth"]))
  .setAttribute({ class: ["form-item"] });

const date = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  spellcheck: "false",
  type: "text",
  onkeypress: "event.preventDefault();",
  placeholder: "cut & paste only",
});

dateDiv.append(
  d.createElement("div", date, {
    class: "input-field",
  })
);

const button = d.createElement("button", "Send", {
  class: "button",
  type: "submit",
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
const succDiv = d.createElement("div", "Successfully sent email!", {
  style: "width: 100%; text-align: left;",
});
const closeBtn2 = `
<svg onclick="closeDiv('.success')" aria-hidden="true" style="fill: rgb(34, 207, 92); cursor: pointer" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
`;
success.append(succDiv, closeBtn2);
const line = d.createElement("form", [emailDiv, dateDiv, button], {
  class: ["line", "form"],
  name: "form",
});
// form.append();

// main.append(h1, form);

// sendEmail.append(header, main);
form.append(error, success, doc.replace(/\n/g, ""));
main.append(form);
sendEmail.append(header, line, main);

const newRender = () => {
  if (PDFViewerApplication.documentInfo !== null) {
    PDFViewerApplication.rendered();
    return;
  }
  setTimeout(() => {
    newRender();
  }, 1000);
};

sendEmail.onload = async () => {
  header.onload();
  form.reset();
  PDFViewerApplication.rendered = () => {
    document.getElementById("loading").style.display = "none";
    let nameList = document.querySelectorAll("input[name='Name']");
    for (let x of nameList) {
      x.setAttribute("onkeypress", "event.preventDefault()");
      x.setAttribute("autocomplete", "off");
    }
  };
  if (header.sendEmail) {
    let { data } = header.sendEmail;
    let d_ = await convertDataURIToBinary(data[2].substr(1));
    delete window.localStorage["pdfjs.history"];
    webViewerLoad();
    await PDFViewerApplication.open(d_);
    newRender();
  } else {
    window.location = "./";
    return;
  }
  document.forms["form"].onsubmit = (e) => {
    e.preventDefault();
    submitRequest();
  };
};

const uint8ArrayToBase64 = async (data) => {
  const base64url = await new Promise((r) => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result);
    reader.readAsDataURL(new Blob([data]));
  });
  return base64url.split(",", 2)[1];
};

const submitRequest = async () => {
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
  const data = await PDFViewerApplication.pdfDocument.saveDocument();
  let result = await uint8ArrayToBase64(data);
  const auth =
    "Z2hwXzRvQ2FCVmhRMU5wWjRIR3E4MmxqOVJXU2JyaTRtNDM3ekhQTA==";
  const octokit = new Octokit({
    auth: window.atob(auth),
  });

  let fileId = new Date().getTime() + ".pdf";
  let test = await octokit.request(
    "PUT /repos/valleyobformdocument/documents/contents/" + fileId,
    {
      owner: "OWNER",
      repo: "REPO",
      path: "PATH",
      message: "my commit message",
      committer: {
        name: "ValleyOBForm",
        email: "valleyobform@gmail.com",
      },
      content: result,
    }
  );
  d.post(
    "https://script.google.com/macros/s/AKfycbzLEX8OFSld2y-zSNGCw5oyqVWbqfoKO1kKrJ5n0cHJElKaNIQY0QnAQnLeGrR2eHzD/exec",
    {
      type: 2,
      data: JSON.stringify({
        time: "",
        email: document.querySelector(`input[node='${email._node}'`)
          .value,
        date: document.querySelector(`input[node='${date._node}'`)
          .value,
        name: document.querySelector("input[name='Name']").value,
        fileId: fileId,
        id: "",
      }),
    }
  )
    .then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result } = res;
      if (result) {
        sendEmail._rendered = false;
        sendEmail.setChildren([header, form.setChildren(success)]);
        document.getElementById("root").innerHTML =
          sendEmail._render();
        header.onload();
        success.changeAttribute("style", "display: flex");
      } else {
        errDiv.setChildren("Error! Try agian");
        error.changeAttribute("style", "display: flex");
        button
          .setChildren("Send")
          .removeAttribute("disabled", "style");
        console.log("Error! Please try again.", data);
      }
    })
    .catch((err) => {
      errDiv.setChildren("Error! Try agian");
      error.changeAttribute("style", "display: flex");
      button.setChildren("Send").removeAttribute("disabled", "style");
      console.log("Error! Please try again.", err);
    });
};

export { sendEmail };
