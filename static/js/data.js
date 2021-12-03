var winners = document.querySelector(".winners").innerHTML.trim(); 
var losers = document.querySelector(".losers").innerHTML.trim(); 
var logos = document.querySelectorAll(".logos img"); 
var logos1 = document.querySelector(".logos img"); 
var gameBut = document.querySelector("#game-but"); 

logos.forEach((list, index) => {
    // var teamLogos = list.querySelector(".team-logos");
    altArry.push(logos[index].alt)
    trackClick1 = []
    teamsChosen = []


    for(let i =0; i < winArray.length; i++){
        if(altArry[index] == winArray[i].replace(/'/g,'').toLocaleLowerCase().trim()){
            //console.log(winArray[i])
            //winArray names from python scrpaed
            //logos[index].style.opacity = '1'; 
            //logos[index].style.cursor = 'pointer'; 
            //logos[index].addEventListener('mouseenter', ()=>{
                //logos[index].style.transform = 'scale(1.7, 1.4)'; 
                //logos[index].style.zIndex = '6'; 

            //})
            //logos[index].addEventListener('mouseleave', ()=>{
                //logos[index].style.transform = null; 
            //})

            logos[index].addEventListener('click', ()=>{
                // window.location.replace('http://127.0.0.1:5000/stats/data')
                
                gameBut.style.visibility = "visible"; 
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
                        logos[listy].style.display = "none";     
                    }
                }
                    teamsChosen.push(hello)
                // const urlParams = new URLSearchParams(window.location.search); 
                // urlParams.set('date', 'team'); 
                // window.location.search = urlParams
                if(teamsChosen.length < 0){
                    console.log('000')
                }
                    sendData(teamsChosen);
                

            }); //{once : true} 

            
        }
    }
    trackClick = []
    for(let i =0; i < losArray.length; i++){
        if(altArry[index] == losArray[i].replace(/'/g,'').toLocaleLowerCase().trim()){
            //console.log(losArray[i])
            //logos[index].style.opacity = '1'; 
            //logos[index].style.cursor = 'pointer'; 
            //logos[index].addEventListener('mouseenter', ()=>{
                //logos[index].style.transform = 'scale(1.7, 1.4)'; 
                //logos[index].style.zIndex = '6'; 
            //})
            //logos[index].addEventListener('mouseleave', ()=>{
                //logos[index].style.transform = null; 
            //})
            //logos[index] //image class
            
            logos[index].addEventListener('click', ()=>{
                // window.location.replace('http://127.0.0.1:5000/stats/data')


                gameBut.style.visibility = "visible"; 
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

                    if(trackClick[0].alt !== logos[listy].alt && hello !== logos[listy].alt){
                        logos[listy].style.display = "none";     
                    }
                }
                    teamsChosen.push(hello)
                // const urlParams = new URLSearchParams(window.location.search); 
                // urlParams.set('date', 'team'); 
                // window.location.search = urlParams
                    if(teamsChosen.length < 0){
                        console.log('000')
                    }
                    sendData(teamsChosen)
                
            }); //{once : true} 
        }
    }    

  
})

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
            "orlando": "ORL","philadelphia": "PHI","phonenix": "PHO","portland": "POR","sacramento": "SAC",
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
            const xhr = new XMLHttpRequest(); 
                sender = JSON.stringify(chosenTeamCodes)
                // sender = chosenTeamCodes
                console.log('teams sent')
                xhr.open('POST', URL); 
                xhr.send(sender);
        // } 
    }
    // }
    // sender = JSON.stringify(chosenTeamCodes)
    // xhr.open('POST', URL); 
    // xhr.send(sender);
}