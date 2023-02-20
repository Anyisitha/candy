const Score = ({scoreDisplay}) => {
    return (
        <div className="score_content">
            <div className="content-svg">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 188 61">
                <path className="cls-1" d="M874,554.154L893.08,524h146.67L1060,552.843,1039.75,583H893.08Z" transform="translate(-873 -523)" style={{ strokeDasharray: "436, 438", strokeDashoffset: 0 }}></path>
            </svg>
            <span className="score-title">score</span>
            </div>
            <h1 className="score-number"> {scoreDisplay}</h1>
        </div>
    )
}

export default Score;