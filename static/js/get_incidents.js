const get_redflag_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/red-flags/'
const get_intervention_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/interventions/'


document.getElementById('getredflags').addEventListener('click', refreshRedflags);
document.getElementById('getinterventions').addEventListener('click', refreshInterventions);
document.getElementById('flag_search').addEventListener('click',get_one_redflag);
document.getElementById('interven_search').addEventListener('click',get_one_intervention);


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
        let output ='<h2>RedFlags</h2>';
        let redflags = data["data"];
        redflags.forEach(function(redflag){
        output += `
        <ul>
        <li>ID: ${redflag.redflag_id}</li>
        <li>UserID: ${redflag.created_by}</li>
        <li>Date: ${redflag.created_on}</li>
        <li>image: ${redflag.image}</li>
        <li>video: ${redflag.video}</li>
        <li>Latitude: ${redflag.lat}</li>
        <li> Longitude: ${redflag.long}</li>
        <li> Status: ${redflag.status}</li>
        <li> Comment: ${redflag.comment}</li>
        </ul>
        `;
            });
            document.getElementById('output').innerHTML = output;
        }
        console.log(data)
    })
    .catch((error) => console.log(error), invalid.textContent = "Ooops. Something went wrong");
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
            <li>Latitude: ${redflag.lat}</li>
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
        let output1 ='<h2>Interventions</h2>';
        let interventions = data["data"];
        interventions.forEach(function(intervention){
        output1 += `
        <ul>
        <li>ID: ${intervention.intervention_id}</li>
        <li>UserID: ${intervention.created_by}</li>
        <li>Date: ${intervention.created_on}</li>
        <li>image: ${intervention.image}</li>
        <li>video: ${intervention.video}</li>
        <li>Latitude: ${intervention.lat}</li>
        <li> Longitude: ${intervention.long}</li>
        <li> Status: ${intervention.status}</li>
        <li> Comment: ${intervention.comment}</li>
        </ul>
        `;
            });
            document.getElementById('output1').innerHTML = output1;
        }
        console.log(data)
    })
    .catch((error) => console.log(error), invalid.textContent = "Ooops. Something went wrong");
}

function get_one_intervention(e) {
    e.preventDefault();
    let interventionid = document.getElementById('intervention_search').value;
    let intervention_id = parseInt(interventionid);
    console.log(intervention_id);
    if (isNaN(intervention_id)){
        alert("Please insert an ID")
    }
   
    const options = {
        method : 'GET',
        mode : 'cors',
    }
    fetch(get_intervention_url+intervention_id,options)
    .then (res => res.json())
    .then ((data) => {
        if (data.status === 200){
           let intervention = data["data"];
           let  output3 = `<h4>fetched intervention</h4>`
            
            output3 += `
            <br>
            <ul>
            <li>ID: ${intervention.intervention_id}</li>
            <li>UserID: ${intervention.created_by}</li>
            <li>Date: ${intervention.created_on}</li>
            <li>image: ${intervention.image}</li>
            <li>video: ${intervention.video}</li>
            <li>Latitude: ${intervention.lat}</li>
            <li> Longitude: ${intervention.long}</li>
            <li> Status: ${intervention.status}</li>
            <li> Comment: ${intervention.comment}</li>
            </ul>
            
            `;
            
                    console.log(data);
                    document.getElementById('output3').innerHTML= output3; 
                }
            else {
                console.log(data);
                alert ('the record is non existent') 
        }
    })
    .catch(error => console.log(error));
    

}