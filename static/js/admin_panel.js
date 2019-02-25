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
    let statusresponse=document.getElementById('invalid');
        
    let newStatus =document.getElementById('newRedflgStatus').value;

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
        statusresponse.innerHTML="You have changed status"
        
        
    }else if(data.status === 404){
        statusresponse.innerHTML=data.message
    }
    else if (data.status === 401){
        statusresponse.innerHTML=data.msg
    }
    else if(data.status === 400){
        statusresponse.innerHTML=data.error
        
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
        let output =`
         <table id="recordtable">
        <caption>RedFlags</caption>
        <th scope="col"> COMMENT</th>
        <th scope="col"> REPORTED ON </th>
        <th scope="col"> IMAGE </th>
        <th scope="col"> VIDEO </th>
        <th scope="col"> LATITUDE </th>
        <th scope="col"> LONGITUDE</th>
        <th scope="col"> STATUS </th>
        <th scope="col"> UPDATE STATUS</th>
        <tbody>
                    `;
        let redflags = data["data"];
        
        redflags.forEach(function(redflag){

        output +=`
        
        <tr >
        <td class = "incident-item-5" scope="row" data-label="ID">${redflag.redflag_id}</td>
<td class = "incident-item" scope="row" data-label="COMMENT">${redflag.comment}</td>        
<td class = "incident-item-0" scope="row" data-label="DATE">${redflag.created_on}</td>
<td class = "incident-item-1" scope="row" data-label="IMAGE">${redflag.image}</td>
<td class = "incident-item-2" scope="row" data-label="VIDEO">${redflag.video}</td>
<td class = "incident-item-3" scope="row" data-label="LATITUDE">${redflag.lat}</td>
<td class = "incident-item-4" scope="row" data-label="LONGITUDE">${redflag.long}</td>
<td class = "incident-item-5" scope="row" data-label="STATUS">${redflag.status}  | <span id="modifybtns" onClick="document.getElementById('myModal').style.display='block'"><img src="../static/images/edit.png" ></span> </td>
<td >
</td>
</tr>

        
        `;
        
        });
            document.getElementById('output').innerHTML = output;
    
        }else {
            document.getElementById('output').innerHTML = data.error;

        }
        
    })
}


function refreshInterventionsAdmin(){
    fetch(get_intervention_url, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.status === 200){
        let output =`
         <table id="recordtable">
        <caption>interventions</caption>
        <th scope="col"> COMMENT</th>
        <th scope="col"> REPORTED ON </th>
        <th scope="col"> IMAGE </th>
        <th scope="col"> VIDEO </th>
        <th scope="col"> LATITUDE </th>
        <th scope="col"> LONGITUDE</th>
        <th scope="col"> STATUS </th>
        <th scope="col"> UPDATE STATUS</th>
        <tbody>
                    `;
        let interventions = data["data"];
        
        interventions.forEach(function(intervention){

        output +=`
        
        <tr >
        <td class = "incident-item-5" scope="row" data-label="ID">${intervention.intervention_id}</td>
<td class = "incident-item" scope="row" data-label="COMMENT">${intervention.comment}</td>        
<td class = "incident-item-0" scope="row" data-label="DATE">${intervention.created_on}</td>
<td class = "incident-item-1" scope="row" data-label="IMAGE">${intervention.image}</td>
<td class = "incident-item-2" scope="row" data-label="VIDEO">${intervention.video}</td>
<td class = "incident-item-3" scope="row" data-label="LATITUDE">${intervention.lat}</td>
<td class = "incident-item-4" scope="row" data-label="LONGITUDE">${intervention.long}</td>
<td class = "incident-item-5" scope="row" data-label="STATUS">${intervention.status}  | <span id="modifybtns" onClick="document.getElementById('myModal2').style.display='block'"><img src="../static/images/edit.png" ></span> </td>
<td >
</td>
</tr>

        
        `;
        
        });
            document.getElementById('output5').innerHTML = output;
    
        }else {
            document.getElementById('output5').innerHTML = data.error;

        }
        
    })
}

function modifyInterventionStatus(id){
    let intervention_id = document.getElementById('interventionId').value;
    let statusresponse=document.getElementById('invalid');
        
    let newStatus =document.getElementById('newStatus').value;

fetch(get_intervention_url+intervention_id+'/status',{
    method:'PATCH',
    mode: 'cors',
    headers: {'Content-Type': 'application/json', 'Authorization': "Bearer "+ authorization_header_admin },
    body : JSON.stringify({"status":newStatus})
})
.then (response => response.json())
.then((data) => {
    if(data.status ===200){
        window.location.reload()
        statusresponse.innerHTML="You have changed status"
        
        
    }else if(data.status === 404){
        statusresponse.innerHTML=data.message
    }
    else if (data.status === 401){
        statusresponse.innerHTML=data.msg
    }
    else if(data.status === 400){
        statusresponse.innerHTML=data.error
        
    }

})

}