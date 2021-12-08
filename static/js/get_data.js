var team = window.localStorage.getItem('teams'); 
var logos = document.querySelectorAll(".logos img"); 
var date = window.localStorage.getItem('date'); 



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
})




const chart = document.getElementById("lineChart"); 

const team11 = document.querySelector("#team1").innerHTML; 

// const team11 = document.getElementById("team1");
var firstQ1 = document.getElementById("first1").innerHTML; 
var secondQ1 = document.getElementById("second1").innerHTML; 
var thirdQ1 = document.getElementById("third1").innerHTML; 
var fourthQ1 = document.getElementById("fourth1").innerHTML; 

firstQ1 = parseInt(firstQ1)
secondQ1 = parseInt(secondQ1)
thirdQ1 = parseInt(thirdQ1)
fourthQ1 = parseInt(fourthQ1)


const team22 = document.querySelector("#team2").innerHTML; 

// const team22 = document.getElementById("team2");
var firstQ2 = document.getElementById("first2").innerHTML; 
var secondQ2 = document.getElementById("second2").innerHTML; 
var thirdQ2 = document.getElementById("third2").innerHTML; 
var fourthQ2 = document.getElementById("fourth2").innerHTML; 

firstQ2 = parseInt(firstQ2)
secondQ2 = parseInt(secondQ2)
thirdQ2 = parseInt(thirdQ2)
fourthQ2 = parseInt(fourthQ2)

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





function showTable1(){
    // a(); 
    table = document.querySelector('.boxscore'); 
    table.style.visibility = "visible"    
}

function back1(){
    window.location.replace(`http://127.0.0.1:5000/stats?date=${date}`)
    localStorage.clear(); 

}
