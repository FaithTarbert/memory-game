import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped }) {
    //EVENT LISTENER: pass which indvidual card was clicked to handleChoice func in App.js to store choice in updated state
    const handleClick = () => {
        handleChoice(card)
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                <img className="back"
                    src="/img/cover.png"
                    onClick={handleClick}
                    alt="card back"
                />
            </div>
        </div>
    )
}
