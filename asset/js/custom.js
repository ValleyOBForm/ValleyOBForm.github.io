import { login } from "../../modules/login.js";
import { userPage } from "../../modules/userPage.js";
import { documentPage } from "../../modules/documentPage.js";
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const loginLoad = () => {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let loginBtn = document.querySelector("#loginBtn");

  document.forms["admin-login-form"].onsubmit = (e) => {
   e.preventDefault();
   loginBtn.disabled = true;
   loginBtn.innerText = "Please Wait..";
   document.querySelector("#login-error").style.display = "none";
    d.post(
      "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
      {
        type: 0,
        data: JSON.stringify({
          userName: username.value.trim(),
          password: password.value,
        }),
      }
    ).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data, messege, backup } = res;
      if (result) {
        document.querySelector("#body").innerHTML = userPage;
        document.querySelector("#backupEmail").value = backup ? backup : "";
        addUserLoad(data);
        window.d.messege = messege;
        window.d.backup = backup;
      } else {
        document.querySelector("#login-error").style.display = "block";
        loginBtn.disabled = false;
        loginBtn.innerText = "Login";
      }
    });
}
};

const showUserData = (data, type = "") => {
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let index = 1;
  let idList = [];
  for(let x of data){
    let id = index;
    if(type) id = x[4];
    idList.push(id);
    result += `
    <tr>
  		<td>${x[0].substr(1)}</td>
  		<td>${x[1].substr(1)}</td>
  		<td>${x[2].substr(1)} days</td>
  		<td>${(x[3] != "x") ? x[3].substr(1) : "-"}</td>
  		<td>
  		  <button id="delete-${id}" class="tb-btn delete">
					<span class="icon"><img src="asset/img/Icon-feather-trash.png" alt="Trash"/></span>
				</button></td>
  	</tr>
    `
    index++;
  }
  
  table.innerHTML = `
  <tr>
		<th>Email</th>
		<th>Password</th>
		<th>History</th>
		<th>IP Address</th>
		<th></th>
	</tr>
	${result}
  `;
  
  for(let x of idList){
    let button = document.querySelector(`#delete-${x}`);
    let row = document.querySelector(`#row-${x}`);
    
    button.onclick = async () => {
      loading.style.display = "block";
      let res = await d.post(
        "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
        {
          type: 4,
          data: JSON.stringify({
            id: x,
            database: window.d.messege,
          }),
        }
      )
     res = JSON.parse(JSON.parse(res).messege);
     showUserData(res.data);
     document.querySelector("#search").value = ""
    }
  }
  table.style.display = "table";
  loading.style.display = "none";
}

const userSearchLoad = (data) => {
  let search = document.querySelector("#search");
  
  document.forms["search-form"].onsubmit = (e) => {
    e.preventDefault();
    let finalData = [];
    for(let i = 0; i < data.length; i++){
      if(data[i][0].indexOf(search.value) > -1){
        data[i].push(i + 1)
        finalData.push(data[i]);
      }
    }
    showUserData(finalData, 1)
  }
};

const backupFormLoad = () => {
  let backup = document.querySelector("#backupEmail");
  let button = document.querySelector("#backupBtn");
  let error = document.querySelector("#backup-error");
  let success = document.querySelector("#backup-success");
  
  document.forms["backupForm"].onsubmit = (e) => {
    e.preventDefault();
    button.innerText = "Processing..";
    error.style.display = "none";
    success.style.display = "none";
    loading.style.display = "block";
    window.d.backup = backup.value.trim();
    d.post(
      "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
      {
        type: 13,
        data: JSON.stringify({
          email: backup.value.trim(),
          database: window.d.messege,
        }),
      }
    ).then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result } = res;
      if (result) {
        button.innerText = "Backup";
        success.innerText = "Successfully set up backup email!"
        success.style.display = 'block';
        loading.style.display = "none";
      } else {
        button.innerText = "Backup";
        error.innerHTML = 'Error Found! Please try again.';
        error.style.display = 'block';
        loading.style.display = "none";
      }
    }).catch(err => {
      console.log(err);
      button.innerText = "Backup";
      error.innerText = 'Error Found! Please try again.';
      error.style.display = "block";
      loading.style.display = "none";
    });
  }
};

const changePasswordLoad = () => {
  let oldPass = document.querySelector("#oldPass");
  let newPass = document.querySelector("#newPass");
  let conNewPass = document.querySelector("#conNewPass");
  let button = document.querySelector("#changePasswordBtn");
  let error = document.querySelector("#changePassword-error");
  let success = document.querySelector("#changePassword-success");
  
  document.forms["changePasswordForm"].onsubmit = (e) => {
    e.preventDefault();
    button.innerText = "Changing..";
    error.style.display = "none";
    success.style.display = "none";
    loading.style.display = "block";
    
    if(newPass.value != conNewPass.value){
      button.innerText = "Change";
      error.innerText = 'Confirm password doesn\'t match.';
      error.style.display = "block";
      loading.style.display = "none";
      return;
    }
    d.post(
      "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
      {
      type: 5,
      data: JSON.stringify({
        oldPass: oldPass.value,
        newPass: newPass.value,
        database: window.d.messege,
      }),
    }
    ).then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, messege } = res;
      if (result) {
        if(messege == "success"){
          button.innerText = "Change";
          success.innerText = "Successfully changed password!"
          success.style.display = 'block';
          loading.style.display = "none";
        } else{
          button.innerText = "Change";
          error.innerHTML = 'Old Password is\'t correct';
          error.style.display = 'block';
          loading.style.display = "none";
        }
      } else {
        button.innerText = "Change";
        error.innerHTML = 'Error Found! Please try again.';
        error.style.display = 'block';
        loading.style.display = "none";
      }
    }).catch(err => {
      console.log(err);
      button.innerText = "Change";
      error.innerText = 'Error Found! Please try again.';
      error.style.display = "block";
      loading.style.display = "none";
    });
  }
}

const addUserLoad = (data) => {
  showUserData(data);
  userSearchLoad(data);
  backupFormLoad();
  changePasswordLoad();
  documentsLoad();
  logoutLoad();
  let email = document.querySelector("#addUserEmail");  
  let password = document.querySelector("#addUserPass");
  let history = document.querySelector("#addUserHistory");  
  let ip = document.querySelector("#addUserIp");
  let button = document.querySelector("#addUserBtn");
  let error = document.querySelector("#adduser-error");
  let success = document.querySelector("#adduser-success");
  let loading = document.querySelector("#loading");
   
  document.forms["userAddForm"].onsubmit = (e) => {
    e.preventDefault();
    button.innerText = "Adding..";
    error.style.display = 'none';
    success.style.display = "none";
    loading.style.display = "block";
    
    d.post(
    "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
    {
      type: 2,
      data: JSON.stringify({
        date: "",
        email: email.value.trim(),
        pass: password.value,
        history: history.value,
        ip: ip.value,
        database: window.d.messege,
      }),
    }
    ).then( async res => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, messege, data } = res;
      if(result){
        if(messege != "success"){
          button.innerText = "Add";
          error.innerHTML = 'User already exist!';
          error.style.display = 'block';
          loading.style.display = "none";
        } else{
          showUserData(data);
          e.target.reset();
          button.innerText = "Add";
          success.innerText = "Successfully added new user!"
          success.style.display = 'block';
          loading.style.display = "none";
        }
      } else{
        console.log(res);
        button.innerText = "Add";
        error.innerHTML = 'Error Found! Please try again.';
        error.style.display = 'block';
        loading.style.display = "none";
      }
    }).catch(err => {
      console.log(err);
      button.innerText = "Add";
      error.innerText = 'Error Found! Please try again.';
      error.style.display = "block";
      loading.style.display = "none";
    });
  };
};

const usersLoad = () => {
  let button = document.querySelector("#users");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = userPage;
    d.post(
      "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
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
        addUserLoad(data);
        document.querySelector("#backupEmail").value = window.d.backup ? window.d.backup : "";
      } 
    }).catch(err => {
      console.log(err);
    })
  }
}

const documentSearchLoad = (data) => {
  let search = document.querySelector("#search");
  
  document.forms["search-form"].onsubmit = (e) => {
    e.preventDefault();
    let finalData = [];
    for(let i = 0; i < data.length; i++){
      if(data[i][1].toLowerCase().indexOf(search.value.toLowerCase()) > -1){
        data[i].push(i);
        finalData.push(data[i]);
      }
    }
    showDocumentData(finalData, 1)
  }
};

const documentsLoad = () => {
  let button = document.querySelector("#documents");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = documentPage;
    d.post(
      "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
      {
        type: 6,
        data: JSON.stringify({
          database: window.d.messege,
        }),
      }
    ).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data } = res;
      if (result) {
        addDocumentLoad(data);
        document.querySelector("#backupEmail").value = window.d.backup ? window.d.backup : "";
      } 
    }).catch(err => {
      console.log(err);
    })
  }
}

const dateCovert = (date) => {
  date = new Date(date);
  return (
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0") +
    "-" +
    date.getFullYear()
  );
};

const showDocumentData = (data, type = "") => {
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
  		<td>${dateCovert(x[0].substr(1))}</td>
  		<td>${x[1].substr(1)}</td>
  		<td>
	    	<button data-toggle="modal" data-target="#iframe${index}" class="tb-btn delete">
			    <span class="icon" style="margin-right: 20px;"><img src="asset/img/view.svg" alt="Trash"/></span>
				</button>
  		</td>
  		<td>
  		  <button id="delete-${id}" class="tb-btn delete">
					<span class="icon"><img src="asset/img/Icon-feather-trash.png" alt="Trash"/></span>
				</button>
			</td>
  	</tr>
    `
    result2 += `
    <div class="modal fade custom-modal show" id="iframe${index}" tabindex="-1" role="dialog" aria-modal="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document" style="
    min-width: 600px;
    width: 100%;
    max-width: 800px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div>

				<div style="padding: 0 50px;" class="modal-body">
					

					<iframe style="min-height: 75vh; margin-bottom: 50px; width: 100%; border: none;" src="./pdf.js/web/viewer.html?fileId=${x[2].substr(1)}" class="custom-form-sec">
					
					</iframe><!-- custom-form-sec -->

				</div><!-- modal-body -->
			</div>
		</div>
	</div>
    `
  index++;
  }
  
  table.innerHTML = `
  <tr>
		<th>Issue Date</th>
		<th>Document Name</th>
		<th></th>
		<th></th>
	</tr>
	${result}
  `;
  table.style.display = "table";
  let div;
  if(document.querySelector("#iframeDiv")){
    div = document.querySelector("#iframeDiv");
    div.innerHTML = result2;
  } else{
    div = document.createElement("div");
    div.setAttribute("id", "iframeDiv");
    div.innerHTML = result2;
    document.querySelector("#body").appendChild(div);
  }
  
  for(let x of idList){
    let button = document.querySelector(`#delete-${x}`);
    
    button.onclick = async () => {
      loading.style.display = "block";
      let res = await d.post(
        "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
        {
          type: 9,
          data: JSON.stringify({
            id: x,
            database: window.d.messege,
          }),
        }
      )
     res = JSON.parse(JSON.parse(res).messege);
     showDocumentData(res.data);
     document.querySelector("#search").value = ""
    }
  }
  loading.style.display = "none";
}

const addDocumentLoad = (data) => {
  showDocumentData(data);
  documentSearchLoad(data);
  backupFormLoad();
  changePasswordLoad();
  usersLoad();
  logoutLoad();
  let docName = document.querySelector("#addDocumentName");  
  let file = document.querySelector("#addDocumentFile");
  let button = document.querySelector("#addDocumentBtn");
  let error = document.querySelector("#addDocument-error");
  let success = document.querySelector("#addDocument-success");
  let loading = document.querySelector("#loading");
   
  document.forms["documentAddForm"].onsubmit = async (e) => {
    e.preventDefault();
    button.innerText = "Adding..";
    error.style.display = 'none';
    success.style.display = "none";
    loading.style.display = "block";
    
    if (file.files[0].type != "application/pdf") {
      button.innerText = "Add";
      error.innerHTML = 'Only PDF files may be uploaded.';
      error.style.display = 'block';
      loading.style.display = "none";
      return;
    } 
    let fileData64 = await d.readFiles(file.files[0]);
    fileData64 = fileData64[0];
    const auth = "Z2hwXzRvQ2FCVmhRMU5wWjRIR3E4MmxqOVJXU2JyaTRtNDM3ekhQTA==";
    const octokit = new Octokit({
        auth: window.atob(auth),
      });
      
    let fileId = docName.value.replace(/ /g, "-") + new Date().getTime() + ".pdf";
    let spitBase = fileData64.split(",");
    //let type = spitBase[0].split(";")[0].replace("data:", "");
    let uploadedFile = await octokit.request(
      "PUT /repos/valleyobformdocument/documents/contents/" +
        fileId,
      {
        owner: "OWNER",
        repo: "REPO",
        path: "PATH",
        message: docName.value + " uploaded!",
        committer: {
          name: "ValleyOBForm",
          email: "valleyobform@gmail.com",
        },
        content: spitBase[1],
      }
    );
    d.post(
    "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec",
    {
      type: 7,
      data: JSON.stringify({
        date: "",
        fileName: docName.value,
        fileId: fileId,
        database: window.d.messege,
      }),
    }
    ).then(async res => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data} = res;
      if(result){
        showDocumentData(data);
        e.target.reset();
        button.innerText = "Add";
        success.innerText = "Successfully added new document!"
        success.style.display = 'block';
        loading.style.display = "none";
      } else{
        console.log(res);
        button.innerText = "Add";
        error.innerHTML = 'Error Found! Please try again.';
        error.style.display = 'block';
        loading.style.display = "none";
      }
    }).catch(err => {
      console.log(err);
      button.innerText = "Add";
      error.innerText = 'Error Found! Please try again.';
      error.style.display = "block";
      loading.style.display = "none";
    });
  };
};

const logoutLoad = () => {
  let button = document.querySelector("#logout");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = login;
    loginLoad();
  }
}

document.querySelector("#body").innerHTML = login;
loginLoad();


