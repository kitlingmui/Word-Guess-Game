// JavaScript Psychic Game Function

const allWords = ["alice", "andy", "amy", "kevin", "kent", "kelly", "jessica", "mark", "tracy", "david"];
var currentWord = '';
var winCnt = 0;
var loseCnt = 0;
var guessLeftCnt = 12; // 12 trials
var userInputArr = [];
var currentGuesses = [];
var hidechar = '_';
 

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

// Update Random word Array with given character
function updateArray(arr, replace) {
    for (let i=0; i<currentWord.length; i++){
        arr[i] = replace
    }
}

// Empty Array
function emptyArray (arr2) {
    while(arr2.length > 0) {
        arr2.pop();
    }
}

// Reset the Game for new Round
function restartRound(){
    currentWord = randWord(allWords)
    emptyArray(userInputArr)
    emptyArray(currentGuesses)
    updateArray(currentGuesses, hidechar)
    guessLeftCnt = 12
    display()
}

// Check if charcter exist in the given array
// return true if Yes, false if No
function is_in_array(arr, w) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === w) 
        return true;
    }
    return false;
}

// Store the current input letter into the end of user input array if not exist
// and deduct user guess count by 1
function userInputValidate(word){
    if ( is_in_array(userInputArr,word) ){
        alert( word + ' is already guessed. Please try another letter.')
        return true;
    }
    else {
        userInputArr.push(word);
        guessLeftCnt--;
        updateGuess(word);
        return false;
    }
}

// Update Guess word if match
// Check the status of the game, 
// if win, update win count, if lose, update lost count, if not done, continue the game
// display alert and restart the for new round if need
function updateGuess(word) {   
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord.charAt(i)=== word){
            currentGuesses[i] = word
        }     
        display()
    }

    if ( is_in_array(currentGuesses,hidechar) ) {
        display;  
        if (guessLeftCnt <= 0) {
            loseCnt++
            display();
            alert("You lose!")
            restartRound(); 
        }          
    }
    else { 
        winCnt++;
        alert("Your Guess is " + currentGuesses.join("") + "\n" + "You win!")
        restartRound();    
        display(); 
    }
}

function is_in_array(input_arr,word) {
    for (var i = 0; i < input_arr.length; i++) {
        if (input_arr[i] === word) 
        return true;
    }
    return false;
}

// ==============================================================================
// MAIN PROCESS
// Calling functions to start the game.

// When the user presses a key, it will run the following function...
restartRound();
document.addEventListener('keypress', function(e) {
     // Determine which key was pressed, make it lowercase, 
     // and set it to the userInput variable.
     // If input was entered twice, do not count and deduct the guess left
     console.log(guessLeftCnt )      
     if (guessLeftCnt > 0){
        var userInput = e.key.toLowerCase(); 
        userInputValidate(userInput);
        display();
     }
     else{
        restartRound();
     } 
});
