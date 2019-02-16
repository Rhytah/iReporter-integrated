const get_redflag_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/red-flags/'
const get_intervention_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/interventions/'
document.getElementById('save_edits').addEventListener('click',modifyLocation);


function refreshRedflags(){
    let invalid = document.getElementById('invalid');
 
    fetch(get_redflag_url, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.message === 'These are the recorded red-flags'){
        let output =`<h2>RedFlags</h2>
        <input type="text" id="myInput" onkeyup="getOneRecord()" placeholder="Search for redflag.." title="Enter title">
                    <table id="recordtable">
                    <th> ISSUE</th>
                    <th> REPORTED ON </th>
                    <th> IMAGE </th>
                    <th> VIDEO </th>
                    <th> LATITUDE </th>
                    <th> LONGITUDE</th>
                    <th> STATUS </th>
                    <th>SUBMIT EDITS</th>
                    <tbody>
                    `;
        let redflags = data["data"];
        redflags.forEach(function(redflag){

        output +=`
        
        <tr >
        <td class = "incident-item">${redflag.comment}</td>        
        <td class = "incident-item-0">${redflag.created_on}</td>
        <td class = "incident-item-1">${redflag.image}</td>
        <td class = "incident-item-2">${redflag.video}</td>
        <td class = "incident-item-3">${redflag.lat}</td>
        <td class = "incident-item-4">${redflag.long}</td>
        <td class = "incident-item-5">${redflag.status}</td>
        <td id="modifybtns"><a onClick="show('editsection')">edit</a> |<a>delete</a>

        </tr>
        
        `
      
            });
            document.getElementById('output').innerHTML = output;
            
        }
        alert(data.error)
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
        if(data.message === 'These are the Intervention records'){
        let output1 =`<h2>Interventions</h2>
        <input type="text" id="myInput" onkeyup="getOneRecord()" placeholder="Search for intervention.." title="Enter title">

                <table id="recordtable" style="overflow-x:auto;">
                <th> ISSUE</th>
                <th> REPORTED ON </th>
                <th> IMAGE </th>
                <th> VIDEO </th>
                <th> LATITUDE </th>
                <th> LONGITUDE</th>
                <th> STATUS </th>
                <th> SUBMIT EDITS<th>
                <tbody>
        
        `;
        let interventions = data["data"];
        interventions.forEach(function(intervention){
        output1 += `
        
        
        <tr >
        <td class = "incident-item" id="comm">${intervention.comment}</td>        
        <td class = "incident-item-0">${intervention.created_on}</td>
        <td class = "incident-item-1">${intervention.image}</td>
        <td class = "incident-item-2">${intervention.video}</td>
        <td class = "incident-item-3" id="modifylat">${intervention.lat}
       
        </td>
        <td class = "incident-item-4" id="modifylong">${intervention.long}
        </td>

        <td class = "incident-item-5">${intervention.status}</td>
        <td id='unseenid'>${intervention.intervention_id}</td>
        <td id="modifybtns"><a onClick="show('editsection')">edit</a> |<a>delete</a>
        </td>
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
        alert(data.error)
             
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
        document.getElementById("intervention_location_latitude").innerHTML=lat
        document.getElementById("intervention_location_longitude").innerHTML=long
        console.log(data)
        window.location.reload()
    }else{
        alert(data.error)
    }
})

}

