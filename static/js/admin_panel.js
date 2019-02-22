const authorization_header_admin =localStorage.getItem('admin_token');

function refreshUsers(){
    let authorization_header_admin =localStorage.getItem('admin_token');
    console.log(authorization_header_admin)
    fetch('https://rhytah-ireporterv2.herokuapp.com/api/v2/auth/users/', {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', 'Authorization': "Bearer "+ authorization_header_admin }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        if(data.status === 200){
        let outputusers =`<h2>users</h2>
                          `;
        let users = data["data"];
        
        users.forEach(function(user){

        outputusers +=`
        <br>
                <b>${user.firstname} ${user.lastname}</b> 
                <br>
        `;
        let a_user=user['user_id'];
        
        });
            document.getElementById('outputusers').innerHTML = outputusers;
        }
        
        alert(data.error)
    })
}

function modifyRedflagstatus(id){
    let status_id = document.getElementById('statusId').value;
    
        
    let newStatus =document.getElementById('newRedflgStatus').value;
    console.log(newStatus)
    console.log(status_id)
fetch(get_redflag_url+status_id+'/status',{
    method:'PATCH',
    mode: 'cors',
    headers: {'Content-Type': 'application/json', 'Authorization': "Bearer "+ authorization_header_admin },
    body : JSON.stringify({"status":newStatus})
})
.then (response => response.json())
.then((data) => {
    if(data.status ===200){

        window.location.reload()
    }else{
        alert(data.error)
    }
})

}

function refreshRedflagsAdmin(){
    fetch(get_redflag_url, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.status === 200){
        let output =`<h2>RedFlags</h2>
                    `;
        let redflags = data["data"];
        
        redflags.forEach(function(redflag){

        output +=`
        
        <ol>
        <li><p>${redflag.comment} <span id="dots">...</span><span id="more">
        <br>
        Creation Date: ${redflag.created_on}<br>
        Reported from: ${redflag.lat},${redflag.long}<br>
         Evidence:${redflag.image},${redflag.video}<br>
         Current status: ${redflag.status}<br>
        <span>${redflag.redflag_id}</span><br>
        <span onClick="modifyRedflagstatus(${redflag.redflag_id});"><img src="../static/images/edit.png"></span></span></p>
        <button onclick="expandDetails()" id="myBtn">Read more</button>
    </li>
        
        
        `;
        
        });
            document.getElementById('output').innerHTML = output;
            alert(data.message)
            console.log(data)

        }
        
        alert(data.error)
    })
}
