var winners = document.querySelector(".winners").innerHTML.trim(); 
var losers = document.querySelector(".losers").innerHTML.trim(); 
var winnerCode = document.querySelector(".winnerCode").innerHTML.trim(); 
var loserCode = document.querySelector(".loserCode").innerHTML.trim(); 
var logos = document.querySelectorAll(".logos img"); 
var logos1 = document.querySelector(".logos img"); 
var gameBut = document.querySelector("#game-but"); 
var btn = document.querySelector('#table-but'); 
var date = document.querySelector(".data h2"); 

var gamesPlayed = document.getElementById("no-games"); 
var seeDataBtn = document.getElementById("date-but2"); 

var leftBtn = document.getElementById("left-but"); 
localStorage.setItem('date', date.innerHTML); 



function back(){
    location.reload(); 
}

// leftBtn.addEventListener('click', ()=>{
//     console.log(window.location.href)
//     var currentDate = localStorage.getItem('date') 
//     var year = currentDate.substring(0, 4)
//     var month = currentDate.substring(5, 7)
//     var day = currentDate.substring(8, 10)
//     month = parseInt(month)
//     day = parseInt(day)
//     console.log(day)
//     var d = new Date(); 
//     console.log(d)
//     while(!gamesPlayed){
//         day = day - 1
//         if(day < 10){
//             if(month < 10){
//                 // var day2 = day.toString()
//                 day2 = "0" + day.toString()
//                 month2 = "0" + month.toString()
//                 var url = `http://127.0.0.1:5000/stats?date=${year}-${month2}-${day2}`
//                 console.log(url)
//                 window.location.href = url 
//                 break; 
//             }
//         } else {
//             var url = `http://127.0.0.1:5000/stats?date=${year}-${month}-${day}`
//             print(day.length)
//             console.log(url)
//             window.location.href = url 
//             break; 
//         }
//         break; 
        
//     }
    
// })

for(let i = 0; i < winners.length; i++){
    if (winners.charAt(i) == '[' || winners.charAt(i) == ']'){
        winners = winners.substring(0, i) + winners.substring(i + 1)
    }
    if (winnerCode.charAt(i) == '[' || winnerCode.charAt(i) == ']'){
        winnerCode = winnerCode.substring(0, i) + winnerCode.substring(i + 1)
    }

}

for(let i = 0; i < losers.length; i++){
    if (losers.charAt(i) == '[' || losers.charAt(i) == ']'){
        losers = losers.substring(0, i) + losers.substring(i + 1)
    }
    if (loserCode.charAt(i) == '[' || loserCode.charAt(i) == ']'){
        loserCode = loserCode.substring(0, i) + loserCode.substring(i + 1)
    }
}


var winArray = winners.split(','); //from html 
var losArray = losers.split(',');

var winCodeArray = winnerCode.split(','); //from html
var loseCodeArray = loserCode.split(','); 

console.log(winCodeArray);
console.log(loseCodeArray);


var altArry = [] //alt tag from html



logos.forEach((list, index) => {
    // var teamLogos = list.querySelector(".team-logos");
    
    if(gamesPlayed){
        console.log('no teams')
        logos[index].style.display = 'none'; 
        // seeDataBtn.style.display = 'none'; 
    }

    altArry.push(logos[index].alt)
    // console.log(altArry)
    trackClick1 = []
    teamsChosen = []


    for(let i =0; i < winArray.length; i++){
        keysRetWin = getTeamCode(winCodeArray[i].replace(/'/g,'').trim(), 1)

        // if(altArry[index] == winArray[i].replace(/'/g,'').toLocaleLowerCase().trim()){
        if(altArry[index] == keysRetWin[0]){
            
            logos[index].style.opacity = '1'; 
            
            logos[index].style.cursor = 'pointer'; 

            logos[index].addEventListener('mouseenter', ()=>{
                logos[index].style.transform = 'scale(1.7, 1.4)'; 
                logos[index].style.zIndex = '6'; 

            })
            logos[index].addEventListener('mouseleave', ()=>{
                logos[index].style.transform = null; 
            })

            logos[index].addEventListener('click', ()=>{ 
                console.log(logos[index].alt)
                teamsChosen.push(logos[index].alt); 
                getCodeOf = getTeamCode(logos[index].alt, 2)

                for(let win=0; win<winCodeArray.length; win++){
                    if(getCodeOf[0] == winCodeArray[win].replace(/'/g,'').trim()){
                        team1 = getTeamCode(winCodeArray[win].replace(/'/g,'').trim(), 1)
                        team2 = getTeamCode(loseCodeArray[win].replace(/'/g,'').trim(), 1)
                        teamsChosen.push(team2[0])
                    }
                }
                console.log(teamsChosen)
                localStorage.setItem('teams', teamsChosen); 
                sendData(teamsChosen); 
                // window.location.replace("http://127.0.0.1:5000/stats/data")
                window.location.replace('stats/data')    

            }); 

        }
    }
    trackClick = []
    for(let i =0; i < losArray.length; i++){
        keysRetLose = getTeamCode(loseCodeArray[i].replace(/'/g,'').trim(), 1)
        if(altArry[index] == keysRetLose[0]){
            logos[index].style.opacity = '1'; 
            
            logos[index].style.cursor = 'pointer'; 
            logos[index].addEventListener('mouseenter', ()=>{
                logos[index].style.transform = 'scale(1.7, 1.4)'; 
                logos[index].style.zIndex = '6'; 
            })
            logos[index].addEventListener('mouseleave', ()=>{
                logos[index].style.transform = null; 
            })

            var storageTeams = []
            
            logos[index].addEventListener('click', ()=>{
                console.log(logos[index].alt) //clicked on team
                teamsChosen.push(logos[index].alt)
                getCodeOf = getTeamCode(logos[index].alt, 2) //clicked on team's code
                console.log(getCodeOf); 


                for(let los =0; los<loseCodeArray.length; los++){
                    if (getCodeOf[0] == loseCodeArray[los].replace(/'/g,'').trim()){
                        team1 = getTeamCode(loseCodeArray[los].replace(/'/g,'').trim(), 1)
                        team2 = getTeamCode(winCodeArray[los].replace(/'/g,'').trim(), 1)
                        console.log(team1[0])
                        console.log(team2[0])

                        teamsChosen.push(team2[0])
                        
                    }
                }
                console.log(teamsChosen)

                localStorage.setItem('teams', teamsChosen);
                sendData(teamsChosen);                 
                window.location.replace('stats/data')

               
            });  
        }
    }    
    if(logos[index].style.opacity != '1'){
        logos[index].style.display = 'none'; 
    }

});


var dateChosen = localStorage.getItem('date'); 
dateChosenYear = dateChosen.substring(0, 4); 
dateChosenYear = parseInt(dateChosenYear); 




function getTeamCode(code, num){
    var teamCodes = {
        "toronto": "TOR", "utah": "UTA","atlanta": "ATL","boston": "BOS","brooklyn": "BRK","charlotte": "CHO", "charlotte": "CHH", 
        "chicago": "CHI","cleveland": "CLE","dallas": "DAL","denver": "DEN","detroit": "DET","golden state": "GSW",
        "houston": "HOU","indiana": "IND","la clippers": "LAC","la lakers": "LAL","memphis": "MEM","miami": "MIA",
        "milwaukee": "MIL","minnesota": "MIN","new orleans": "NOP","new york": "NYK","oklahoma city": "OKC",
        "orlando": "ORL","philadelphia": "PHI","phoenix": "PHO","portland": "POR","sacramento": "SAC", "vancouver":"VAN",
        "san antonio": "SAS","washington": "WAS", "charlotteOld": "CHA", "new orleansOld": "NOH", "new jersey": "NJN", 
        "seattle":"SEA", "baltimore": "BAL", "buffalo":"BUF", "washingtonOldOld":"CAP", "chicagoOldOld":"CHP", 
        "chicagoOld":"CHZ", "chicagoOldOldOld":"CHS", "cincinnati":"CIN", "clevelandOld":"CLR", "indianaOld":"FTW",
        "kansascityOld":"KCK", "kansascityOldOld":"KCO", "milwaukeeOld":"MLH", "minneapolis":"MNL", "new orleansOldOld":"NOJ", 
        "new yorkOld":"NYN", "new orleans okc":"NOK", "philadelphiaOld":"PHW", "rhode island":"PRO", "rochester":"ROC", "sandiego":"SDC",
        "sandiegoOld":"SDR", "sanfrancisco":"SFW", "stlouisOld":"STB", "stlouis":"STL", "syracuse":"SYR", "torontoOld":"TRH", "illinois":"TRI", "washingtonOld":"WSB"
    }
    if(num==1){ //to get team name/key
        keyArry = []; 
        Object.entries(teamCodes).forEach(([key, value]) => {
            if(value == code){
                keyArry.push(key); 
            }
        }); 
        return keyArry; 
    } else if (num==2){ //to get team code/value
        valArry = []; 
        Object.entries(teamCodes).forEach(([key, value]) => {
            if(key == code){
                valArry.push(value); 
            }
        }); 
        return valArry;
    }
}

function redirectTo(){
    window.location.replace('stats/data')
}


function sendData(team){
    if(team == null){
        return; 
    } else {
        console.log(team[0])
        console.log(team[1])
        chosenTeamCodes = []

        var teamCodes = {
            "toronto": "TOR", "utah": "UTA","atlanta": "ATL","boston": "BOS","brooklyn": "BRK","charlotte": "CHO", "charlotte": "CHH", 
            "chicago": "CHI","cleveland": "CLE","dallas": "DAL","denver": "DEN","detroit": "DET","golden state": "GSW",
            "houston": "HOU","indiana": "IND","la clippers": "LAC","la lakers": "LAL","memphis": "MEM","miami": "MIA",
            "milwaukee": "MIL","minnesota": "MIN","new orleans": "NOP","new york": "NYK","oklahoma city": "OKC",
            "orlando": "ORL","philadelphia": "PHI","phoenix": "PHO","portland": "POR","sacramento": "SAC", "vancouver":"VAN",
            "san antonio": "SAS","washington": "WAS", "charlotteOld": "CHA", "new orleansOld": "NOH", "new jersey": "NJN", 
            "seattle":"SEA", "baltimore": "BAL", "buffalo":"BUF", "washingtonOldOld":"CAP", "chicagoOldOld":"CHP", 
            "chicagoOld":"CHZ", "chicagoOldOldOld":"CHS", "cincinnati":"CIN", "clevelandOld":"CLR", "indianaOld":"FTW",
            "kansascityOld":"KCK", "kansascityOldOld":"KCO", "milwaukeeOld":"MLH", "minneapolis":"MNL", "new orleansOldOld":"NOJ", 
            "new yorkOld":"NYN", "new orleans okc":"NOK", "philadelphiaOld":"PHW", "rhode island":"PRO", "rochester":"ROC", "sandiego":"SDC",
            "sandiegoOld":"SDR", "sanfrancisco":"SFW", "stlouisOld":"STB", "stlouis":"STL", "syracuse":"SYR", "torontoOld":"TRH", "illinois":"TRI", "washingtonOld":"WSB"
        }

        for (var key in teamCodes){
            if(key == team[0]){
                team1 = teamCodes[key]
                chosenTeamCodes.push(teamCodes[key])
            }

            if(key == team[1]){
                team2 = teamCodes[key]
                chosenTeamCodes.push(teamCodes[key])
            }
        }
        console.log(chosenTeamCodes)

            const URL = window.location.search
            
            const xhr = new XMLHttpRequest()
            sender = JSON.stringify(chosenTeamCodes)

            console.log('teams sent')
            xhr.open('POST', URL); 
            xhr.send(sender);
    }
}

function clearDate(){
    localStorage.clear(); 
}



 
