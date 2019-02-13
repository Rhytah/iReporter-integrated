document.getElementById('login').addEventListener('submit',signinUser)
// let username = document.getElementById('login_username').value
// let password = document.getElementById('psw').value
const login_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/auth/login/';

function signinUser(event) {
    event.preventDefault()
    let username = document.getElementById('login_username').value
    let password = document.getElementById('psw').value

    fetch(login_url, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
    })
    .then((response) => response.json())
        .then((data) => {
            if (data.message == "You have successfully logged in"){
                window.location.replace('./forum.htm')
                localStorage.setItem('token', data.token)
                alert("You have successfully logged in");
            }else{
                alert("Invalid username or password");
            }
        
        })
}
// picking username on sign in
function check(form)
{

if(form.username && password)
 {

alert("Welcome to iReporter");
var userid = document.getElementById('login_username').value;
document.write("Welcome " + userid);

  }
  
  }
