function login(e) {

  let uname = document.querySelector("#uname").value;
  let psw = document.querySelector("#psw").value;
  let users = localStorage.getItem("users");
  users = users == undefined ? {} : JSON.parse(users);

  if (Object.keys(users).includes(uname) == true) {
    if (users[uname].psw == psw) {
      let currentUser = users[uname];
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = "index.html"
    }
    else {
      alert("הסיסמא או שם המשתמש שגוי");
      window.location.href='open.html';
    }
  }
  else {
      alert("הסיסמא או שם המשתמש שגוי");
      window.location.href='open.html';
  }

};
