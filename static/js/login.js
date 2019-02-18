document.getElementById('login').addEventListener('submit',signinUser)
const users_url='https://rhytah-ireporterv2.herokuapp.com/api/v2/auth/users/';

const login_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/auth/login/';
localStorage.setItem('admin_token', data.token)

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
            if(username === "admin" && password === "sup3rpsW"){
                localStorage.setItem('admin_token', data.token)
                window.location.replace('./admin.htm')
                alert("You have successfully logged in as admin");

            }
            else if(data.message == "You have successfully logged in"){
            alert(data.message)
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', username)

            window.location.replace('./forum.htm')
            }
            else{
                alert(data.error);
            }
        
        })
}
