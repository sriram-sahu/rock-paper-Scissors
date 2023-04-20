import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [yourChoice, setYourChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [yourScore, setYourScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState("");

  const choices = [
    {
      id: 1,
      choice: "Rock",
      url: "https://www.pngitem.com/pimgs/m/109-1094400_rock-paper-scissors-png-clipart-rock-paper-scissor.png",
    },
    {
      id: 2,
      choice: "Paper",
      url: "https://www.pngitem.com/pimgs/m/266-2667252_transparent-rock-paper-scissors-clipart-rock-paper-scissors.png",
    },
    {
      id: 3,
      choice: "Scissors",
      url: "https://www.kindpng.com/picc/m/502-5025794_rock-paper-scissors-clipart-hd-png-download.png",
    },
  ];

  const userChoices = {
    Rock: "https://www.pngitem.com/pimgs/m/109-1094400_rock-paper-scissors-png-clipart-rock-paper-scissor.png",
    Paper:
      "https://www.pngitem.com/pimgs/m/266-2667252_transparent-rock-paper-scissors-clipart-rock-paper-scissors.png",
    Scissors:
      "https://www.kindpng.com/picc/m/502-5025794_rock-paper-scissors-clipart-hd-png-download.png",
  };

  useEffect(() => {
    if (result !== "") {
      displayResult();
    } else if (yourChoice !== "") {
      findWinner();
    }
  }, [yourChoice, computerChoice, result]);

  const displayResult = () => {
    if (result === "User Win") {
      // setYourScore((prevState) => prevState.yourScore + 1);

      const uScore = yourScore + 1;
      setYourScore(uScore);
      console.log("i win", computerScore);
    } else if (result === "Computer Win") {
      // setComputerScore((prevState) => prevState.computerScore + 1);
      const cScore = computerScore + 1;
      setComputerScore(cScore);
      console.log("computer win", computerScore);
    } else {
      console.log(result);
    }
    console.log(typeof yourScore); // should log "number" after conversion
  };

  const findWinner = () => {
    console.log(yourChoice);
    if (yourChoice === computerChoice.choice) {
      setResult("Draw");
    } else if (
      (yourChoice === "Rock" && computerChoice.choice === "Scissors") ||
      (yourChoice === "Paper" && computerChoice.choice === "Rock") ||
      (yourChoice === "Scissors" && computerChoice.choice === "Paper")
    ) {
      setResult("User Win");
    } else {
      setResult("Computer Win");
    }
  };

  const onUserChoice = async (choice) => {
    await setYourChoice(choice);
    const random = Math.ceil(Math.random() * choices.length) - 1;
    const randomChoice = choices[random];
    await setComputerChoice(randomChoice);
    console.log(randomChoice);
    // setTimeout(() => findWinner(), 1000);
  };

  const restartGame = () => {
    setYourChoice("");
    setComputerChoice("");
    setResult("");
  };

  return (
    <div className='App'>
      <h1 className='main-heading'>Rock Paper Scissor</h1>
      <div>
        <p>Your Score : {yourScore}</p>
        <p>Computer Score : {computerScore}</p>
      </div>
      {yourChoice === "" ? (
        <div>
          <h1 className='choice'>Choose one :</h1>
          <div className='image-container'>
            {choices.map((each) => (
              <div key={each.id} onClick={() => onUserChoice(each.choice)}>
                <img src={each.url} className='image' />
                <h1>{each.choice}</h1>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='image-container'>
          <div>
            <h1 className='choice'>Your Choice</h1>
            <img src={userChoices[yourChoice]} className='image' />
            <h1 className='name'>{yourChoice}</h1>
          </div>
          <div>
            <h1 className='choice'>Computer Choice</h1>
            <img src={computerChoice.url} className='image' />
            <h1 className='name'>{computerChoice.choice}</h1>
          </div>
        </div>
      )}
      <div>
        {result !== "" && (
          <div>
            <h1 className='result'>{result}</h1>
            <button className='btn btn-primary' onClick={restartGame}>
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
