window.onload = (e) => {
    document.querySelector("#generate").onclick = generateButtonClicked
    document.getElementById("submit").disabled = true
    document.getElementById("next").disabled = true
    document.getElementById("choice1").disabled = true;
    document.getElementById("choice2").disabled = true;
    document.getElementById("choice3").disabled = true;
    document.getElementById("choice4").disabled = true;

};

let i = 0;
let rightAnswerCount = 0;
let correctAnswer = "string";
let rightAnswerFlag = false;
let numberofquestionsCopy = 0;
let url = "";


function generateButtonClicked(){
    console.log("generateButtonClicked() called");

    let TRIVIA_URL = "https://opentdb.com/api.php?";

    
    let choiceId = document.getElementById("numberofquestions");
    let choiceValue = choiceId.options[choiceId.selectedIndex].value;
    numberofquestionsCopy = choiceValue;
    console.log(numberofquestionsCopy);

    if (choiceValue!=""){
        TRIVIA_URL+="amount=" + choiceValue;
    }
    

    choiceId = document.getElementById("numberofcategory");
    choiceValue =choiceId.options[choiceId.selectedIndex].value;
    

    if(choiceValue!=""){
        TRIVIA_URL+="&category=" + choiceValue;
    }
    

    choiceId = document.getElementById("numberofdifficulty");
    choiceValue =choiceId.options[choiceId.selectedIndex].value;

    
    TRIVIA_URL+="&difficulty=" + choiceValue;

    TRIVIA_URL+="&type=multiple";

    url = TRIVIA_URL;
    console.log(url);





    document.querySelector("#status").innerHTML = "<p>Let's get it started!</p>";

    
    getData(url);

    
    document.querySelector("#generate").disabled = true;
    document.getElementById("numberofquestions").disabled = true;
    document.getElementById("numberofcategory").disabled = true;
    document.getElementById("numberofdifficulty").disabled = true;
    document.getElementById("choice1").disabled = false;
    document.getElementById("choice2").disabled = false;
    document.getElementById("choice3").disabled = false;
    document.getElementById("choice4").disabled = false;

    
}

function nextButtonClicked(){
    
    let quoteArrayIndex = Math.floor(Math.random() * 5);
    let quoteArray = ["You are really taking your time!", "This one's for all the marbles!", "There's no time limit, but hurry up!", "You sure about that answer?", "It's not THAT hard!"];

    i = i + 1;
    
    document.getElementById("choice1").disabled = false;
    document.getElementById("choice2").disabled = false;
    document.getElementById("choice3").disabled = false;
    document.getElementById("choice4").disabled = false;

    document.getElementById("submit").disabled = true;
    document.getElementById("next").disabled = true;


    document.querySelector("#status").innerHTML = "<p>" + quoteArray[quoteArrayIndex] + "</p>";

    

    getData(url);





}

function getData(url){
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoaded;

    xhr.onerror = dataError;


    xhr.open("GET", url);
    xhr.send();

}

function dataLoaded(e){
    let xhr = e.target;

    

    let obj = JSON.parse(xhr.responseText);

    console.log("----------------------");
    if (i != numberofquestionsCopy){
        document.querySelector("#questionfield").innerHTML = "<p>" + obj.results[i].question + "</p>" + "<img src = 'media/steve.jpg' alt = 'Picture of Steve Harvey'>";
        console.log(obj.results[i]);
    
        let numberArray = [1, 2, 3, 4];
        let shuffledArray = shuffle(numberArray);
    
    
        console.log(obj);
        correctAnswer = obj.results[i].correct_answer;
    
        let answerField = document.getElementById("answerfield");
        
    
        for (let j = 0; j < 3; j++){
            answerField.querySelector("label:nth-of-type(" + shuffledArray[j] + ")").innerHTML = obj.results[i].incorrect_answers[j];
    
            answerField.querySelector("input:nth-of-type(" + shuffledArray[j] + ")").value = obj.results[i].incorrect_answers[j];
            answerField.querySelector("input:nth-of-type(" + shuffledArray[j] + ")").checked = false;
    
            console.log(document.querySelector("input:nth-of-type(" + shuffledArray[j] + ")").value);
        }
    
        answerField.querySelector("label:nth-of-type(" + shuffledArray[3] + ")").innerHTML = obj.results[i].correct_answer;
        answerField.querySelector("input:nth-of-type(" + shuffledArray[3] + ")").value = obj.results[i].correct_answer;
        answerField.querySelector("input:nth-of-type(" + shuffledArray[3] + ")").checked = false;
        console.log("The correct answer: -------");
        console.log(answerField.querySelector("input:nth-of-type(" + shuffledArray[3] + ")").value);
    
    
    
        
        
        answerField.addEventListener("change", chooseChoice);
    
        let submitButton = document.getElementById("submit");
    
        submitButton.addEventListener("click", submitClicked);
    
        let nextButton = document.getElementById("next");
    
        nextButton.addEventListener("click", nextButtonClicked);
    
    } else {
        document.querySelector("#status").innerHTML = "<p>You got " + rightAnswerCount + " correct out of " + numberofquestionsCopy + " questions!</p>";
        document.getElementById("submit").disabled = true;
        document.getElementById("next").disabled = true;
        document.getElementById("choice1").disabled = true;
        document.getElementById("choice2").disabled = true;
        document.getElementById("choice3").disabled = true;
        document.getElementById("choice4").disabled = true;
        document.querySelector("#generate").disabled = false;
        document.getElementById("numberofquestions").disabled = false;
        document.getElementById("numberofcategory").disabled = false;
        document.getElementById("numberofdifficulty").disabled = false;

        i = 0;

    }
    

}


let chooseChoice = (e) =>{
    let value = e.target.value;


    if (value == correctAnswer){
        
        rightAnswerFlag = true;
        console.log(rightAnswerFlag);
        document.getElementById("submit").disabled = false;

        

    }
    else {

        rightAnswerFlag = false;
        console.log(rightAnswerFlag);
        document.getElementById("submit").disabled = false;
        



    }

}

let submitClicked = (e) =>{
    
    let answerArrayIndex = Math.floor(Math.random() * 5);
    let rightAnswerArray = ["Yes! Good answer, good answer!", "Impressive!", "You know your stuff!", "Woo you got it right!", "More points for you!"];
    let wrongAnswerArray = ["What were you thinking?! Wrong!", "Are you serious? Hah! Wrong!", "That is the worst answer I've ever heard!", "The score just keeps getting lower and lower!", "Seriously incorrect!"]
    if (rightAnswerFlag){
        document.querySelector("#status").innerHTML = "<p>" + rightAnswerArray[answerArrayIndex] + "</p>";
        rightAnswerFlag = false;
        rightAnswerCount++;
        document.getElementById("choice1").disabled = true;
        document.getElementById("choice2").disabled = true;
        document.getElementById("choice3").disabled = true;
        document.getElementById("choice4").disabled = true;

        

    } else {
        document.querySelector("#status").innerHTML = "<p>" + wrongAnswerArray[answerArrayIndex] + "</p>";;
        rightAnswerFlag = false;

        document.getElementById("choice1").disabled = true;
        document.getElementById("choice2").disabled = true;
        document.getElementById("choice3").disabled = true;
        document.getElementById("choice4").disabled = true;
        
        
    }

    document.getElementById("submit").disabled = true;
    document.getElementById("next").disabled = false;

    
}




function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  
}

function dataError(e){
    console.log("An error occured");

}



