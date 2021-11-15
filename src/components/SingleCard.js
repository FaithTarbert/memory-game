import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
    //EVENT LISTENER: pass which indvidual card was clicked to handleChoice func in App.js to store choice in updated state
    const handleClick = () => {
        //check if card prop=disabled (can't be flipped yet), while useEffect comparison from App.js is running (only runs when 2 cards have been selected). While disabled, event listener will NOT fire, temporarily keeping the cards from being clickable
        if (!disabled) {
            //card not disabled - pass card selection back to App.js
            handleChoice(card)
        }
    }

    return (
        <div className="card">
            {/* flipped true/false comes from App.js return function, mapping cards. The associated CSS provides flipping animation */}
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                <img className="back"
                    src="/img/cover.png"
                    //triggers event listener above to select card clicked by user, pass it back to App.js
                    onClick={handleClick}
                    alt="card back"
                />
            </div>
        </div>
    )
}
