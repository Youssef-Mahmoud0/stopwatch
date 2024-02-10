const timeDisplay = document.getElementById("display");
const lapsDisplay = document.getElementById("laps-display");
const startStopButton = document.getElementById("startStopButton");
const resetLapButton = document.getElementById("resetLapButton");

let startMainTime = 0;
let timerIndex = 0;
let mainTimePassed = 0;

let startLapTime = 0;
let lapTimePassed = 0;
let allLapsTime = [];

let isRunning = false;
let lapsCount = 0;

function toggleButtonsStyles(currentState){
  if(currentState === "running"){
    startStopButton.classList.remove('start')
    startStopButton.classList.add('stop')
    startStopButton.textContent = "Stop"
    timeDisplay.style["boxShadow"] = "2px 2px 5px rgba(27, 174, 194, 0.9) ,  -2px -2px 5px rgb(231, 15, 15)"
    resetLapButton.textContent = "Lap"
  }
  else if(currentState === "stopping"){
    startStopButton.classList.remove('stop')
    startStopButton.classList.add('start')
    startStopButton.textContent = "Start"
    timeDisplay.style["boxShadow"] = "2px 2px 5px rgba(27, 174, 194, 0.9) ,  -2px -2px 5px rgba(7, 163, 7, 0.9)"

    resetLapButton.textContent = "Reset"
  }
}

function toggleStartStopButtons(){
  if(mainTimePassed === 0){
    console.log("hi");
    startNewLap();
  }
  if(!isRunning){
    isRunning = true;
    toggleButtonsStyles("running");
    startTimer();
  }
  else{
    isRunning = false;
    toggleButtonsStyles("stopping");
    stop();
  }
}

function startNewLap(){
  lapsCount += 1 ;  
  lapTimePassed = 0;
  startLapTime = Date.now() - lapTimePassed

  const newLap = document.createElement("div");
  const numberOfLap = document.createElement("p");
  numberOfLap.textContent = `Lap #${lapsCount}`;
  const timeOfLap = document.createElement("p");
  timeOfLap.textContent = `00:00:00:000`; 
  newLap.id = `lap${lapsCount}`;
  newLap.appendChild(numberOfLap);
  newLap.appendChild(timeOfLap);
  lapsDisplay.insertBefore(newLap, lapsDisplay.firstChild);
  if(lapsCount > 1){
    updateFastestAndSlowest();
  }
}

function startTimer(){
  startMainTime = Date.now() - mainTimePassed;
  startLapTime = Date.now() - lapTimePassed;

  timerIndex = setInterval(updateDisplay, 1);
}

function stop() {
  mainTimePassed = Date.now() - startMainTime;
  lapTimePassed = Date.now() - startLapTime;
  clearInterval(timerIndex);
  // clearInterval(lapIndex);
}

function reset(){
  
startMainTime = 0;
timerIndex = 0;
mainTimePassed = 0;

startLapTime = 0;
lapTimePassed = 0;
lapIndex = 0;
allLapsTime = []

isRunning = false;
lapsCount = 0;  //made zero because will increase by one in startNewLap
timeDisplay.textContent = `00:00:00:000`;
lapsDisplay.innerHTML = "";
}

function updateDisplay(){
  mainTimePassed = Date.now() - startMainTime;
  milliSeconds = mainTimePassed % 1000;
  seconds = Math.floor( (mainTimePassed / 1000 ) % 60);
  minutes = Math.floor( (mainTimePassed/ (60*1000) ) % 60);
  hours = Math.floor(mainTimePassed/ (60*60*1000) );

  milliSeconds = String(milliSeconds).padStart(3, "0");
  seconds = String(seconds).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");

  timeDisplay.textContent = `${hours}:${minutes}:${seconds}:${milliSeconds}`;  

  lapTimePassed = Date.now() - startLapTime;
  milliSeconds = lapTimePassed % 1000;
  seconds = Math.floor( (lapTimePassed / 1000 ) % 60);
  minutes = Math.floor( (lapTimePassed/ (60*1000) ) % 60);
  hours = Math.floor(lapTimePassed/ (60*60*1000) );

  milliSeconds = String(milliSeconds).padStart(3, "0");
  seconds = String(seconds).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");


  let innerDiv = lapsDisplay.getElementsByTagName('div')[0]
  let timeInLapsDisplay = innerDiv.getElementsByTagName('p')[1];
  timeInLapsDisplay.textContent = `${hours}:${minutes}:${seconds}:${milliSeconds}`;  
}


function toggleResetLapButtons(){
  if(!isRunning)
    reset();
  else
    startNewLap();
}


function updateFastestAndSlowest(){
  let innerDiv = lapsDisplay.getElementsByTagName('div')[1]
  let timeInLapsDisplay = innerDiv.getElementsByTagName('p')[1];
  let time = timeInLapsDisplay.textContent.replaceAll(":" , "");
  allLapsTime.push(Number(time));
  if(allLapsTime.length > 1){
    if (allLapsTime.length > 2){
      innerDiv = lapsDisplay.getElementsByClassName("green");
      let innerDivArray = Array.from(innerDiv);

      innerDivArray.forEach(function(element) {
          element.classList.remove("green");
      });
      

      innerDiv = lapsDisplay.getElementsByClassName("red");
      innerDivArray = Array.from(innerDiv);

      innerDivArray.forEach(function(element) {
          element.classList.remove("red");
      });
    }
    let fastestIndex = allLapsTime.indexOf(Math.min(...allLapsTime));
    let slowestIndex = allLapsTime.indexOf(Math.max(...allLapsTime));

    innerDiv = lapsDisplay.getElementsByTagName('div')[lapsCount - 1 - fastestIndex];
    innerDiv.classList.add("green")

    innerDiv = lapsDisplay.getElementsByTagName('div')[lapsCount - 1 - slowestIndex];
    innerDiv.classList.add("red")

  }

}

