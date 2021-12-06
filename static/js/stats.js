var winners = document.querySelector(".winners").innerHTML.trim(); 
var losers = document.querySelector(".losers").innerHTML.trim(); 
var logos = document.querySelectorAll(".logos img"); 
var logos1 = document.querySelector(".logos img"); 
var gameBut = document.querySelector("#game-but"); 
var btn = document.querySelector('#table-but'); 
var date = document.querySelector(".data h2"); 



function back(){
    location.reload(); 
}

for(let i = 0; i < winners.length; i++){
    if (winners.charAt(i) == '[' || winners.charAt(i) == ']'){
        winners = winners.substring(0, i) + winners.substring(i + 1)
    }
}

for(let i = 0; i < losers.length; i++){
    if (losers.charAt(i) == '[' || losers.charAt(i) == ']'){
        losers = losers.substring(0, i) + losers.substring(i + 1)
    }
}


var winArray = winners.split(',')
;;var losArray = losers.split(',')
var altArry = [] //alt tag from html


logos.forEach((list, index) => {
    // var teamLogos = list.querySelector(".team-logos");
    altArry.push(logos[index].alt)
    trackClick1 = []
    teamsChosen = []


    for(let i =0; i < winArray.length; i++){
        if(altArry[index] == winArray[i].replace(/'/g,'').toLocaleLowerCase().trim()){
            console.log(winArray[i])
            //winArray names from python scrpaed
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
                // window.location.replace('http://127.0.0.1:5000/stats/data')
                // gameBut.style.visibility = "visible"; 
                // btn.style.visibility = "visible"; 
                // getTable('ready'); 
                console.log('click')
                trackClick1.push(logos[index]); 
                teamsChosen.push(logos[index].getAttribute('alt')) //clicked on team
                console.log(index)

                console.log(trackClick1); 


                for(let listy = 0; listy < logos.length; listy++){
                    hello = getOtherTeam(2); 
                    console.log(hello)
                    // sendData(hello);

                    if(trackClick1[0].alt !== logos[listy].alt && hello !== logos[listy].alt){
                        // logos[listy].style.display = "none";     
                    }
                }
                    teamsChosen.push(hello)
                // const urlParams = new URLSearchParams(window.location.search); 
                // urlParams.set('date', 'team'); 
                // window.location.search = urlParams
                if(teamsChosen.length < 0){
                    console.log('000')
                }
                localStorage.setItem('teams', teamsChosen); 
                localStorage.setItem('date', date.innerHTML); 

                
                // window.location.replace("http://127.0.0.1:5000/stats/data")

                // window.location.href = "http://127.0.0.1:5000/stats/data"

                sendData(teamsChosen);
                window.location.replace("http://127.0.0.1:5000/stats/data")
                // var redirectUrl = window.location.href = "http://127.0.0.1:5000/stats/data"
                //     setTimeout(function(){
                //         location.replace(redirectUrl)
                //     }, 5000); 

                    
                

            }); //{once : true} 

            
        }
    }
    trackClick = []
    for(let i =0; i < losArray.length; i++){
        if(altArry[index] == losArray[i].replace(/'/g,'').toLocaleLowerCase().trim()){
            console.log(losArray[i])
            logos[index].style.opacity = '1'; 
            logos[index].style.cursor = 'pointer'; 
            logos[index].addEventListener('mouseenter', ()=>{
                logos[index].style.transform = 'scale(1.7, 1.4)'; 
                logos[index].style.zIndex = '6'; 
            })
            logos[index].addEventListener('mouseleave', ()=>{
                logos[index].style.transform = null; 
            })


            //logos[index] //image class

            var storageTeams = []
            
            logos[index].addEventListener('click', ()=>{
                // window.location.replace('http://127.0.0.1:5000/stats/data')

                // gameBut.style.visibility = "visible"; 
                // btn.style.visibility = "visible"; 
                // getTable('ready'); 
                console.log('click')
                trackClick.push(logos[index]); 
                // console.log(logos[index].getAttribute('alt'))
                teamsChosen.push(logos[index].getAttribute('alt')) //clicked on team
                console.log(index)

                console.log(trackClick); 


                for(let listy = 0; listy < logos.length; listy++){
                    hello = getOtherTeam(1); //opposing team
                    console.log(hello)
                    // sendData(hello)
                    // console.log(logos[listy])

                    if(trackClick[0].alt !== logos[listy].alt && hello !== logos[listy].alt){
                        // logos[listy].style.display = "none";     
                        // localStorage.setItem('teams', logos[listy])
                        // console.log(logos[listy])

                    }
                }
                teamsChosen.push(hello)
                localStorage.setItem('teams', teamsChosen); 
                localStorage.setItem('date', date.innerHTML); 

                    

                    // setTimeout(redirectTo(), 9000); 
                    // window.location.replace("http://127.0.0.1:5000/stats/data")
                 

                sendData(teamsChosen)
                window.location.replace("http://127.0.0.1:5000/stats/data")
                // var redirectUrl = window.location.replace("http://127.0.0.1:5000/stats/data")
                //     setTimeout(function(){
                //         location.replace(redirectUrl)
                //     }, 5000); 
                // changePage(); 
                // window.location.replace("http://127.0.0.1:5000/stats/data")

                // localStorage.setItem('chosenTeams', storageTeams); 
                // teamsPicked = localStorage.getItem('teams')
                // teamsPicked1 = teamsPicked.substring(0, teamsPicked.indexOf(','));
                // teamsPicked2 = teamsPicked.substring(teamsPicked.indexOf(',') + 1, teamsPicked.length)
                // console.log(teamsPicked1)
                // console.log(teamsPicked2)
                // for(let listy =0; listy < logos.length; listy++){
                //     if(teamsPicked1 != logos[listy].alt && teamsPicked2 != logos[listy].alt){
                //         logos[listy] = null; 
                //     }
                // }
                    //if teamschosen == logos[index].alt, add logos[index] to local storage
                    //loop through all the logos[index], if it matches the local storage, then make it show
                
            }); //{once : true} 
        }
    }    


})

// async function changePage(){
//     return fetch("http://127.0.0.1:5000/stats/data"); 
// }

function getOtherTeam(num){
    if(num ==1){
        for(let o = 0; o < losArray.length; o++){
            if(trackClick[0].alt == losArray[o].replace(/'/g,'').toLocaleLowerCase().trim()){
                return winArray[o].replace(/'/g,'').toLocaleLowerCase().trim();
            }
        }
    } else if (num==2){
        for(let o = 0; o < winArray.length; o++){
            if(trackClick1[0].alt == winArray[o].replace(/'/g,'').toLocaleLowerCase().trim()){
                return losArray[o].replace(/'/g,'').toLocaleLowerCase().trim();
            }
        }
    }
}

function redirectTo(){
    window.location.replace("http://127.0.0.1:5000/stats/data")
}


function sendData(team){
    if(team == null){
        return; 
    } else {

    
        console.log(team[0])
        console.log(team[1])
        chosenTeamCodes = []
        var teamCodes = {
            "toronto": "TOR", "utah": "UTA","atlanta": "ATL","boston": "BOS","brooklyn": "BRK","charlotte": "CHO",
            "chicago": "CHI","cleveland": "CLE","dallas": "DAL","denver": "DEN","detroit": "DET","golden state": "GSW",
            "houston": "HOU","indiana": "IND","la clippers": "LAC","la lakers": "LAL","memphis": "MEM","miami": "MIA",
            "milwaukee": "MIL","minnesota": "MIN","new orleans": "NOP","new york": "NYK","oklahoma city": "OKC",
            "orlando": "ORL","philadelphia": "PHI","phoenix": "PHO","portland": "POR","sacramento": "SAC",
            "san antonio": "SAS","washington": "WAS",
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

        // if(chosenTeamCodes.length > 0){
            const URL = window.location.search
            // const URL = '?date=2021-12-01'
            console.log(URL); 
            // const URL = 'stats/data'; 
            // const URL = 'stats?date=2021-12-01'
            const xhr = new XMLHttpRequest()
            // xhr.onload = function(){
                sender = JSON.stringify(chosenTeamCodes)

            //     console.log('teams sent')
            //     xhr.open('POST', URL); 
            //     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //     xhr.send(sender);

            // }
            // sender = JSON.stringify(chosenTeamCodes)
                // sender = chosenTeamCodes
            console.log('teams sent')
            xhr.open('POST', URL); 
            // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(sender);
            // window.location.replace("https://nbagamescores.herokuapp.com/stats/data"); 

        // } 
    }
    // }
    // sender = JSON.stringify(chosenTeamCodes)
    // xhr.open('POST', URL); 
    // xhr.send(sender);
}

function showTable(){
    table = document.querySelector('.boxscore'); 
    table.style.visibility = "visible"
}

// function getTable(x){
//     if(x == 'ready'){
//         const URL = window.location.search
//         const xhr = new XMLHttpRequest()
//         sender = JSON.stringify(x)
//         console.log('ready')
//         xhr.open('POST', URL); 
//         xhr.send(sender); 
//     }
// }

 
