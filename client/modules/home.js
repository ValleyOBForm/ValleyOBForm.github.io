import d from "../../assets/js/NTechDOM.js";
import { loading } from "./loading.js";
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
const footer = d.createElement("div", "www.ValleyOBcare.com", {
  style: "text-align: center; margin-top: 150px",
  id: "footer",
});

const finalSubmitDiv = d.createElement("div").setAttribute({
  class: "finalSubmitDiv",
});

const finalSubmit = d.createElement("button", "Submit", {
  class: "finalSubmit",
  onclick: "finalSubmitRequest()",
});

const doc = d.createElement("div").setAttribute({
  class: "document",
});

const thanks = d.createElement(
  "div",
  "Successfully submitted signature. Thank you!",
  {
    class: "thanks",
  }
);

const attention = d.createElement(
  "div",
  d.createElement(
    "div",
    "For signeture movement, please click signeture and then alt + mouse move.",
    {
      class: "attention",
    }
  ),
  {
    class: "attentionDiv",
  }
);
home.append(header, main, doc, footer);

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
        } else if (messege == "used") {
          submit
            .setChildren("Submit")
            .removeAttribute("disabled", "style");
          document.querySelector("#error-field").style.display =
            "block";
          document.querySelector("#error-field").innerHTML =
            "Signeture already submitted!";
        } else {
          seeMessege(messege);
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

const dateCovert = (date) => {
  date = new Date(date);
  return (
    String(date.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(date.getDate()).padStart(2, "0") +
    "/" +
    date.getFullYear()
  );
};

let { PDFDocument } = PDFLib;

const seeMessege = async (messege) => {
  document.querySelector("#footer").remove();
  main.setChildren(loading);

  const url =
    "https://raw.githubusercontent.com/valleyobformdocument/documents/main/" +
    messege;
  const existingPdfBytes = await fetch(url).then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const form = pdfDoc.getForm();
  let fields = form.getFields();
  for (let i = 0; i < fields.length; i++) {
    console.log(fields[i].getName());
  }
  const dateField = form.getField("data");
  dateField.setText(dateCovert(new Date()));
  const pages = pdfDoc.getPages();
  const pdfBytes = await pdfDoc.save();
  let maxWidth = 0;
  for (let x of pages) {
    if (maxWidth < x.getWidth()) {
      maxWidth = x.getWidth();
    }
  }
  console.log(window.innerWidth / maxWidth);

  let pdfjsLib = window["pdfjs-dist/build/pdf"];
  pdfjsLib.document = pdfBytes;
  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "../assets/pdf.js/build/pdf.worker.js";

  let loadingTask = pdfjsLib.getDocument(pdfBytes);
  loadingTask.promise.then(
    function (pdf) {
      console.log("PDF loaded");
      const canvasDiv = d.createElement("div").setAttribute({
        class: "canvasDiv",
      });

      const canvasDiv2 = d.createElement("div").setAttribute({
        class: "canvasDiv2",
      });
      const canvas = d.createElement("canvas").setAttribute({
        width: "300px",
        height: "100px",
        id: "canvas",
        class: "canvas",
      });

      const addBtn = d.createElement("button", "Add", {
        onclick: "addSign()",
      });
      const cancleBtn = d.createElement("button", "Cancle", {
        onclick: "cancleSign()",
      });

      canvasDiv.append(
        canvasDiv2.append(
          canvas,
          d.createElement("div", [addBtn, cancleBtn], {
            class: "buttonDiv",
          })
        )
      );
      doc.setChildren(canvasDiv);
      home._rendered = false;
      if ("ontouchstart" in window) {
        home.setChildren([
          header,
          finalSubmitDiv.append(
            finalSubmit,
            d.createElement("d").setAttribute({
              class: "finalSubmitError",
            })
          ),
          ,
          doc,
        ]);
      } else {
        home.setChildren([
          header,
          finalSubmitDiv.append(
            finalSubmit,
            d.createElement("d").setAttribute({
              class: "finalSubmitError",
            })
          ),
          ,
          doc,
          attention,
        ]);
      }

      document.getElementById("root").innerHTML = home._render();

      for (let i = 0; i < pages.length; i++) {
        let page = document.createElement("div");
        page.setAttribute("class", "page");
        let canvas = document.createElement("canvas");
        let sign = document.createElement("div");
        sign.setAttribute("class", "sign");
        sign.setAttribute("onclick", `signShow(${i})`);
        sign.innerHTML = "Add sign";
        page.append(canvas, sign);
        document.querySelector(".document").appendChild(page);
        pdf.getPage(i + 1).then(function (page) {
          console.log("Page loaded");

          let scale = 1.5;
          var viewport = page.getViewport({ scale: scale });
          pdfjsLib.scaleSize = scale;
          // Prepare canvas using PDF page dimensions
          var context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
            console.log("Page rendered");
          });
        });
      }
    },
    function (reason) {
      // PDF loading error
      console.error(reason);
    }
  );
};

const signShow = async (i) => {
  const canvas = document.querySelector("#canvas");
  const signaturePad = new SignaturePad(canvas, {
    minWidth: 1,
    maxWidth: 1,
    penColor: "rgb(21, 21, 21)",
  });
  document.querySelector(".canvasDiv").style.transform = "scale(1)";
  window.pageNo = i;
  window.signaturePad = signaturePad;
};

window.signShow = signShow;

window.cancleSign = () => {
  document.querySelector(".canvasDiv").style.transform = "scale(0)";
};

window.addSign = () => {
  const page = document.querySelectorAll(".page")[pageNo];
  let data = signaturePad.toDataURL("image/png");
  let img = document.createElement("img");
  img.src = data;
  img.draggable = false;
  img.height = "75";
  window.setPosition = (e) => {
    img.style.top = e.offsetY - 75 / 2 + "px";
    img.style.left = e.offsetX - 150 / 2 + "px";
  };

  window.setPosition2 = (e) => {
    let h = 0;
    if (pageNo) {
      for (let i = 0; i <= pageNo - 1; i++) {
        h += Number(
          getComputedStyle(document.querySelectorAll(".page")[i])[
            "height"
          ].slice(0, -2)
        );
      }
    }
    img.style.top = e.changedTouches[0].pageY - 75 / 2 - h + "px";
    img.style.left = e.changedTouches[0].pageX - 150 / 2 + "px";
  };

  img.addEventListener("click", (e) => {
    img.style.border = "1px solid lime";
    let newPage = document.createElement("div");
    newPage.setAttribute(
      "style",
      "position: absolute; top: 0;left: 0;right: 0;bottom:0;background: rgba(256, 256, 256, 0.4);z-index: 5"
    );
    page.appendChild(newPage);
    let moveable = false;
    newPage.addEventListener("mousedown", (e) => {
      if (e.buttons === 1) {
        moveable = true;
        //setPosition(e);
      }

      newPage.addEventListener("mousemove", (e) => {
        if (moveable && e.altKey) {
          setPosition(e);
        } else {
          img.style.border = "none";
          newPage.remove();
        }
      });
    });

    newPage.addEventListener("touchstart", () => {
      newPage.addEventListener("touchmove", setPosition2);
      newPage.addEventListener("touchend", () => {
        img.style.border = "none";
        newPage.remove();
      });
    });
  });
  page.appendChild(img);

  document.querySelector(".canvasDiv").style.transform = "scale(0)";
};

window.onresize = () => {
  window.location = "./?i=" + GetURLParameter("i");
};

function convertDataURIToBinary(dataURI) {
  var raw = window.atob(dataURI);
  var rawLength = raw.length;

  var array = new Uint8Array(new ArrayBuffer(rawLength));
  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i) & 0xff;
  }
  return array;
}

const pdfShow = (pages, pdfBytes) => {
  document.querySelector(".document").innerHTML = "";
  let pdfjsLib = window["pdfjs-dist/build/pdf"];
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "../assets/pdf.js/build/pdf.worker.js";
  let loadingTask = pdfjsLib.getDocument(pdfBytes);
  return loadingTask.promise.then(
    function (pdf) {
      console.log("PDF loaded");
      for (let i = 0; i < pages; i++) {
        let page = document.createElement("div");
        page.setAttribute("class", "page");
        let canvas = document.createElement("canvas");
        page.append(canvas);
        document.querySelector(".document").appendChild(page);
        pdf.getPage(i + 1).then(function (page) {
          console.log("Page loaded");

          var scale = 1.5;
          var viewport = page.getViewport({ scale: scale });
          // Prepare canvas using PDF page dimensions
          var context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
            console.log("Page rendered");
          });
        });
      }
    },
    function (reason) {
      // PDF loading error
      console.error(reason);
    }
  );
};

const uint8ArrayToBase64 = async (data) => {
  const base64url = await new Promise((r) => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result);
    reader.readAsDataURL(new Blob([data]));
  });
  return base64url;
};

let imgsCount = 0;
const finalSubmitRequest = async () => {
  finalSubmit
    .setChildren(
      `
    <svg viewBox="0 0 18 18" focusable="false" ><g><path d="M15.5 9.8V8.17l-1.83-.32a5.21 5.21 0 00-.56-1.33L14.16 5 13 3.83l-1.52 1.08a8.28 8.28 0 00-1.32-.54L9.82 2.5H8.19l-.34 1.87a4.87 4.87 0 00-1.3.53L5 3.84 3.87 4.92l1 1.64a4.53 4.53 0 00-.54 1.31L2.5 8.2v1.64l1.86.34a5 5 0 00.55 1.3L3.87 13 5 14.19l1.54-1.06a4.89 4.89 0 001.31.56l.33 1.81h1.63l.33-1.86a5.38 5.38 0 001.34-.54L13 14.15 14.16 13l-1.06-1.53a5.46 5.46 0 00.57-1.34zM9 11a2 2 0 112-2 2 2 0 01-2 2z"></path></g></svg>
  `
    )
    .changeAttribute("disabled", "")
    .changeAttribute("style", [
      "background: rgb(0, 93, 180, 0.5); color: #fcfcfcb0;",
    ]);
  document.querySelector(".finalSubmitError").style.display = "none";
  document.querySelector(".attentionDiv").style.display = "none";
  let { PDFDocument } = PDFLib;
  const pages = document.querySelectorAll(".page");
  const pdfDoc = await PDFDocument.load(window.pdfjsLib.document);

  const form = pdfDoc.getForm();
  let fields = form.getFields();
  for (let i = 0; i < fields.length; i++) {
    console.log(fields[i].getName());
  }
  const dateField = form.getField("data");
  dateField.setText(dateCovert(new Date()));

  const pdfDocPages = pdfDoc.getPages();

  for (let x = 0; x < pages.length; x++) {
    const page = pdfDocPages[x];
    let imgs = pages[x].querySelectorAll("img");
    imgsCount += imgs.length;
    for (let y of imgs) {
      const pngImage = await pdfDoc.embedPng(
        convertDataURIToBinary(y.src.split(",")[1])
      );

      const pngDims = pngImage.scale(0.5);

      page.drawImage(pngImage, {
        x:
          page.getWidth() -
          (page.getWidth() -
            Number(window.getComputedStyle(y)["left"].slice(0, -2))) /
            1.5 -
          pngDims.width * 1.35,
        y:
          page.getHeight() -
          Number(window.getComputedStyle(y)["top"].slice(0, -2)) /
            1.5 -
          pngDims.height,
        width: pngDims.width,
        height: pngDims.height,
      });
    }
  }

  const pdfBytes = await pdfDoc.save();
  window.pdfjsLib.document = pdfBytes;

  if (imgsCount == 0) {
    finalSubmit
      .setChildren("Submit")
      .removeAttribute("disabled", "style");
    document.querySelector(".finalSubmitError").style.display =
      "block";
    document.querySelector(".finalSubmitError").innerHTML =
      "Signature required!";
  } else {
    await pdfShow(pdfDocPages.length, pdfBytes);
    let pdfData = await uint8ArrayToBase64(pdfBytes);
    d.post(
      "https://script.google.com/macros/s/AKfycby_Ej5m-zMH0j92eXMhsoqpv83xcAjm3zvWVYkkzor5XX8uBpzxL6VVB-e_FJZAvBLq/exec",
      {
        type: 1,
        data: JSON.stringify({
          data: pdfData,
          id: GetURLParameter("i"),
        }),
      }
    )
      .then((res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result } = res;
        if (result) {
          home._rendered = false;
          home.setChildren([header, thanks, footer]);
          document.getElementById("root").innerHTML = home._render();
        }
      })
      .catch((err) => {
        finalSubmit
          .setChildren("Submit")
          .removeAttribute("disabled", "style");
        document.querySelector(".finalSubmitError").style.display =
          "block";
        document.querySelector(".finalSubmitError").innerHTML =
          "Error found! Please try again.";
        document.querySelector(".attentionDiv").style.display =
          "flex";
      });
  }
};

window.finalSubmitRequest = finalSubmitRequest;
export { home };
