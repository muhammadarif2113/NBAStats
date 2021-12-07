var getStatsBtn = document.getElementById("get-stats"); 

getStatsBtn.addEventListener('click', () => {
    console.log( getStatsBtn.value); 
    getStatsBtn.value = 'Retrieving...'
} )