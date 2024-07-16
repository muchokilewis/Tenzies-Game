import React, { useEffect, useState } from "react";
import Dice from "./dice";
import { v4 as uuidv4 } from "uuid";
// import Confetti from "react-confetti/dist/types/Confetti";
import Confetti from "react-confetti";
import ConfettiComponent from "./confettiComponent"

const Tenzies = () => {
    const [diceNumbers, setDiceNumbers] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false)

    /**
     * When keeping two pieces of state in sync, using useEffect is advised
     */
    useEffect(() => {
        // console.log("Dice State changed")
        const allHeld = diceNumbers.every(dice => dice.isHeld)
        const allEqual = diceNumbers.every(dice => dice.value === diceNumbers[0].value)
        diceNumbers.map(dice => 
            allHeld && allEqual  ?
            setTenzies(true) :
            setTenzies(false)
        )
    },[diceNumbers])

    function allNewDice() {
        const dice = [];
        for (let i = 0; i < 10; i++) {
            let random = Math.floor(Math.random() * 6 + 1);
            dice.push({
                value: random,
                isHeld: false,
                id: uuidv4(),
            });
        }
        return dice;
    }

    function rollDice() {
        setDiceNumbers(prevDice =>
            prevDice.map(dice => {
                return dice.isHeld ? 
                    dice : 
                    { ...dice, value: Math.ceil(Math.random() * 6)
                }

            })
        )
        // setDiceNumbers(allNewDice());

        if(tenzies) {
            setTenzies(false)
            setDiceNumbers(allNewDice())
        }
    }

    function holdDice(id) {
        // console.log(id)
        setDiceNumbers(prevState => 
            prevState.map(dice => 
                dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
            )
        );
    }

    const diceElements = diceNumbers.map(dice => (
        <Dice 
            key={dice.id} 
            value={dice.value} 
            isHeld={dice.isHeld}
            holdDice={() => holdDice(dice.id)}
        />
    ));

    return (       
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {diceElements}
                <button className="roll-dice" 
                    onClick={rollDice}
                >
                    {tenzies ? "New Game" : "Roll Dice"}
                </button>
            </div>
            {tenzies && <ConfettiComponent />}

        </main>
    );
};

export default Tenzies;
