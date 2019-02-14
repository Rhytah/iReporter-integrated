document.getElementById('save_edits').addEventListener('submit',modifyLocation);

// const get_redflag_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/red-flags/'
// const get_intervention_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/interventions/'
const redflag_id=document.getElementById('unseenid').value;
const intervention_id=document.getElementById('unseenid').value;



function modifyLocation(event){
    event.preventDefault()
    let lat =document.getElementById('edit_location_latitude').value;
    let long =document.getElementById('edit_location_longitude').value;
    let location = {
        lat:lat,
        long:long
    }
   console.log(location)
fetch(get_intervention_url+intervention_id+'/location',{
    method:'PATCH',
    mode: 'cors',
    headers :{'content_type':'application/json','Authorization':authorization_header},
    body : JSON.stringify(location)
})
.then (res => res.json())
.then((data) => {
    if(data.status === 200){
        textContent = '' + data.message
        alert("You have updated record location")
        document.getElementById("intervention_location_latitude").innerHTML=lat
        document.getElementById("intervention_location_longitude").innerHTML=long

        window.location.reload()
    }else{
        alert(data.error)
    }
    console.log(data)
})
}