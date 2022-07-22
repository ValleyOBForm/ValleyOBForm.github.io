import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
import d from "../assets/js/NTechDOM.js";
const getURLParameter = (parameter) => {
  let data = [];
  let url = window.location.toString();

  if (url.indexOf("?") >= 0) {
    url = url.substr(url.indexOf("?"));
    let searchParams = new URLSearchParams(url);
    if (searchParams.has(parameter)) {
      data = searchParams.getAll(parameter);
    }
  }
  if (data[0]) return data[0];
  return "";
};

// const auth =
//   "Z2hwXzRvQ2FCVmhRMU5wWjRIR3E4MmxqOVJXU2JyaTRtNDM3ekhQTA==";
// const octokit = new Octokit({
//   auth: window.atob(auth),
// });
// console.log(getURLParameter("fileId"));
// let test = await octokit.request(
//   "GET /repos/valleyobformdocument/documents/contents/" +
//     getURLParameter("fileId"),
//   {
//     owner: "OWNER",
//     repo: "REPO",
//     path: "PATH",
//   }
// );

const test = await d.getBlobData64(
  "https://raw.githubusercontent.com/valleyobformdocument/documents/main/" +
    getURLParameter("fileId")
);

function convertDataURIToBinary(dataURI) {
  var raw = window.atob(dataURI);
  var rawLength = raw.length;

  var array = new Uint8Array(new ArrayBuffer(rawLength));
  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i) & 0xff;
  }
  return array;
}

delete window.localStorage["pdfjs.history"];
PDFViewerApplication.open(
  convertDataURIToBinary(test.split(",")[1])
).then(() => {
  document.getElementById("loading").style.display = "none";
});
