import { Fragment, useCallback } from "react";
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useState, useEffect } from "react";
import { anonymos, blank, gammer, gamming, ninja, panda } from './images'
import User from "./images/user2.png"
import Game from "./images/final.png"
import Score from "./components/score";

const width = 8
const candyColors = [
    anonymos,
    blank,
    gammer,
    gamming,
    ninja,
    panda
]

const App = () => {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([])
    const [squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
    const [scoreDisplay, setScoreDisplay] = useState(0)
    const [playgame, setPlaygame] = useState(false)

    const props = {
        currentColorArrangement,
        setCurrentColorArrangement,
        squareBeingDragged,
        setSquareBeingDragged,
        squareBeingReplaced,
        setSquareBeingReplaced,
        scoreDisplay,
        setScoreDisplay,
        playgame,
        setPlaygame
    }

    const checkForColumnOfFive = () => {
        for (let i = 0; i < 32; i++) {
            const columnOffFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
            const decideColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOffFive.every(square => currentColorArrangement[square] === decideColor && !isBlank)) {
                columnOffFive.forEach(square => currentColorArrangement[square] = blank)
                setScoreDisplay((score) => score + 1)
                console.log(5)
                return true
            }
        }
    }

    const checkForRowOfFive = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFive = [i, i + 1, i + 2, i + 3, i + 4]
            const decideColor = currentColorArrangement[i]
            const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfFive.every(square => currentColorArrangement[square] === decideColor & !isBlank)) {
                rowOfFive.forEach(square => currentColorArrangement[square] = blank)
                setScoreDisplay((score) => score + 1)
                console.log(10)
                return true
            }
        }
    }

    const checkForColumnOfFour = () => {
        for (let i = 0; i < 40; i++) {
            const columnOffFour = [i, i + width, i + width * 2, i + width * 3]
            const decideColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOffFour.every(square => currentColorArrangement[square] === decideColor && !isBlank)) {
                columnOffFour.forEach(square => currentColorArrangement[square] = blank)
                setScoreDisplay((score) => score + 1)
                console.log(4)
                return true
            }
        }
    }

    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3, i + 4]
            const decideColor = currentColorArrangement[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 28, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentColorArrangement[square] === decideColor & !isBlank)) {
                rowOfFour.forEach(square => currentColorArrangement[square] = blank)
                setScoreDisplay((score) => score + 1)
                console.log(9)
                return true
            }
        }
    }

    const checkForColumnOfThree = () => {
        for (let i = 0; i < 48; i++) {
            const columnOffThree = [i, i + width, i + width * 2]
            const decideColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOffThree.every(square => currentColorArrangement[square] === decideColor && !isBlank)) {
                columnOffThree.forEach(square => currentColorArrangement[square] = blank)
                setScoreDisplay((score) => score + 1)
                console.log(3)
                return true
            }
        }
    }

    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOffThree = [i, i + 1, i + 2]
            const decideColor = currentColorArrangement[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOffThree.every(square => currentColorArrangement[square] === decideColor & !isBlank)) {
                rowOffThree.forEach(square => currentColorArrangement[square] = blank)
                setScoreDisplay((score) => score + 1)
                console.log(8)
                return true
            }
        }
    }

    const moveIntoSquareBelow = () => {
        for (let i = 0; i < 56; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArrangement[i] === blank) {
                let randomNumber = Math.floor(Math.random() * candyColors.length)
                currentColorArrangement[i] = candyColors[randomNumber]
            }

            if ((currentColorArrangement[i + width]) == blank) {
                currentColorArrangement[i + width] = currentColorArrangement[i]
                currentColorArrangement[i] = blank
            }
        }
    }

    const dragStart = (e) => {
        setSquareBeingDragged(e.target)
    }

    const dragDrop = (e) => {
        setSquareBeingReplaced(e.target)
    }

    const dragEnd = (e) => {
        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

        const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]

        const validMove = validMoves.includes(squareBeingReplacedId)

        const isAColumnOfFive = checkForColumnOfFive()
        const isARowOfFive = checkForRowOfFive()
        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()

        if (squareBeingReplacedId &&
            validMove &&
            (isAColumnOfThree || isARowOfThree || isAColumnOfFour || isARowOfFour || isAColumnOfFive || isARowOfFive)) {
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        }
        else {
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
            setCurrentColorArrangement([...currentColorArrangement])
        }

    }

    const createBoard = () => {
        const randomColorArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            randomColorArrangement.push(randomColor)
        }

        setCurrentColorArrangement(randomColorArrangement)

    }

    useEffect(() => {
        if (playgame) {
            createBoard()
        }
    }, [playgame])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFive()
            checkForRowOfFive()
            checkForColumnOfFour()
            checkForRowOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()
            moveIntoSquareBelow()
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfFive, checkForRowOfFive, checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])


    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    const config = {
        id: "tsparticles",
        init: particlesInit,
        loaded: particlesLoaded,
        options: {
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: true,
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 8,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                collisions: {
                    enable: true,
                },
                move: {
                    directions: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 3,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }
    }

    return (
        <Fragment>
            <Particles {...config} />
            <div className="App">
                {
                    playgame ? (
                        <Fragment>
                            <div className="game">
                                {currentColorArrangement.map((candyColors, index) =>
                                    <img
                                        key={index}
                                        src={candyColors}
                                        alt={candyColors}
                                        data-id={index}
                                        draggable={true}
                                        onDragStart={dragStart}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDragEnter={(e) => e.preventDefault()}
                                        onDragLeave={(e) => e.preventDefault()}
                                        onDrop={dragDrop}
                                        onDragEnd={dragEnd}
                                    />
                                )}
                            </div>
                            <div className="cuadro">
                                <div style={{ display: "flex" }}>
                                    <div style={{ marginTop: "5%" }}>
                                        <a class="tg-btn-3 tg-svg mx-auto">
                                            <div className="svg-icon" id="svg-5" data-svg-icon="assets/img/icons/shape.svg"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 188 61">
                                                <path className="cls-1" d="M874,554.154L893.08,524h146.67L1060,552.843,1039.75,583H893.08Z" transform="translate(-873 -523)" style={{ strokeDasharray: "436, 438", strokeDashoffset: 0 }}></path>
                                            </svg></div>
                                            <span style={{ marginTop: "1%", marginLeft: "22%", fontFamily: "berlin_sans_fb_demibold" }} className="puntage">score</span>
                                        </a>
                                    </div>
                                    <h1 className="score"> {scoreDisplay}</h1>
                                </div>
                                <div className="gammer">
                                    <img src="https://themedox.com/demo/mykd/assets/img/slider/slider_img01.png" alt="gammer" />
                                </div>
                                <div className="exit">
                                    <img src={Game} alt="exit" onClick={() => setPlaygame(false)} />
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <div className="popup">
                            <div className="start">
                                <div className="button">
                                    <img src={User} alt="image" />
                                    <button onClick={() => setPlaygame(true)}>Iniciar Juego</button>
                                </div>
                                <div className="muneca">
                                    <img className="person" src="https://pixner.net/ophela/demo/assets/images/elements/about-player.png" />
                                    <img className="plat" src="https://pixner.net/ophela/demo/assets/images/elements/about-phone.png" />
                                </div>
                            </div>

                        </div>
                    )

                }

            </div>
            <App.Movil {...props} />
        </Fragment>


    );
}

App.Movil = ({
    currentColorArrangement,
    setCurrentColorArrangement,
    squareBeingDragged,
    setSquareBeingDragged,
    squareBeingReplaced,
    setSquareBeingReplaced,
    scoreDisplay,
    setScoreDisplay,
    playgame,
    setPlaygame
}) => {

    const checkForColumnOfFive = () => {
        for (let i = 0; i < 32; i++) {
            const columnOffFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
            const decideColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOffFive.every(square => currentColorArrangement[square] === decideColor && !isBlank)) {
                columnOffFive.forEach(square => currentColorArrangement[square] = blank)
                setScoreDisplay((score) => score + 1)
                console.log(5)
                return true
            }
        }
    }

    const checkForRowOfFive = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFive = [i, i + 1, i + 2, i + 3, i + 4]
            const decideColor = currentColorArrangement[i]
            const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfFive.every(square => currentColorArrangement[square] === decideColor & !isBlank)) {
                rowOfFive.forEach(square => currentColorArrangement[square] = blank)
                setScoreDisplay((score) => score + 1)
                console.log(10)
                return true
            }
        }
    }

    const checkForColumnOfFour = () => {
        for (let i = 0; i < 40; i++) {
            const columnOffFour = [i, i + width, i + width * 2, i + width * 3]
            const decideColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOffFour.every(square => currentColorArrangement[square] === decideColor && !isBlank)) {
                columnOffFour.forEach(square => currentColorArrangement[square] = blank)
                setScoreDisplay((score) => score + 1)
                console.log(4)
                return true
            }
        }
    }

    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3, i + 4]
            const decideColor = currentColorArrangement[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 28, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentColorArrangement[square] === decideColor & !isBlank)) {
                rowOfFour.forEach(square => currentColorArrangement[square] = blank)
                setScoreDisplay((score) => score + 1)
                console.log(9)
                return true
            }
        }
    }

    const checkForColumnOfThree = () => {
        for (let i = 0; i < 48; i++) {
            const columnOffThree = [i, i + width, i + width * 2]
            const decideColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOffThree.every(square => currentColorArrangement[square] === decideColor && !isBlank)) {
                columnOffThree.forEach(square => currentColorArrangement[square] = blank)
                setScoreDisplay((score) => score + 1)
                console.log(3)
                return true
            }
        }
    }

    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOffThree = [i, i + 1, i + 2]
            const decideColor = currentColorArrangement[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOffThree.every(square => currentColorArrangement[square] === decideColor & !isBlank)) {
                rowOffThree.forEach(square => currentColorArrangement[square] = blank)
                setScoreDisplay((score) => score + 1)
                console.log(8)
                return true
            }
        }
    }

    const moveIntoSquareBelow = () => {
        for (let i = 0; i < 56; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArrangement[i] === blank) {
                let randomNumber = Math.floor(Math.random() * candyColors.length)
                currentColorArrangement[i] = candyColors[randomNumber]
            }

            if ((currentColorArrangement[i + width]) == blank) {
                currentColorArrangement[i + width] = currentColorArrangement[i]
                currentColorArrangement[i] = blank
            }
        }
    }

    const dragStart = (e) => {
        setSquareBeingDragged(e.target)
    }

    const dragDrop = (e) => {
        setSquareBeingReplaced(e.target)
    }

    const dragEnd = (e) => {
        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

        const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]

        const validMove = validMoves.includes(squareBeingReplacedId)

        const isAColumnOfFive = checkForColumnOfFive()
        const isARowOfFive = checkForRowOfFive()
        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()

        if (squareBeingReplacedId &&
            validMove &&
            (isAColumnOfThree || isARowOfThree || isAColumnOfFour || isARowOfFour || isAColumnOfFive || isARowOfFive)) {
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        }
        else {
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
            setCurrentColorArrangement([...currentColorArrangement])
        }

    }

    const createBoard = () => {
        const randomColorArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            randomColorArrangement.push(randomColor)
        }

        setCurrentColorArrangement(randomColorArrangement)

    }
    // eslint-disable-next-line
    useEffect(() => {
        if (playgame) {
            createBoard()
            if(window.innerWidth > 767) {
                document.body.style.height = "100vh"
            } else {
                document.body.style.height = "100%"
            }
        }
    }, [playgame])
    // eslint-disable-next-line
    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFive()
            checkForRowOfFive()
            checkForColumnOfFour()
            checkForRowOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()
            moveIntoSquareBelow()
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfFive, checkForRowOfFive, checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

    return (
        <div className="App-movile">
            {
                playgame ? (
                    <Fragment>
                        <div className="flex-end">
                            <Score scoreDisplay={scoreDisplay} />
                        </div>
                        <div className="game">
                            {currentColorArrangement.map((candyColors, index) =>
                                <img
                                    key={index}
                                    src={candyColors}
                                    alt={candyColors}
                                    data-id={index}
                                    draggable={true}
                                    onDragStart={dragStart}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDragEnter={(e) => e.preventDefault()}
                                    onDragLeave={(e) => e.preventDefault()}
                                    onDrop={dragDrop}
                                    onDragEnd={dragEnd}
                                />
                            )}
                        </div>

                        <div className="gammer">
                            <img src="https://themedox.com/demo/mykd/assets/img/slider/slider_img01.png" alt="gammer" />
                        </div>
                       
                    </Fragment>
                ) : (
                    <div className="popup">
                        <div className="start">
                            <div className="button">
                                <img src={User} alt="image" />
                                <button onClick={() => setPlaygame(true)}>Iniciar Juego</button>
                            </div>
                            <div className="muneca">
                                <img className="person" src="https://pixner.net/ophela/demo/assets/images/elements/about-player.png" />
                                <img className="plat" src="https://pixner.net/ophela/demo/assets/images/elements/about-phone.png" />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default App;
