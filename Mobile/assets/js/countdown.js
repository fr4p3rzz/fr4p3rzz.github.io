// Set the date we're counting down to
let countDownDate = new Date("Dec 31, 2077 00:00:00").getTime();

// Update the count down every 1 second
let x = setInterval(function() {

  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownDate - now;

  if(distance >= 0)
  {
    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);


    // Display the result in the element with id="demo"
    document.getElementById("countdown").innerHTML = "Heating up engines:  " + days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  }
  else 
  {
    // If the count down is finished, write some text
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "REJOYCE, MY FRIENDS";
  }
}, 1000);