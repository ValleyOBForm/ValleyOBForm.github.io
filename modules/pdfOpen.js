import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

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

const auth =
  "Z2hwXzRvQ2FCVmhRMU5wWjRIR3E4MmxqOVJXU2JyaTRtNDM3ekhQTA==";
const octokit = new Octokit({
  auth: window.atob(auth),
});

let test = await octokit.request(
  "GET /repos/valleyobformdocument/documents/contents/" +
    getURLParameter("fileId"),
  {
    owner: "OWNER",
    repo: "REPO",
    path: "PATH",
  }
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

PDFViewerApplication.open(
  convertDataURIToBinary(test.data.content)
).then(() => {
  document.getElementById("loading").style.display = "none";
});
