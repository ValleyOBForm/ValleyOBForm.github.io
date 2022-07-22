import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
const changePass = d.createElement("div");

const main = d
  .createElement("main")
  .setAttribute({ class: ["main"] });
const h1 = d.createElement("h1", "Change Admin Password");

const form = d
  .createElement("form")
  .setAttribute({ class: "form", name: "form" });

const passDiv1 = d
  .createElement(
    "div",
    d.createElement("label", [
      "Old Password",
      d.createElement("span", " *"),
    ])
  )
  .setAttribute({ class: ["form-item"], style: "margin-top: 30px" });

const pass1 = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  spellcheck: "false",
  type: "password",
  oninput: "nin(this, 'pass1')",
  minlength: "5",
});

passDiv1.append(
  d.createElement("div", pass1, {
    class: "input-field",
  }),
  d.createElement("div", "Password doesn't correct").setAttribute({
    class: "error-div",
  })
);

const passDiv2 = d
  .createElement(
    "div",
    d.createElement("label", [
      "New Password",
      d.createElement("span", " *"),
    ])
  )
  .setAttribute({ class: ["form-item"] });

const pass2 = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  spellcheck: "false",
  type: "password",
  oninput: "nin(this, 'pass2')",
  minlength: "5",
});

passDiv2.append(
  d.createElement("div", pass2, {
    class: "input-field",
  }),
  d.createElement("div", "Password doesn't correct").setAttribute({
    class: "error-div",
  })
);

const passDiv3 = d
  .createElement(
    "div",
    d.createElement("label", [
      "Confirm New Password",
      d.createElement("span", " *"),
    ])
  )
  .setAttribute({ class: ["form-item"] });

const pass3 = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  spellcheck: "false",
  type: "password",
  oninput: "nin(this, 'pass3')",
  minlength: "5",
});

passDiv3.append(
  d.createElement("div", pass3, {
    class: "input-field",
  }),
  d.createElement("div", "Password doesn't correct").setAttribute({
    class: "error-div",
  })
);

const button = d.createElement("button", "Change", {
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
const succDiv = d.createElement(
  "div",
  "Successfully added new user!",
  {
    style: "width: 100%; text-align: left;",
  }
);

const thanks = d.createElement(
  "div",
  "Successfully changed password. Thank you!",
  {
    class: "thanks",
  }
);

const closeBtn2 = `
<svg onclick="closeDiv('.success')" aria-hidden="true" style="fill: rgb(34, 207, 92); cursor: pointer" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
`;
success.append(succDiv, closeBtn2);

form.append(passDiv1, passDiv2, passDiv3, error, success, button);

main.append(h1, form);

changePass.append(header, main);

changePass.onload = () => {
  document.querySelector(
    "#nav" + window.location.hash.toString().replace("#/", "")
  ).onclick = () => {
    eval(window.location.hash.toString().replace("#/", "")).onload();
  };
  header.onload();
  form.reset();
  document.forms["form"].onsubmit = (e) => {
    e.preventDefault();
    if (
      pass2.getAttribute("value")[0] !==
      pass3.getAttribute("value")[0]
    ) {
      errDiv.setChildren("Confirm Password does'nt match!");
      error.changeAttribute("style", "display: flex");
      return;
    }
    changeRequest();
  };

  window.nin = (v, i) => {
    eval(i).changeAttributeN("value", v.value);
  };
};

const changeRequest = () => {
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
  d.post(
    "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
    {
      type: 5,
      data: JSON.stringify({
        oldPass: pass1.getAttribute("value")[0],
        newPass: pass2.getAttribute("value")[0],
        database: window.localStorage["com.valleyobform.login"],
      }),
    }
  )
    .then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, messege } = res;
      if (result) {
        if (messege == "success") {
          changePass._rendered = false;
          changePass.setChildren([header, thanks]);
          document.getElementById("root").innerHTML =
            changePass._render();
          header.onload();
        } else {
          errDiv.setChildren("Old Password is't correct");
          error.changeAttribute("style", "display: flex");
          button
            .setChildren("Change")
            .removeAttribute("disabled", "style");
        }
      } else {
        errDiv.setChildren("Error! Try agian");
        error.changeAttribute("style", "display: flex");
        button
          .setChildren("Change")
          .removeAttribute("disabled", "style");
        console.log("Error! Please try again.");
      }
    })
    .catch((err) => {
      errDiv.setChildren("Error! Try agian");
      error.changeAttribute("style", "display: flex");
      button
        .setChildren("Change")
        .removeAttribute("disabled", "style");
      console.log("Error! Please try again.", err);
    });
};

export { changePass };
