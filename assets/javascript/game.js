// JavaScript Psychic Game Function

const allWords = ["alice", "andy", "amy", "kevin", "kent", "kelly", "jessica", "mark", "tracy", "david"];
var currentWord = '';
var winCnt = 0;
var loseCnt = 0;
var guessLeftCnt = 12; // 12 trials
var userInputArr = [];
var currentGuesses = [];

// Get a Random word
function randWord (arr){
    var word = arr[Math.floor(Math.random() *arr.length)]
    console.log(word)
    return word  
}

// Display Game
function display() {
    document.querySelector("#theWord").innerHTML = currentGuesses.join(""); 
    document.querySelector("#winCount").innerHTML =  winCnt;
    document.querySelector("#loseCount").innerHTML = loseCnt;
    document.querySelector("#GuessLeftCount").innerHTML = guessLeftCnt;
    document.querySelector("#guessLetter").innerHTML = userInputArr.join(",");
}

//Set Random word display
function resetArray(arr) {
    for (let i=0; i<currentWord.length; i++){
        arr[i] = ('_')
    }
}

function emptyArray (arr2) {
    while(arr2.length > 0) {
        arr2.pop();
    }
}

//Update Current Guess with userInput
//To be fixed
function updateCurrentGuess(tempWord) {
    for (let i=0; i< currentWord.length; i++) {
        if(currentWord.charAt(i) === tempWord) {
            currentGuesses[i].push(tempWord);
        }
    }
    console.log(currentGuesses);
}

function restartRound(){
    currentWord = randWord(allWords)
    resetArray(currentGuesses)
    emptyArray(userInputArr)
    guessLeftCnt = 12
    display()
}

// ==============================================================================
// MAIN PROCESS
// Calling functions to start the game.
restartRound()

//When the user presses a key, it will run the following function...
document.addEventListener('keypress', function(e) {
     // Determine which key was pressed, make it lowercase, and set it to the userInput variable.
    var userInput = e.key.toLocaleLowerCase();
    userInputArr.push(userInput);
    updateCurrentGuess(userInput);

    if (guessLeftCnt <= 0) {
        loseCnt++;  
        restartRound()
    }
    // To be fixed
    // else if (currentGuesses.join("") === currentWord) {
    //     winCnt++;
    //     restartRound();
    // }
    else 
    {
        guessLeftCnt--;
        display()
    }  
});
