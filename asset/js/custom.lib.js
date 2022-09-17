window.d = {
  post(url, data) {
    const form = new FormData();
    for (let x in data) {
      form.append(x, data[x]);
    }
    return fetch(url, {
      method: "POST",
      mode: "cors",
      header: {
        "Content-Type": "application/json",
      },
      body: form,
    }).then((_res) => _res.text());
  },
  get(url) {
    return fetch(url).then((_res) => _res.text());
  },
  readFiles(...files) {
    return new Promise((resolve, reject) => {
      const data = [];
      const _reader = (file) => {
        let reader = new FileReader();
        reader.onload = () => {
          data.push(reader.result);
          if (file == files.length - 1) resolve(data);
          else _reader(++file);
        };
        reader.onerror = reject;
        reader.readAsDataURL(files[file]);
      };
      _reader(0);
    });
  },
  getBlobData64(url) {
    return fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((callback) => {
            let reader = new FileReader();
            reader.onload = function () {
              callback(this.result);
            };
            reader.readAsDataURL(blob);
          })
      );
  },

  // set caret position
  setCaretPosition(e, pos) {
    // Modern browsers
    if (e.setSelectionRange) {
      e.focus();
      e.setSelectionRange(pos, pos);

      // IE8 and below
    } else if (e.createTextRange) {
      var range = e.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  },

  // custom password
  customPasword(password) {
    let $password = ""; // initial password
    let $prePass = ""; // initial pre password

    password.onpaste = (e) => {
      $prePass = e.target.value;
    };

    password.onundo = (e) => {
      e.preventDefault();
    };

    // when user selsect from password field
    const _password = {
      start: 0,
      end: 0,
      status: false,
    };

    password.onselect = (e) => {
      _password.status = true;
      _password.end = e.target.selectionEnd;
      _password.start = e.target.selectionStart;
    };

    // custom password generate when user input and store orinial value in $password.
    password.oninput = (e) => {
      //console.log(e.target.selectionStart, e.target.selectionEnd);
      if (e.inputType == "historyUndo") return;
      if (
        e.inputType == "insertText" ||
        e.inputType == "insertCompositionText"
      ) {
        if (_password.status) {
          $password =
            $password.substr(0, _password.start) +
            e.data +
            $password.substr(_password.end);
        } else {
          $password =
            $password.substr(0, e.target.selectionStart - 1) +
            e.data +
            $password.substr(e.target.selectionStart - 1);
        }
        let start = e.target.selectionStart;
        let value = e.target.value;
        let result = "";
        for (let i of value) {
          result += "•";
        }
        e.target.value = result;
        d.setCaretPosition(e.target, start);
        _password.status = false;
        //console.log($password);
        return;
      }

      if (e.target.value.length != e.target.selectionStart) {
        $prePass = $prePass.slice(
          0,
          $prePass.length - e.target.value.length + e.target.selectionStart
        );
        $prePass = e.target.value
          .slice(0, -e.target.value.length + e.target.selectionStart)
          .substr($prePass.length);
      } else if (e.inputType == "insertFromPaste") {
        if (_password.status) {
          if (_password.end <= e.target.value.length) {
            _password.end = e.target.selectionStart;
          }
          $prePass = e.target.value.substr(_password.start, _password.end);
          ///console.log("-", $prePass);
        } else $prePass = e.target.value.substr($prePass.length);
      }

      if ($prePass) {
        if (_password.status) {
          if (e.target.selectionStart <= _password.start) {
            _password.start = e.target.selectionStart;
          }
          $password =
            $password.substr(0, _password.start) +
            $prePass +
            $password.substr(_password.end);
        } else {
          $password =
            $password.substr(0, e.target.selectionStart - $prePass.length) +
            $prePass +
            $password.substr(e.target.selectionStart - $prePass.length);
        }
      } else {
        $password =
          $password.substr(0, e.target.selectionStart) +
          $password.substr(
            e.target.selectionStart + ($password.length - e.target.value.length)
          );
      }

      $prePass = "";
      let start = e.target.selectionStart;
      let value = e.target.value;
      let result = "";
      for (let i of value) {
        result += "•";
      }
      e.target.value = result;
      d.setCaretPosition(e.target, start);

      _password.status = false;

      //console.log($password);
    };

    return {
      $password() {
        return $password;
      },
    };
  },
};
