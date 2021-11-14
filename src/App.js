
import { useState, useEffect } from 'react'
import './App.css';
import SingleCard from './components/SingleCard';


//array referencing all card images - won't need to update
const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {
  //track cards displayed
  const [cards, setCards] = useState([])
  //track user turns
  const [turns, setTurns] = useState(0)
  //state to store player choices (2)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  //shuffle cards function runs at game start
  const shuffleCards = () => {
    //duplicate the source cards to make enough cards for pairs
    const shuffledCards = [...cardImages, ...cardImages]
      //randomize array sort order (sort takes num between 0 & 1)
      .sort(() => Math.random() - 0.5)
      //map over each individual card and add random key id
      .map((card) => ({ ...card, id: Math.random() }))
    //set state to newly created, randomzied array of card obj's with id's
    setCards(shuffledCards)
    //reset user turns to zero for new game
    setTurns(0)
  }
  //test that your two pieces of state are working
  // console.log(cards, turns)

  //function: when player clicks card, appropriate card is selected to compare (in SingleCard handleClick event listener)
  const handleChoice = (card) => {
    // console.log("selected card", card)
    //TERNARY: if choiceOne has value (not null) then we must be on card 2 turn. If null, then we must be on card turn one (because the value hasn't been set yet/null)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    console.log("turn1 val", choiceOne)
    console.log("turn2 val", choiceTwo)
  }

  //compare 2 cards
  useEffect(() => {
    //runs if both cards have a value, not null
    if (choiceOne && choiceTwo) {
      //if both card choices match
      if (choiceOne.src === choiceTwo.src) {
        // console.log("Match")
        //returns and sets new card array with any matches
        setCards(currCards => {
          //map thru each card obj, update matched value
          return currCards.map(card => {
            if (choiceOne.src === card.src) {
              //update card obj, changing matched value to true
              return { ...card, matched: true }
            } else {
              //if no match, return card unchanged
              return card
            }
          })
        })
        resetTurn()
        //If no match...
      } else {
        // console.log('No Match')
        //delay reset 1 sec, so you can see what card was turned up
        setTimeout(() => resetTurn(), 1000)//milliseconds
      }
    }
  }, [choiceOne, choiceTwo])

  //reset choices and increase turns counter
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Matching Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id}
            card={card}
            handleChoice={handleChoice}
            //if either card selected matches card displayed or it's part of pair already matched, make true and pass to SingleCard component
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
