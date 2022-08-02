import { login } from "../../modules/login.js";
import { page } from "../../modules/page.js";
import { emailPage } from "../../modules/email.js";
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const loginLoad = () => {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let loginBtn = document.querySelector("#loginBtn");

  document.forms["admin-login-form"].onsubmit = async (e) => {
   e.preventDefault();
   loginBtn.disabled = true;
   loginBtn.innerText = "Please Wait..";
   document.querySelector("#login-error").style.display = "none";
   let ipAddress = "";
   try {
     ipAddress = await d.get("https://ifconfig.me/ip");
   } catch(err){
     document.querySelector("#login-error").innerText = "Please deactivate adblock and reload again."
     document.querySelector("#login-error").style.display = "block";
     loginBtn.disabled = false;
     loginBtn.innerText = "Login";
     return;
   }
    d.post(
      "https://script.google.com/macros/s/AKfycbzLEX8OFSld2y-zSNGCw5oyqVWbqfoKO1kKrJ5n0cHJElKaNIQY0QnAQnLeGrR2eHzD/exec",
      {
        type: 0,
        data: JSON.stringify({
          userName: username.value.trim(),
          password: password.value,
          ip: ipAddress
        }),
      }
    ).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data, messege, history } = res;
      if (result && messege != "ip") {
        document.querySelector("#body").innerHTML = page;
        loadAll();
        showDocumentData(data);
        documentSearchLoad(data);
        logoutLoad();
        window.d.messege = messege;
        window.d.history = history;
      } else if(result && messege == "ip"){
        document.querySelector("#login-error").innerText = "Unauthorized Access. Contact System Administrator."
        document.querySelector("#login-error").style.display = "block";
        loginBtn.disabled = false;
        loginBtn.innerText = "Login";
      } else {
        document.querySelector("#login-error").innerText = "Wrong username and/or password. Please try again."
        document.querySelector("#login-error").style.display = "block";
        loginBtn.disabled = false;
        loginBtn.innerText = "Login";
      }
    });
}
};

// documents 
const documentSearchLoad = (data) => {
  let search = document.querySelector("#search");
  
  document.forms["search-form"].onsubmit = (e) => {
    e.preventDefault();
    let finalData = [];
    for(let i = 0; i < data.length; i++){
      if(data[i][0].toLowerCase().indexOf(search.value.toLowerCase()) > -1){
        data[i].push(i);
        finalData.push(data[i]);
      }
    }
    showDocumentData(finalData, 1)
  }
};

const documentsLoad = () => {
  let button = document.querySelector("#home");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = page;
    d.post(
      "https://script.google.com/macros/s/AKfycbzLEX8OFSld2y-zSNGCw5oyqVWbqfoKO1kKrJ5n0cHJElKaNIQY0QnAQnLeGrR2eHzD/exec",
      {
        type: 1,
        data: JSON.stringify({
          database: window.d.messege,
        }),
      }
    ).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data } = res;
      if (result) {
        loadAll();
        showDocumentData(data);
        documentSearchLoad(data);
        logoutLoad();
      } 
    }).catch(err => {
      console.log(err);
    })
  }
}

const convertDataURIToBinary = async (fileId) => {
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

const newRender = (type = "") => {
  if (PDFViewerApplication.documentInfo !== null) {
    rendered(type);
    return;
  }
  setTimeout(() => {
    newRender(type);
  }, 1000);
};

const inputPrevent = (e) => {
  if(e.inputType == "insertText" || e.inputType == "insertCompositionText"){
    e.target.value = e.target.value.slice(0, -1 * e.data.length);
  }
}

window.inputPrevent = inputPrevent;

const rendered = (type = "") => {
  let List = document.querySelectorAll("#viewerContainer input");
  for (let x of List) {
    x.setAttribute("oninput", "inputPrevent(event)");
    x.setAttribute("autocomplete", "off");
  }
  if(List.length == 0){
    setTimeout(function() {
      rendered(type)
    }, 1000)
    return;
  }
  if(type == "") {
    document.getElementById("loading").style.display = "none";
  }
};

PDFViewerApplication.rendered = rendered;

const uint8ArrayToBase64 = async (data) => {
  const base64url = await new Promise((r) => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result);
    reader.readAsDataURL(new Blob([data]));
  });
  return base64url.split(",", 2)[1];
};

const emailFormLoad = (docName) => {
  let form = document.forms["emailSendForm"];
  let client = document.querySelector("#emailSendName");
  let email = document.querySelector("#emailSendEmail");
  let date = document.querySelector("#emailSendDate");
  let button = document.querySelector("#emailSendBtn");
  let error = document.querySelector("#error");
  let loading = document.querySelector("#loading");
  
  form.onsubmit = async (e) => {
    e.preventDefault();
    error.style.display = "none";
    loading.style.display = "block";
    button.innerText = "Sending..";
    
    const data = await PDFViewerApplication.pdfDocument.saveDocument();
    let result = await uint8ArrayToBase64(data);
    const auth = "Z2hwXzRvQ2FCVmhRMU5wWjRIR3E4MmxqOVJXU2JyaTRtNDM3ekhQTA==";
     
    const octokit = new Octokit({
      auth: window.atob(auth),
    });
    
    let fileId = client.value.replace(/ /g, "-") + new Date().getTime() + ".pdf";
    let test = await octokit.request(
      "PUT /repos/valleyobformdocument/documents/contents/" + fileId,
          {
            owner: "OWNER",
            repo: "REPO",
            path: "PATH",
            message: "Added " + client.value + " pdf.",
            committer: {
            name: "ValleyOBForm",
            email: "valleyobform@gmail.com",
          },
        content: result,
      });
      
    d.post(
    "https://script.google.com/macros/s/AKfycbzLEX8OFSld2y-zSNGCw5oyqVWbqfoKO1kKrJ5n0cHJElKaNIQY0QnAQnLeGrR2eHzD/exec",
    {
      type: 2,
      data: JSON.stringify({
        time: "",
        docName: docName,
        email: email.value,
        date: date.value,
        name: client.value,
        fileId: fileId,
        id: "",
        database: window.d.messege
      }),
    }).then(res => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result } = res;
      if(result){
        e.target.reset();
        button.innerText = "Send";
        loading.style.display = "none";
        $('#sentEmailModal').modal('show')
      } else{
        console.log(res);
        error.style.display = "block";
        button.innerText = "Send";
        loading.style.display = "none";
      }
    }).catch(err => {
      console.log(err);
      error.style.display = "block";
      button.innerText = "Send";
      loading.style.display = "none";
    })      
  }
}

const emailShow = async (fileName, fileId) => {
  document.querySelector("#body").innerHTML = emailPage;
  emailFormLoad(fileName);
  loadAll();
  logoutLoad();
  let d_ = await convertDataURIToBinary(fileId);
  delete window.localStorage["pdfjs.history"];
  webViewerLoad();
  await PDFViewerApplication.open(d_);
  newRender();
}

window.emailShow = emailShow;

const showDocumentData = (data, type = "") => {
  document.querySelector("#home a").classList.add("active");
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let result2 = "";
  let index = 1;
  let idList = [];
  for(let x of data){
    let id = index;
    if(type) id = x[3];
    idList.push(id);
    result += `
    <tr>
  		<td onclick="emailShow('${x[0].substr(1)}', '${x[1].substr(1)}')" style="cursor: pointer;">${x[0].substr(1)}</td>
  	</tr>
    `
  index++;
  }
  
  table.innerHTML = `
	${result}
  `;
  table.style.display = "table";
  loading.style.display = "none";
}

// inbox
const inboxSearchLoad = (data) => {
  let search = document.querySelector("#search");

  document.forms["search-form"].onsubmit = (e) => {
    e.preventDefault();
    let finalData = [];
    for(let i = 0; i < data.length; i++){
      if(data[i][0].toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
         data[i][1].toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
         data[i][2].toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
         data[i][3].toLowerCase().indexOf(search.value.toLowerCase()) > -1
      ){
        data[i].push(i);
        finalData.push(data[i]);
      }
    }
    showInboxData(finalData, 1)
  }
};

const inboxLoad = () => {
  let button = document.querySelector("#inbox");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = page;
    d.post(
      "https://script.google.com/macros/s/AKfycbzLEX8OFSld2y-zSNGCw5oyqVWbqfoKO1kKrJ5n0cHJElKaNIQY0QnAQnLeGrR2eHzD/exec",
      {
        type: 3,
        data: JSON.stringify({
          database: window.d.messege,
        }),
      }
    ).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data } = res;
      if (result) {
        loadAll();
        showInboxData(data);
        inboxSearchLoad(data);
        logoutLoad();
      } 
    }).catch(err => {
      console.log(err);
    })
  }
}

const downloadFile = (id) => {
  const a = document.createElement("a");
  a.style.display = "none";
  a.target = "_blank";
  a.href = "https://drive.google.com/uc?export=download&id=" + id;
  a.download = id + ".pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

window.downloadFile = downloadFile;

const showInboxData = (data, type = "") => {
  document.querySelector("#inbox a").classList.add("active");
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let result2 = "";
  let index = 1;
  let idList = [];
  for(let x of data){
    let id = index;
    if(type) id = x[3];
    idList.push(id);
    result += `
    <tr>
  		<td>${x[0].substr(1)}</td>
  		<td>${x[1].substr(1)}</td>
  		<td>${x[2].substr(1)}</td>
  		<td>${x[3].substr(1)}</td>
  		<td>
  		  <button onclick="downloadFile('${x[4].substr(1)}')" class="icon-btn download">
					<span class="icon">
						<img src="./asset/img/download.png" alt="Download"/ class="iconBlack"/>
						<img src="./asset/img/download-white.png" alt="Download"/ class="iconBlue">
					</span>
			  </button>
  		<td>
  	</tr>
    `
  index++;
  }
  
  table.innerHTML = `
  <tr>
    <th>Name</th>
	  <th>Date of Birth</th>
	  <th>Email</th>
		<th>Document</th>
		<th>Download</th>
	</tr>
	${result}
  `;
  table.style.display = "table";
  loading.style.display = "none";
}

// history
const historySearchLoad = (data) => {
  let search = document.querySelector("#search");

  document.forms["search-form"].onsubmit = (e) => {
    e.preventDefault();
    let finalData = [];
    for(let i = 0; i < data.length; i++){
      if(data[i][0].toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
         data[i][1].toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
         data[i][2].toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
         data[i][3].toLowerCase().indexOf(search.value.toLowerCase()) > -1
      ){
        data[i].push(i);
        finalData.push(data[i]);
      }
    }
    showHistoryData(finalData, 1)
  }
};

const historyLoad = () => {
  let button = document.querySelector("#history");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = page;
    d.post(
      "https://script.google.com/macros/s/AKfycbzLEX8OFSld2y-zSNGCw5oyqVWbqfoKO1kKrJ5n0cHJElKaNIQY0QnAQnLeGrR2eHzD/exec",
      {
        type: 5,
        data: JSON.stringify({
          database: window.d.messege,
          history: window.d.history
        }),
      }
    ).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data } = res;
      if (result) {
        loadAll();
        showHistoryData(data);
        historySearchLoad(data);
        logoutLoad();
      } 
    }).catch(err => {
      console.log(err);
    })
  }
}

const showHistoryData = (data, type = "") => {
  document.querySelector("#history a").classList.add("active");
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let result2 = "";
  let index = 1;
  let idList = [];
  for(let x of data){
    let id = index;
    if(type) id = x[3];
    idList.push(id);
    result += `
    <tr>
  		<td>${x[0].substr(1)}</td>
  		<td>${x[1].substr(1)}</td>
  		<td>${x[2].substr(1)}</td>
  		<td>${x[3].substr(1)}</td>
  	</tr>
    `
  index++;
  }
  
  table.innerHTML = `
    <tr>
      <th>Name</th>
			<th>Date of Birth</th>
			<th>Email</th>
			<th>Document</th>
		</tr>
	${result}
  `;
  table.style.display = "table";
  loading.style.display = "none";
}


const loadAll = () => {
  documentsLoad();
  inboxLoad();
  historyLoad();
}
const logoutLoad = () => {
  let button = document.querySelector("#logout");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = login;
    loginLoad();
  }
}


/*document.getElementById("root").innerHTML = emailPage;
document.body.innerHTML = document.body.innerHTML 
const docShow = async (id) => {
const test = await d.getBlobData64(
  "https://raw.githubusercontent.com/valleyobformdocument/documents/main/" +
   "Test1657363990947.pdf"
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
webViewerLoad()

let _d = convertDataURIToBinary(test.split(",")[1])

PDFViewerApplication.open(_d).then(() => {
  document.getElementById("loading").style.display = "none";
});
}

docShow();
*/

document.querySelector("#body").innerHTML = login;
loginLoad();
