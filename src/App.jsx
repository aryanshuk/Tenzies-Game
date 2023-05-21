import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
    const [gameStartedFirstTime, setGameStartedFirstTime] = React.useState(false)
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allDiceHeld = dice.every(die => die.isHeld === true)
        const allSameDice = dice.every(die => die.value === dice[0].value)

        if (allDiceHeld && allSameDice) {
            setTenzies(true)
            console.log("You Won!")
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        setDice(oldDice =>
            oldDice.map(die => {
                return die.isHeld ? die : generateNewDie()
            }
            )
        )
    }
    function holdDice(id) {
        setDice(oldDice =>

            oldDice.map(die => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : { ...die }
            }
            )
        )
    }
    function startNewGame() {
        setGameStartedFirstTime(true)
        setDice(allNewDice())
        setTenzies(false)
    }
    const diceElements = dice.map(die => {
        return <Die
            key={die.id}
            value={die.value}
            held={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    })
    return (
        <div className="main">
            <h1>Tenzies!</h1>
            <div className="text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</div>
            
            {gameStartedFirstTime && <div className="die-container">{diceElements}</div>}
            {tenzies && <h1 className="won">&#127881; You Won! &#127881;</h1>}
            {
                !gameStartedFirstTime ?
                    <button className="roll-dice" onClick={startNewGame} > Start Game </button> :
                    <button className="roll-dice" onClick={!tenzies ? rollDice : startNewGame}>{!tenzies ? "Roll" : "New Game"}</button>
            }
            {tenzies && <Confetti />}
        </div >
    )
}