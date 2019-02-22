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
        let output =`<h2>RedFlags</h2>
        <input type="text" id="myInput" onkeyup="filterComments()" placeholder="Search redflags using comments.." title="Type in a name">    
                    `;
        let redflags = data["data"];
        
        redflags.forEach(function(redflag){

        output +=`
        <ol>
        <li><p>${redflag.comment} <span id="dots">...</span><span id="more">
        <br>
        Creation Date: ${redflag.created_on}<br>
        Reported from: ${redflag.lat},{redflag.long}<br>
         Evidence:${redflag.image},${redflag.video}<br>
         Current status: ${redflag.status}<br>
        <span id="unseenid">${redflag.redflag_id}</span><br>
        <span onClick="deleteRedflag(${redflag.redflag_id});"><img src="../static/images/delete.png"></span></span></p>
        <button onclick="expandDetails()" id="myBtn">Read more</button>
    </li>
        `;

            
        });
            document.getElementById('output').innerHTML = output;
            document.getElementById('msg').innerHTML = data.message           
          
        }else{
            document.getElementById('msg').innerHTML = data.error           
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
        let output1 =`<h2>Interventions</h2>
        <input type="text" id="myInput" onkeyup="filterComments()" placeholder="Search interventions using comments.." title="Type in a name">  
        
        `;
        let interventions = data["data"];
        interventions.forEach(function(intervention){
        output1 += `
        
        
        <ol>
        <li><p>${intervention.comment} <span id="dots">...</span><span id="more">
        <br>
        Creation Date: ${intervention.created_on}<br>
        Reported from: ${intervention.lat},{redflag.long}<br>
         Evidence:${intervention.image},${intervention.video}<br>
         Current status: ${intervention.status}<br>
        <span id="unseenid">${intervention.redflag_id}</span><br>
        <span onClick="deleteRedflag(${intervention.redflag_id});"><img src="../static/images/delete.png"></span></span></p>
        <button onclick="expandDetails()" id="myBtn">Read more</button>
    </li>
           
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
