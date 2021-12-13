var team = window.localStorage.getItem('teams'); 
var logos = document.querySelectorAll(".logos img"); 
var date = window.localStorage.getItem('date'); 

var logo1 = document.querySelector('.team-logos'); 

var ctnLogo = document.querySelector('.logos'); 


const chart = document.getElementById("lineChart"); 

const team11 = document.querySelector("#team1").innerHTML; 
console.log(team11)
// const team11 = document.getElementById("team1");
var firstQ1 = document.getElementById("first1").innerHTML; 
var secondQ1 = document.getElementById("second1").innerHTML; 
var thirdQ1 = document.getElementById("third1").innerHTML; 
var fourthQ1 = document.getElementById("fourth1").innerHTML; 

firstQ1 = parseInt(firstQ1)
secondQ1 = parseInt(secondQ1)
thirdQ1 = parseInt(thirdQ1)
fourthQ1 = parseInt(fourthQ1)

var totalPoints1 = firstQ1 + secondQ1 + thirdQ1 + fourthQ1


const team22 = document.querySelector("#team2").innerHTML; 
console.log(team22)

// const team22 = document.getElementById("team2");
var firstQ2 = document.getElementById("first2").innerHTML; 
var secondQ2 = document.getElementById("second2").innerHTML; 
var thirdQ2 = document.getElementById("third2").innerHTML; 
var fourthQ2 = document.getElementById("fourth2").innerHTML; 

firstQ2 = parseInt(firstQ2)
secondQ2 = parseInt(secondQ2)
thirdQ2 = parseInt(thirdQ2)
fourthQ2 = parseInt(fourthQ2)

var totalPoints2 = firstQ2 + secondQ2 + thirdQ2 + fourthQ2





function a (){
  if( window.localStorage ){
    if( !localStorage.getItem('firstLoad')){
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  else
      localStorage.removeItem('firstLoad');
  }
}

    var team1 = team.substring(0, team.indexOf(','));
    var team2 = team.substring(team.indexOf(',') + 1, team.length)



logos.forEach((list, index) => {
    if(logos[index].alt != team1 && logos[index].alt != team2){
            // console.log(logos[index].alt)
            logos[index].style.display = "none"
            // localStorage.clear(); 
        
    }
    logos[index].addEventListener('mouseover', ()=>{
      if(logos[index].style.opacity = "1"){
        ctnLogo.style.position = 'relative'
        // logos[index].style.position = 'relative'
        console.log(logos[index])
        var imageOverlay = document.createElement('div'); 
        var imageDesc = document.createElement('p'); 
        var spanDesc = document.createElement('span'); 
        imageOverlay.className = 'image-overlay'; 
        imageDesc.className = 'image-desc'; 
        spanDesc.className = 'span-desc'; 

        if(totalPoints1 > totalPoints2){
          imageDesc.innerHTML += `WINNER: ${team11} <br>`
          spanDesc.innerHTML += `${totalPoints1} - ${totalPoints2}`

        } else {
          imageDesc.innerHTML += `WINNER: ${team22} <br>`
          spanDesc.innerHTML += `${totalPoints2} - ${totalPoints1}`

        }
        winningTeam = localStorage.getItem('winner'); 
        loserTeam = localStorage.getItem('loser'); 

        
        imageOverlay.appendChild(imageDesc);
        imageOverlay.appendChild(spanDesc); 

        logos[index].after(imageOverlay); 
        console.log(imageOverlay)


        imageOverlay.style.position = 'absolute'; 
        imageOverlay.style.width = '100%'; 
        imageOverlay.style.height = '100%'; 
        imageOverlay.style.maxHeight = '200px'; 
        imageOverlay.style.top = '0'
        imageOverlay.style.left = '0'
        imageOverlay.style.color = 'black'; 
        
      }
      
    })
})




const DATA_COUNT = 4;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max:70}; 

const data = {
  labels: ["First", "Second", "Third", "Fourth"], 
  datasets: [
    {
      label: team11, 
      data: [firstQ1, secondQ1, thirdQ1, fourthQ1], 
      backgroundColor: "blue",
      borderColor: "lightblue",
      fill:false, 
      lineTension: 0, 
      pointRadius: 5
    }, 
    {
      label: team22, 
      data: [firstQ2, secondQ2, thirdQ2, fourthQ2],
      backgroundColor: "red",
      borderColor: "rgb(255, 134, 113)",
      fill:false, 
      lineTension: 0, 
      pointRadius: 5
    }, 
  ]
}; 

let lineChart = new Chart(chart, {
  type: 'line', 
  data:data, 
  options: {
    responsive: true, 
    plugins: {
      legend: {
        position: 'bottom', 
      }, 
      title: {
        display: true, 
        text: 'Quaterly Scores'
      }
    }
  },
})







function clickDate(){
  localStorage.clear(); 
}

function showTable1(){
    // a(); 
    table = document.querySelector('.boxscore'); 
    table.style.visibility = "visible"    
}

function back1(){
    window.location.replace(`/stats?date=${date}`)
    localStorage.clear(); 

}
