const get_redflag_url = 'https://rhytah-ireporterv2.herokuapp.com/api/v2/red-flags/'

document.getElementById('getredflags').addEventListener('click', refreshRedflags);
function refreshRedflags(){
    let invalid = document.getElementById('invalid');
    let tableBody = document.querySelector('#redflag_records > tbody');

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