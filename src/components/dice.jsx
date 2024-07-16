import React from "react";

const Dice = (props) => {
    // console.log(props)
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "aliceblue"
    }
    
    return (
        <div  >
            <h2 onClick={props.holdDice} style={styles} className="dice">{props.value}</h2>
        </div>
    
    )
}

export default Dice