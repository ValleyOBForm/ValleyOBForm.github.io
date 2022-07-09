import d from "../../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
const documentView = d.createElement("div");

const main = d
  .createElement("main")
  .setAttribute({ class: ["main"] });

const form = d.createElement("form").setAttribute({ class: "form" });
const h1 = d.createElement("h1", "Document Name");
const iframe = d.createElement("iframe").setAttribute({
  class: "iframe",
});

main.append(h1, form);

documentView.append(header, main);

documentView.onload = () => {
  header.onload();
  if (header.documentView) {
    let { data } = header.documentView;
    h1.setChildren(data[1].substr(1));
    const src = "/viewer.html?fileId=" + data[2].substr(1);
    form.setChildren([iframe.changeAttribute("src", src)]);
  } else {
    window.location = "./";
  }
};

export { documentView };
