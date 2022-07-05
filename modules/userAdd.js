import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
const userAdd = d.createElement("div");

const main = d
  .createElement("main")
  .setAttribute({ class: ["main"] });
const h1 = d.createElement("h1", "Add New User");

const form = d
  .createElement("form")
  .setAttribute({ class: "form", name: "form" });

const userName = d
  .createElement(
    "div",
    d.createElement("label", ["Name", d.createElement("span", " *")])
  )
  .setAttribute({ class: ["form-item"] });

const firstName = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  spellcheck: "false",
  //   placeholder: "First",
  oninput: "nin(this, 1)",
  maxlength: 40,
});

userName.append(
  d.createElement("div", [firstName], {
    class: ["input-field"],
  })
);

const phoneNo = d
  .createElement(
    "div",
    d.createElement("label", ["Phone", d.createElement("span", " *")])
  )
  .setAttribute({ class: ["form-item"] });

const phone = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  spellcheck: "false",
  type: "text",
  oninput: "nin(this, 4)",
  maxlength: 80,
  placeholder: "XXX-XXX-XXXX",
  //pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,//"/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/",//"/^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$/",
  //title: "(555) 555-5555, 555-555-5555, 555.555.5555, 5555555555, 555 555 5555"
});

phoneNo.append(
  d.createElement("div", phone, {
    class: "input-field",
  }),
  d
    .createElement("div", "Valid Phone Number required.")
    .setAttribute({
      class: "error-div",
      id: "phone-error",
    })
);

const emailAdd = d
  .createElement(
    "div",
    d.createElement("label", ["Email", d.createElement("span", " *")])
  )
  .setAttribute({ class: ["form-item"] });

const email = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  spellcheck: "false",
  type: "email",
  oninput: "nin(this, 5)",
  maxlength: 80,
});

emailAdd.append(
  d.createElement("div", email, {
    class: "input-field",
  }),
  d.createElement("div", "Error Found").setAttribute({
    class: "error-div",
  })
);

const userDiv = d
  .createElement(
    "div",
    d.createElement("label", [
      "Username",
      d.createElement("span", " *"),
    ])
  )
  .setAttribute({ class: ["form-item"] });

const user = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  spellcheck: "false",
  type: "text",
  oninput: "nin(this, 6)",
  maxlength: 80,
});

userDiv.append(
  d.createElement("div", user, {
    class: "input-field",
  }),
  d.createElement("div", "Error Found").setAttribute({
    class: "error-div",
  })
);

const passDiv = d
  .createElement(
    "div",
    d.createElement("label", [
      "Password",
      d.createElement("span", " *"),
    ])
  )
  .setAttribute({ class: ["form-item"] });

const pass = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  spellcheck: "false",
  type: "password",
  oninput: "nin(this, 6)",
  maxlength: 80,
});

passDiv.append(
  d.createElement("div", pass, {
    class: "input-field",
  }),
  d.createElement("div", "Error Found").setAttribute({
    class: "error-div",
  })
);

const button = d.createElement("button", "Submit", {
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

form.append(
  userName,
  phoneNo,
  emailAdd,
  userDiv,
  passDiv,
  error,
  button
);

main.append(h1, form);

userAdd.append(header, main);

userAdd.onload = () => {
  header.onload();
};
export { userAdd };
