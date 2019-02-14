const get_redflag_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/red-flags/'
const get_intervention_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/interventions/'


// document.getElementById('recordrf').addEventListener('click', refreshRedflags);
// document.getElementById('getinterventions').addEventListener('click', refreshInterventions);
// document.getElementById('flag_search').addEventListener('click',get_one_redflag);
// document.getElementById('interven_search').addEventListener('click',get_one_intervention);
        // document.getElementById('dets').addEventListener('click',showDetails);



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
        </tr>
        
        `
      
            });
            document.getElementById('output').innerHTML = output;
        }
        console.log(data)
    })
    .catch((error) => console.log(error), invalid.textContent = "Ooops. Something went wrong");
}

function showDetails(){
    var a = document.getElementById('dets');
    if(a.style.display == 'none')
    a.style.display= 'block';
    else
    a.style.display= 'none';
}


function get_one_redflag(e) {
    e.preventDefault();
    let redflagid = document.getElementById('redflag_search').value;
    let redflag_id = parseInt(redflagid);
    console.log(redflag_id);
    if (isNaN(redflag_id)){
        alert("Please insert an ID")
    }
    
    const options = {
        method : 'GET',
        mode : 'cors',
    }
    fetch(get_redflag_url+redflag_id,options)
    .then (res => res.json())
    .then ((data) => {
        if (data.status === 200){
           let redflag = data["data"];
        //    let red = redflag[redflag_id];
           let  output2 = `<h4>fetched redflag</h4>`
            
            output2 += `
            <br>
            
            <ul>
            <li>ID: ${redflag.redflag_id}</li>
            <li>UserID: ${redflag.created_by}</li>
            <li>Date: ${redflag.created_on}</li>
            <li>image: ${redflag.image}</li>
            <li>video: ${redflag.video}</li>
            <li id="modify">Latitude: ${redflag.lat}</li>
            <li> Longitude: ${redflag.long}</li>
            <li> Status: ${redflag.status}</li>
            <li> Comment: ${redflag.comment}</li>
            </ul>
            
            `;
            
                    console.log(data);
                    document.getElementById('output2').innerHTML= output2; 
                }
            else {
                console.log(data);
                alert ('the record is non existent') 
        }
    })
    .catch(error => console.log(error));
    

}


// fetch interventions
function refreshInterventions(){
    let invalid = document.getElementById('invalid');
 
    fetch(get_intervention_url, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.message === 'These are the Intervention records'){
        let output1 =`<h2>Interventionss</h2>
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
        <td id="unseenid">${intervention.intervention_id}</td>
        <td><button onclick="show('editsection')">edit</button>
        </td>
        </tr>
           
        `;
            });
            document.getElementById('output1').innerHTML = output1;
        }
        console.log(data)
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