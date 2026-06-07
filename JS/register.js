function register(e) {


    let uname = document.querySelector("#uname").value;
    let psw = document.querySelector("#psw").value;
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let newUser = {
        uname: uname,
        psw: psw,
        firstName: firstName,
        lastName: lastName,
        level:0
    }
    let users = localStorage.getItem("users");
    users = users == undefined ? {} : JSON.parse(users);

    if (Object.keys(users).includes(uname) == false) {
        users[uname] = newUser;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
       localStorage.setItem('isLoggedIn', 'true');
       window.location.href = "index.html"
    }
    else {
        alert("user exist");
    }
};
