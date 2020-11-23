const boxies  = document.querySelectorAll('.box');
const hidjri  = document.querySelector('.hijri p');
const gre     = document.querySelector('.gre p');
const fajr    = document.querySelector('[data-toggle="Fajr"] p');
const dhuhr   = document.querySelector('[data-toggle="Dhuhr"] p');
const asr     = document.querySelector('[data-toggle="Asr"] p');
const maghrib = document.querySelector('[data-toggle="Maghrib"] p');
const isha    = document.querySelector('[data-toggle="Isha"] p');
const heur    = document.querySelector('.heur');
const min     = document.querySelector('.min');
const sec     = document.querySelector('.sec');
const submit  = document.querySelector('.submit');

setTimeout(time => {getData},2000);

function getData(latitude,longitude){
 let api =`https://api.pray.zone/v2/times/today.json?longitude=${longitude}&latitude=${latitude}&elevation=191`
   fetch(api)
        .then(response=>{
                    let data = response.json();
                    return data;
                    })
        .then(data =>{
        	
        	fajr.innerHTML    = data.results.datetime[0].times.Fajr;
        	dhuhr.innerHTML   = data.results.datetime[0].times.Dhuhr;
            asr.innerHTML     = data.results.datetime[0].times.Asr;
            maghrib.innerHTML = data.results.datetime[0].times.Maghrib;
            isha.innerHTML    = data.results.datetime[0].times.Isha;
            
        	const hijri      = data.results.datetime[0].date.hijri;
        	hidjri.innerHTML = hijri;//.split("").reverse().join("");
            const grego      = data.results.datetime[0].date.gregorian;
            gre.innerHTML    = grego;//.split("").reverse().join("");
        })
        .catch(err => {console.error(err)})
}

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition( setPosition, showError);
}else{
    test.style.display = "block";
    test.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getData(latitude,longitude);
}

function showError(error){
    test.style.display = "block";
    test.innerHTML=`<p> ${error.message} </p>`;
}
function adTime(){
     const date     = new Date();
     heur.innerHTML = date.getHours()  < 10 ? `0${date.getHours()}` : date.getHours();
     min.innerHTML  = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
     const s = date.getSeconds() ;
     sec.innerHTML = s < 10 ? `0${s}` : s
}
setInterval(adTime,1000);
