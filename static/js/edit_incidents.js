// document.getElementById('save_edits').addEventListener('submit',modifyLocation);

// const edit_redflag_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/red-flags/'
// const edit_intervention_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/interventions/'
// document.getElementById("unseenid").value = selectedRow.cells[7].innerHTML;





// let urlEdit = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/interventions/'


// function modifyLocation (event) {
//     event.preventDefault();
//     localStorage.setItem("intervention_id")
//     let newrecord_id = localStorage.getItem("intervention_id");
//     // let newrecordCurrentType = localStorage.getItem("incidentDataCurrentType")
//     let newlat =document.getElementById('edit_location_latitude').value;
//     let newlong =document.getElementById('edit_location_longitude').value;
//         let newlocation = {
//             lat:newlat,
//             long:newlong
//         }
//     console.log(newlocation);
//     fetch(urlEdit+ "/" + `${newrecord_id}` + "/" .concat("location"),
//     {
//         method: 'PATCH',
//         mode: 'cors',
//         headers: {
//                     'Content-type': 'application/json',
//                     "Authorization": localStorage.getItem("token"),
//                 },
//         body: JSON.stringify({
//             newlocation
//         })
//     })
//     .then((res) => res.json())
//     .then((data) => {
//         if (data.status == 200){
//             // document.getElementById('intervention_location_latitude').innerHTML=
  
//         }
//         else {
//             alert(data.error)
//         }
//         console.log(data)
//     })
    
//     .catch((err) => console.log(err))
// }