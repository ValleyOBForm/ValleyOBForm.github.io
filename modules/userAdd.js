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
  oninput: "nin(this, 'firstName')",
});

userName.append(
  d.createElement("div", [firstName], {
    class: ["input-field"],
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
  type: "email",
  oninput: "nin(this, 'user')",
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
  type: "text",
  oninput: "nin(this, 'pass')",
  minlength: "5",
});

passDiv.append(
  d.createElement("div", pass, {
    class: "input-field",
  }),
  d.createElement("div", "Error Found").setAttribute({
    class: "error-div",
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

const thanksDelete = d.createElement(
  "div",
  "Successfully delete user. Thank you!",
  {
    class: "thanks",
  }
);

const thanksUpdate = d.createElement(
  "div",
  "Successfully changed user data. Thank you!",
  {
    class: "thanks",
  }
);

form.append(userName, userDiv, passDiv, error, success, button);

main.append(h1, form);

userAdd.append(header, main);

userAdd.onload = () => {
  header.onload();
  form.reset();
  if (header.userEdit) {
    form.append(button2);
    h1.setChildren("Edit user data");
    let { data, index } = header.userEdit;
    firstName.changeAttribute("value", data[1].substr(1));
    user.changeAttribute("value", data[2].substr(1));
    pass.changeAttribute("value", data[3].substr(1));
    button.setChildren("Edit");
    document.forms["form"].onsubmit = (e) => {
      e.preventDefault();
      editRequest(data[0].substr(1), index);
    };
    document.querySelector(".delBtn").onclick = () => {
      deleteRequest(index);
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
  d.post(
    "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
    {
      type: 2,
      data: JSON.stringify({
        date: "",
        userName: firstName.getAttribute("value")[0].trim(),
        user: user.getAttribute("value")[0].trim(),
        pass: pass.getAttribute("value")[0],
        database: window.localStorage["com.valleyobform.login"],
      }),
    }
  )
    .then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, messege } = res;
      if (result) {
        if (messege == "success") {
          form.reset();
          main.setChildren([h1, form]);
          success.changeAttribute("style", "display: flex");
          button
            .setChildren("Add")
            .removeAttribute("disabled", "style");
          document.forms["form"].onsubmit = (e) => {
            e.preventDefault();
            addRequest();
          };
        } else {
          errDiv.setChildren("Username already exiest!");
          error.changeAttribute("style", "display: flex");
          button
            .setChildren("Add")
            .removeAttribute("disabled", "style");
        }
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
      button.setChildren("Add").removeAttribute("disabled", "style");
      console.log("Error! Please try again.", err);
    });
};

const editRequest = (date, id) => {
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
      type: 3,
      data: JSON.stringify({
        date: date,
        userName: firstName.getAttribute("value")[0].trim(),
        user: user.getAttribute("value")[0].trim(),
        pass: pass.getAttribute("value")[0],
        id: id,
        database: window.localStorage["com.valleyobform.login"],
      }),
    }
  )
    .then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, messege } = res;
      if (result) {
        userAdd._rendered = false;
        userAdd.setChildren([header, thanksUpdate]);
        document.getElementById("root").innerHTML = userAdd._render();
        header.onload();
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
      type: 4,
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
        userAdd._rendered = false;
        userAdd.setChildren([header, thanksDelete]);
        document.getElementById("root").innerHTML = userAdd._render();
        header.onload();
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
export { userAdd };
