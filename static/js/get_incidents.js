const get_redflag_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/red-flags/'
const get_intervention_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/interventions/'

function refreshRedflags(){
    // let invalid = document.getElementById('invalid');
 
    fetch(get_redflag_url, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.status === 200){
        let output =`
        <input type="text" id="myInput" onkeyup="getOneRecord()" placeholder="Search for redflag.." title="Enter title">
        <table id="recordtable">
        <caption>RedFlags</caption>
        <th scope="col"> COMMENT</th>
        <th scope="col"> REPORTED ON </th>
        <th scope="col"> IMAGE </th>
        <th scope="col"> VIDEO </th>
        <th scope="col"> LATITUDE </th>
        <th scope="col"> LONGITUDE</th>
        <th scope="col"> STATUS </th>
        <th scope="col">SUBMIT EDITS</th>
        <tbody>
        `;
let redflags = data["data"];

redflags.forEach(function(redflag){

output +=`

<tr >
<td class = "incident-item" scope="row" data-label="COMMENT">${redflag.comment}</td>        
<td class = "incident-item-0" scope="row" data-label="DATE">${redflag.created_on}</td>
<td class = "incident-item-1" scope="row" data-label="IMAGE">${redflag.image}</td>
<td class = "incident-item-2" scope="row" data-label="VIDEO">${redflag.video}</td>
<td class = "incident-item-3" scope="row" data-label="LATITUDE">${redflag.lat}</td>
<td class = "incident-item-4" scope="row" data-label="LONGITUDE">${redflag.long}</td>
<td class = "incident-item-5" scope="row" data-label="STATUS">${redflag.status}</td>
<td id="modifybtns"><a onClick="show('editsection1')"><img src="../static/images/edit.png" ></a> 
<span onClick="deleteRedflag(${redflag.redflag_id});"><img src="../static/images/delete.png" ></span>
</td>
<td id="unseenid">${redflag.redflag_id}</td>
</tr>

`;


});
document.getElementById('output').innerHTML = output;


}else{
document.getElementById('msg').innerHTML=data.error
}

})
}
    

// fetch interventions
function refreshInterventions(){

    fetch(get_intervention_url, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.status === 200){
        let output1 =`
        <input type="text" id="myInput" onkeyup="getOneRecord()" placeholder="Search for intervention.." title="Enter title">
                <table id="recordtable" style="overflow-x:auto;">
                <caption>Interventions</caption>
                <th scope="col"> COMMENT</th>
                <th scope="col"> REPORTED ON </th>
                <th scope="col"> IMAGE </th>
                <th scope="col"> VIDEO </th>
                <th scope="col"> LATITUDE </th>
                <th scope="col"> LONGITUDE</th>
                <th scope="col"> STATUS </th>
                <th scope="col"> SUBMIT EDITS<th>
                <tbody>
        `;
        let interventions = data["data"];
        interventions.forEach(function(intervention){
        output1 += `
        <tr >
        <td class = "incident-item" data-label="COMMENT">${intervention.comment}</td>        
        <td class = "incident-item-0" data-label="DATE">${intervention.created_on}</td>
        <td class = "incident-item-1" data-label="IMAGE">${intervention.image}</td>
        <td class = "incident-item-2" data-label="VIDEO">${intervention.video}</td>
        <td class = "incident-item-3" id="modifylat" data-label="LATITUDE">${intervention.lat}</td>
        <td class = "incident-item-4" id="modifylong" data-label="LONGITUDE">${intervention.long}</td>
        <td class = "incident-item-5" data-label="STATUS">${intervention.status}</td>
        <td id="modifybtns">
        <a onClick="show('editsection')"><img src="../static/images/edit.png" height="30px" width="30px"></a> |
        <span onClick="deleteIntervention(${intervention.intervention_id});">
        <img src="../static/images/delete.png" height="30px" width="30px"></span></td>
        </tr>
           
        `;
        let an_intervention=intervention['intervention_id'];
        localStorage.setItem("single_intervention",an_intervention);
        let posted_intervention= localStorage.getItem("single_intervention");
        let posted_icomment=intervention['comment'];
        localStorage.setItem("resultintvn_comment", posted_icomment);
        console.log(posted_intervention);
            });
    
            document.getElementById('output1').innerHTML = output1; 
         
        }
             
    })
    
}


// 
function getOneRecord() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("recordtable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }


function modifyLocation(event){
    let required_id = localStorage.getItem("single_intervention");
        
    let lat =document.getElementById('edit_location_latitude').value;
    let long =document.getElementById('edit_location_longitude').value;
    
fetch(get_intervention_url+required_id+'/location',{
    method:'PATCH',
    mode: 'cors',
    headers :{'Content-Type':'application/json'},
    body : JSON.stringify({"lat":lat, "long":long})
})
.then (response => response.json())
.then((data) => {
    if(data.message ==="You have changed intervention's location"){
        textContent = '' + data.message
        alert(textContent);
        console.log(data)
        window.location.reload()
    }else{
        alert(data.error)
    }
})

}


function modifyInterventionComment(event){
    let requiredcomment_id = localStorage.getItem("single_intervention");
    
        
    let newComment =document.getElementById('modify-icomment').value;
    console.log(requiredcomment_id)
    console.log(newComment)
fetch(get_intervention_url+requiredcomment_id+'/comment',{
    method:'PATCH',
    mode: 'cors',
    headers :{'Content-Type':'application/json'},
    body : JSON.stringify({"comment":newComment})
})
.then (response => response.json())
.then((data) => {
    if(data.status ===200){
        textContent = '' + data.message
        alert(textContent);
       
        console.log(data)
        window.location.reload()
    }else{
        alert(data.error)
    }
})

}

// redflags


function modifyLocationrf(event){
    let required_id_redflag = localStorage.getItem("single_redflag");
        
    let newlat =document.getElementById('edit_location_latitude_redflag').value;
    let newlong =document.getElementById('edit_location_longitude_redflag').value;
    
fetch(get_redflag_url+required_id_redflag+'/location',{
    method:'PATCH',
    mode: 'cors',
    headers :{'Content-Type':'application/json'},
    body : JSON.stringify({"lat":newlat, "long":newlong})
})
.then (response => response.json())
.then((data) => {
    if(data.status ===200){
        textContent = '' + data.message
        alert(textContent);
        console.log(data)
        window.location.reload()
    }else{
        alert(data.error)
    }
})

}


function modifyRedflagComment(){
    let redflagId_comment = localStorage.getItem("single_redflag");

    let newCommentredflag = document.getElementById('modify-rfcomment').value;
    console.log(newCommentredflag)
fetch(get_redflag_url+redflagId_comment+'/comment',{
    method:'PATCH',
    mode: 'cors',
    headers :{'Content-Type':'application/json'},
    body : JSON.stringify({"comment":newCommentredflag})
})
.then (response => response.json())
.then((data) => {
    if(data.status ==200){
        textContent = '' + data.message
        alert(textContent);
       console.log(redflagId_comment)
        console.log(data)
        console.log(newCommentredflag)
        window.location.reload()
    }else{
        alert(data.error)
    }
})

}


function deleteRedflag(redflagId){    

    fetch(get_redflag_url+redflagId, {
        method: 'DELETE',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', 'Authorization':authorization_header}
    })
    .then((response) => response.json())
        .then((data) => {
            if (data.status ===200){
                console.log(data)
                alert(data.message)
            }else{
                alert(data.error)
            }
        })
    }

    function deleteIntervention(interventionId){

        fetch(get_intervention_url+interventionId, {
            method: 'DELETE',
            mode: 'cors',
            headers: {'Content-Type': 'application/json', 'Authorization':authorization_header}
        })
        .then((response) => response.json())
            .then((data) => {
                if (data.status ===200){
                    alert("You are permanently deleting this intervention record")
                    alert(data.message)
                }else{
                    alert(data.error)
                }
            })
        }
