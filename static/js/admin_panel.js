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

function modifyRedflagstatus(event){
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
        <input type="text" id="myInput" onkeyup="getOneRecord()" placeholder="Search for redflag.." title="Enter title">
                    <table id="adminRecordtable">
                    <th> ID </th>
                    <th> ISSUE</th>
                    <th> REPORTED ON </th>
                    <th> CREATED BY</th>
                    <th> IMAGE </th>
                    <th> VIDEO </th>
                    <th> LATITUDE </th>
                    <th> LONGITUDE</th>
                    <th> STATUS </th>
                    
                    <tbody>
                    `;
        let redflags = data["data"];
        
        redflags.forEach(function(redflag){

        output +=`
        
        <tr >
        <td class = "incident-item">${redflag.redflag_id}</td>        
        <td class = "incident-item">${redflag.comment}</td>        
        <td class = "incident-item-0">${redflag.created_on}</td>
        <td class = "incident-item">${redflag.created_by}</td>        
        <td class = "incident-item-1">${redflag.image}</td>
        <td class = "incident-item-2">${redflag.video}</td>
        <td class = "incident-item-3">${redflag.lat}</td>
        <td class = "incident-item-4">${redflag.long}</td>
        <td class = "incident-item-5">${redflag.status} | <span id="myStatusBtn" onclick="show('myModal');">Edit Record status</span></td>
        </tr>
        
        `;
        
        });
            document.getElementById('output').innerHTML = output;
            alert(data.message)
            console.log(data)

        }
        
        alert(data.error)
    })
}
