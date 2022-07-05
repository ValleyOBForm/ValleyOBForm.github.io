import d from "../assets/js/NTechDOM.js";
import { pages } from "../assets/js/pages.js";
import { userList } from "./userList.js";
const login = d
  .createElement("section")
  .setAttribute({ class: "wrapper" });

const main = d.createElement("main").setAttribute({
  class: "container",
});

const logo = d.createElement(
  "div",
  `<svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1210 319.38">
<defs>
  <style>
    .cls-1 {
      fill: #004a7f;
    }
  </style>
</defs>
<title>Logo</title>
<g id="Layer_2" data-name="Layer 2">
  <g id="Layer_1-2" data-name="Layer 1">
    <path class="cls-1" d="M17.61,3.71,61.17,114.37,104.54,3.71h17.61L68.4,135.31H53.94L0,3.71Z"></path>
    <path class="cls-1" d="M152.36,137.16a35,35,0,0,1-12.79-2.31,31.85,31.85,0,0,1-10.28-6.4,30,30,0,0,1-6.86-9.54,28.38,28.38,0,0,1-2.5-12,25,25,0,0,1,3-12.14,27.69,27.69,0,0,1,8.44-9.36,43.51,43.51,0,0,1,13-6.12,57.68,57.68,0,0,1,16.41-2.22A80.23,80.23,0,0,1,175,78.41a65,65,0,0,1,12.79,3.52V74.14q0-11.85-6.68-18.63t-18.9-6.76q-14.66,0-30.77,11.31L126,49.49q18.72-12.6,37.63-12.6,19.1,0,29.75,10.19t10.66,28.73v39.48q0,5.74,5.19,5.93v14.09c-1.73.25-3.15.43-4.27.56a32.74,32.74,0,0,1-3.52.18,10.38,10.38,0,0,1-7.69-2.87,11.81,11.81,0,0,1-3.43-7l-.37-6.86a41.8,41.8,0,0,1-16.4,13.25A50.38,50.38,0,0,1,152.36,137.16Zm4.27-12.23a40.54,40.54,0,0,0,16.22-3.24,26.79,26.79,0,0,0,11.4-8.62c2.34-2.35,3.52-4.76,3.52-7.23V91.57a67.19,67.19,0,0,0-24.66-4.64q-12.23,0-19.92,5.19t-7.69,13.53a18.37,18.37,0,0,0,1.57,7.6,18.07,18.07,0,0,0,4.45,6.12,21.22,21.22,0,0,0,6.77,4.08A23.16,23.16,0,0,0,156.63,124.93Z"></path>
    <path class="cls-1" d="M230.58,0h16.31V110.29q0,5.37,2.88,8.43t8.06,3.06a21.27,21.27,0,0,0,4.82-.65,39,39,0,0,0,5.19-1.57l2.59,13.16a54,54,0,0,1-9.64,2.78,50.83,50.83,0,0,1-9.82,1.11q-9.45,0-14.92-5.38t-5.47-15Z"></path>
    <path class="cls-1" d="M283.59,0H299.9V110.29q0,5.37,2.88,8.43t8.06,3.06a21.2,21.2,0,0,0,4.82-.65,39,39,0,0,0,5.19-1.57l2.59,13.16a53.87,53.87,0,0,1-9.63,2.78,51,51,0,0,1-9.83,1.11q-9.45,0-14.92-5.38t-5.47-15Z"></path>
    <path class="cls-1" d="M379.05,137.16a49.25,49.25,0,0,1-20-4,47.52,47.52,0,0,1-15.57-10.84,49.49,49.49,0,0,1-10.1-16,52.32,52.32,0,0,1-3.61-19.37,51.61,51.61,0,0,1,3.61-19.27,48.92,48.92,0,0,1,10.2-15.95,48.32,48.32,0,0,1,15.66-10.84,49.35,49.35,0,0,1,20-4,47.08,47.08,0,0,1,44.95,30.67,52,52,0,0,1,3.42,18.63c0,1.36,0,2.6-.09,3.71a18,18,0,0,1-.28,2.59H347a37.56,37.56,0,0,0,3.34,13.16,33.4,33.4,0,0,0,17.33,16.87,30.11,30.11,0,0,0,12,2.41,32,32,0,0,0,8.71-1.2,38.17,38.17,0,0,0,8-3.25,27.7,27.7,0,0,0,6.58-5,20.68,20.68,0,0,0,4.36-6.68l14.08,3.9a35.39,35.39,0,0,1-6.58,9.82,43.33,43.33,0,0,1-9.64,7.69,49.16,49.16,0,0,1-12.14,5.1A51.92,51.92,0,0,1,379.05,137.16Zm33.18-56.72a34.77,34.77,0,0,0-3.43-12.69,34.17,34.17,0,0,0-7.23-9.92A33.13,33.13,0,0,0,367,51.44a31.34,31.34,0,0,0-10.1,6.48,32.88,32.88,0,0,0-7,9.92,36.3,36.3,0,0,0-3.25,12.6Z"></path>
    <path class="cls-1" d="M447.45,161.63c1.6.25,3.21.43,4.81.56s2.85.18,3.71.18a7.85,7.85,0,0,0,4-1,11.06,11.06,0,0,0,3.52-4,70.69,70.69,0,0,0,4-8.25q2.24-5.28,5.56-13.81l-41-96.76h16.87l33,82.12,30-82.12h15.57L480.44,160.71a28.18,28.18,0,0,1-8.62,11.39q-6,4.92-16.59,4.92a33.78,33.78,0,0,1-3.43-.19,41.7,41.7,0,0,1-4.35-.74Z"></path>
    <path class="cls-1" d="M641.88,136.24a56,56,0,0,1-25.3-5.66,62.19,62.19,0,0,1-19.55-15,68.22,68.22,0,0,1-12.61-21.41A70.76,70.76,0,0,1,580,69.51,68.44,68.44,0,0,1,584.7,44.3,69.67,69.67,0,0,1,597.77,23,62.87,62.87,0,0,1,617.51,8.25a56.42,56.42,0,0,1,24.75-5.47,54.14,54.14,0,0,1,25.2,5.84,64.59,64.59,0,0,1,19.47,15.29A71,71,0,0,1,704,69.69a68.41,68.41,0,0,1-4.73,25.21,69.37,69.37,0,0,1-13,21.23,62.47,62.47,0,0,1-19.65,14.64A56.42,56.42,0,0,1,641.88,136.24Zm-45-66.73a58.57,58.57,0,0,0,3.25,19.37,53.56,53.56,0,0,0,9.17,16.59A44.32,44.32,0,0,0,623.53,117a40.16,40.16,0,0,0,18.54,4.26A38.89,38.89,0,0,0,661,116.68a46.18,46.18,0,0,0,14.18-11.86,53,53,0,0,0,8.89-16.59,59.16,59.16,0,0,0-.18-38.09,51.69,51.69,0,0,0-9.27-16.5,46.74,46.74,0,0,0-14.27-11.4,41.84,41.84,0,0,0-37.17.19A45.63,45.63,0,0,0,609,34.11a53.42,53.42,0,0,0-9,16.49A58.43,58.43,0,0,0,596.84,69.51Z"></path>
    <path class="cls-1" d="M828.17,101.39a31.38,31.38,0,0,1-3.06,13.9A32.34,32.34,0,0,1,816.77,126a38.08,38.08,0,0,1-12.24,6.86,45.14,45.14,0,0,1-14.92,2.41H727.15V3.71h65.43a26.07,26.07,0,0,1,12.42,3,31.07,31.07,0,0,1,9.45,7.7,35.26,35.26,0,0,1,6,10.75,36.16,36.16,0,0,1,2.13,12.14,35.09,35.09,0,0,1-4.91,18.16,30.13,30.13,0,0,1-14,12.42,33.11,33.11,0,0,1,17.89,12.33A35,35,0,0,1,828.17,101.39ZM743.83,18.16V62.1h41.89a18.67,18.67,0,0,0,8.15-1.77,20.06,20.06,0,0,0,6.4-4.72,23.07,23.07,0,0,0,5.84-15.39,25.53,25.53,0,0,0-1.48-8.71,23.19,23.19,0,0,0-4-7,17.57,17.57,0,0,0-6.12-4.64,18.16,18.16,0,0,0-7.69-1.67ZM811.3,98.43a24.19,24.19,0,0,0-1.58-8.62,24.71,24.71,0,0,0-4.26-7.33,20.15,20.15,0,0,0-6.4-5,18,18,0,0,0-8.15-1.85H743.83v45.22h45.78a19.54,19.54,0,0,0,8.53-1.85,23.59,23.59,0,0,0,6.86-4.91,22.66,22.66,0,0,0,6.3-15.66Z"></path>
    <path class="cls-1" d="M944.38,117.52q-17.42,18.72-40,18.72A52.7,52.7,0,0,1,880,130.49a64.32,64.32,0,0,1-19.37-15.1A72.66,72.66,0,0,1,847.72,94,67.49,67.49,0,0,1,843,69.14a69.85,69.85,0,0,1,17.43-46.43A60.29,60.29,0,0,1,879.88,8.16a56.13,56.13,0,0,1,24.47-5.38q19.08,0,31.41,8a52.89,52.89,0,0,1,18.82,20.76l-12.79,8.9q-5.94-11.49-15.76-17a44,44,0,0,0-22-5.57,38,38,0,0,0-18.17,4.36,44.82,44.82,0,0,0-13.9,11.49,53,53,0,0,0-8.9,16.5,60.34,60.34,0,0,0-3.15,19.37,56,56,0,0,0,3.52,19.92,54.5,54.5,0,0,0,9.64,16.5,44.8,44.8,0,0,0,14.46,11.22,40.75,40.75,0,0,0,18.16,4.07q21.51,0,38.74-20.76V82.3H916V69.69h42.45v65.62H944.38Z"></path>
    <path class="cls-1" d="M982.38,3.71l39.85,68.58,40.23-68.58h18.16l-50,83.59v48h-16.68V86.93L964,3.71Z"></path>
    <path class="cls-1" d="M1115.47,34.85V135.31h-16.68V3.71h13l81.56,102.5V3.89H1210V135.31h-14.09Z"></path>
    <path class="cls-1" d="M388.94,317.85V208.78H461v12.29H402.77v36.41h49V269h-49v48.85Z"></path>
    <path class="cls-1" d="M506.46,319.38a39.31,39.31,0,0,1-29.26-12.44A40.55,40.55,0,0,1,469,293.73a44.26,44.26,0,0,1,.07-31.8,42.08,42.08,0,0,1,8.3-13.21,40.24,40.24,0,0,1,58.37,0,42.08,42.08,0,0,1,8.3,13.21,44.26,44.26,0,0,1,.07,31.8A39.83,39.83,0,0,1,523,316,39.56,39.56,0,0,1,506.46,319.38Zm-26.58-41.32A32.06,32.06,0,0,0,482,289.74a29.83,29.83,0,0,0,5.68,9.37,26.76,26.76,0,0,0,8.45,6.29,24.43,24.43,0,0,0,20.74,0,27.09,27.09,0,0,0,8.52-6.37,29.67,29.67,0,0,0,5.76-9.53,32.59,32.59,0,0,0,2.08-11.75,32.15,32.15,0,0,0-2.08-11.59,29.78,29.78,0,0,0-5.76-9.53,27.09,27.09,0,0,0-8.52-6.37A23.8,23.8,0,0,0,506.46,248a23.28,23.28,0,0,0-10.37,2.38,27.28,27.28,0,0,0-8.45,6.46,30.46,30.46,0,0,0-5.68,9.52A32.63,32.63,0,0,0,479.88,278.06Z"></path>
    <path class="cls-1" d="M605.85,249.49a34.77,34.77,0,0,0-17.9,5.22,26.67,26.67,0,0,0-11,13.67v49.47H563.45V237.66H576v18.59A37.83,37.83,0,0,1,587,242.81a27.13,27.13,0,0,1,14.44-5.76H604a9.88,9.88,0,0,1,1.85.15Z"></path>
    <path class="cls-1" d="M740.1,317.85H726.58V273q0-12.58-4.07-18.59t-12.06-6a21.49,21.49,0,0,0-14.82,5.92,32.52,32.52,0,0,0-9.29,15.28v48.24H672.82V273q0-12.9-4-18.74t-12-5.84a21.86,21.86,0,0,0-14.74,5.76,31.23,31.23,0,0,0-9.37,15.29v48.39H619.21V237.66H631.5v17.21a36.25,36.25,0,0,1,12.75-13.75,32.88,32.88,0,0,1,17.66-4.84q10.14,0,16.06,5.45a23.59,23.59,0,0,1,7.29,14.06q10.75-19.51,30.57-19.51a24.15,24.15,0,0,1,11.6,2.53,19.4,19.4,0,0,1,7.45,7.07,32.71,32.71,0,0,1,4,10.67,68.24,68.24,0,0,1,1.23,13.37Z"></path>
    <path class="cls-1" d="M789.26,319.38a62.39,62.39,0,0,1-19-3,46.91,46.91,0,0,1-16.13-8.68l5.84-9.07a56.67,56.67,0,0,0,14.13,8.07A41.6,41.6,0,0,0,789,309.4q8.76,0,13.9-3.46a11.07,11.07,0,0,0,5.15-9.75,8.76,8.76,0,0,0-1.39-5,11.7,11.7,0,0,0-4.14-3.61,34.3,34.3,0,0,0-7.07-2.76q-4.3-1.23-10-2.61-7.23-1.84-12.45-3.53a33.66,33.66,0,0,1-8.6-4,13.92,13.92,0,0,1-4.91-5.53,18.42,18.42,0,0,1-1.54-8,23.18,23.18,0,0,1,2.38-10.67,22.45,22.45,0,0,1,6.53-7.84,29.37,29.37,0,0,1,9.75-4.76,43.67,43.67,0,0,1,12.06-1.61,47.93,47.93,0,0,1,16.9,2.92,41.45,41.45,0,0,1,13.21,7.68L812.61,255a34.42,34.42,0,0,0-11.37-6.68,38.32,38.32,0,0,0-12.91-2.23,23.52,23.52,0,0,0-12.51,3.15q-5.16,3.15-5.15,10.06a9.56,9.56,0,0,0,1,4.61,8.59,8.59,0,0,0,3.3,3.22,25.52,25.52,0,0,0,5.91,2.46q3.61,1.08,8.68,2.31,8,1.84,13.91,3.76a40.06,40.06,0,0,1,9.83,4.53,17.43,17.43,0,0,1,5.83,6.15,17.77,17.77,0,0,1,1.93,8.6q0,11.21-8.61,17.82T789.26,319.38Z"></path>
  </g>
</g>
</svg>`,
  { class: ["center"] }
);

const form = d
  .createElement("form")
  .setAttribute({ class: "form", name: "form" });
const userName = d.createElement("input", "", {
  autocomplete: "off",
  placeholder: " ",
  required: "",
});

const password = d.createElement("input", "", {
  autocomplete: "off",
  type: "password",
  placeholder: " ",
  required: "",
});

const submit = d.createElement("button", "Login", {
  class: "button",
});

form.append(
  d.createElement(
    "div",
    [userName, d.createElement("label", "Username")],
    { class: "form-field" }
  ),
  d.createElement(
    "div",
    [password, d.createElement("label", "Password")],
    { class: "form-field" }
  ),
  d.createElement(
    "div",
    "Wrong username and/or password. Please try again.",
    { id: "error" }
  ),
  d.createElement("div", submit)
);

main.append(logo, form);

login.append(main);

login.onload = () => {
  document.forms["form"].onsubmit = (e) => {
    e.preventDefault();
    submit
      .setChildren("Please Wait..")
      .changeAttribute("disabled", "");
    document.querySelector("#error").style.display = "none";
    let user = document.querySelector(
      `div [node="${userName._node}"]`
    );
    let pass = document.querySelector(
      `div [node="${password._node}"]`
    );
    d.post(
      "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
      {
        type: 0,
        data: JSON.stringify({
          userName: user.value,
          password: pass.value,
        }),
      }
    ).then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data } = res;
      if (result) {
        userList._loginData = data;
        window.localStorage["com.valleyobform.login"] = data;
        pages.root = "userList";
        pages.page = { ...pages.list };
        window.location = "#/userList";
      } else {
        document.querySelector("#error").style.display = "block";
        submit.setChildren("Login").removeAttribute("disabled");
      }
    });
  };
};
export { login };
