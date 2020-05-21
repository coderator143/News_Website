function getClock(){
    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    var hour= new Date().getHours();
    var minutes= new Date().getMinutes();
    var seconds = new Date().getSeconds();
     
    var months=['January','February','March','April','May','June','July','August','September','October','November','December'];

document.querySelector('.date').textContent = date;
document.querySelector('.month').textContent = months[month];
document.querySelector('.year').textContent = year;
document.querySelector('.hour').textContent = hour;
document.querySelector('.minutes').textContent = minutes;
document.querySelector('.seconds').textContent = seconds;
}

getClock();
setInterval(getClock,1000);