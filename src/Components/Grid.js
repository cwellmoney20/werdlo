import Tile from './Tile'
import Keyboard from './Keyboard'
import { words } from "../words";
import { useEffect, useRef, useState } from "react";

const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event)
    element.addEventListener(eventName, eventListener)
    return () => {
      element.removeEventListener(eventName, eventListener)
    };
  }, [eventName, element])
}
const theWord = words[Math.floor(Math.random() * words.length)]
const guesses = 5

function Grid(props) {
  const [board, setBoard] = useState(Array.from({ length: guesses}, () => {
    return Array.from(
      { length: theWord.length },
      (item, index) => {
        return {
          index,
          status: null,
          letter: null
        }
      }
    )
  }))
  let [currentRowIndex, setCurrentRowIndex] = useState(0)
  const currentGuess = board[currentRowIndex].map(tile => tile.letter).join('')
  const handleKeyUp = ({ key }) => {
    // Set Tile
    if (/^[A-z]$/.test(key)) {
      setTile(key)
      return
    }

    // Enter
    if (key === 'Enter') {
      sumbitGuess()
      return
    }

    // Delete
    if (key === 'Backspace') {
      deleteTile()
    }
  }

  useEventListener("keyup", handleKeyUp)

  const setTile = (key) => {
    let newBoard = [...board]
    for (const tile of newBoard[currentRowIndex]) {
      if (! tile.letter) {
        tile.letter = key.toUpperCase()
        break
      }
    }

    setBoard(newBoard)
  }

  const sumbitGuess = () => {
    // don't allow them to move to next line if all letters are not filled out
    if (! board[currentRowIndex].every((tile) => tile.letter)) {
      return
    }

    if (!words.includes(currentGuess)) {
      alert('Not a word. Try again.')
      return
    }

    // update tile status
    updateTileStatus()

    // check if they won the game
    if (currentGuess === theWord) {
      alert('YOU WON!')
      // confetti()
      // reset game
      return
    }

    // end game
    if (currentRowIndex === board.length - 1) {
      alert('End of Game. The word was ' + theWord + ' Try again!')
      return
    }

    setCurrentRowIndex(currentRowIndex + 1)
  }

  const deleteTile = () => {
    let newBoard = [...board]
    for (let i = newBoard[currentRowIndex].length - 1; i >= 0; i--) {
      let tile = newBoard[currentRowIndex][i]
      if (tile.letter) {
        tile.letter = null
        break
      }
    }

    setBoard(newBoard)
  }

  const updateTileStatus = () => {
    let newBoard = [...board];
    newBoard[currentRowIndex].forEach((tile, index) => {
      tile.status = 'absent'

      if (theWord.includes(tile.letter)) {
        tile.status = 'present'
      }

      if (tile.letter === theWord.charAt(index)) {
        tile.status = 'complete'
      }
    })
    setBoard(newBoard)
  }

  // TODO Modal to Share
  // get words
  // get random word
  // copy to clipboard
  // store in local storage
  // store game status in_progress, completed
  // timestamp
  // stats
  // light/dark mode

  return (
    <div>
      <div className='max-w-xs mx-auto mt-4 space-y-2' style={{width: 240 + 'px'}}>
          {board.map((row, index) =>
            <div className={`grid grid-cols-4 gap-x-1 ${currentRowIndex === index ? 'group current-row' : ''}`} key={`row-${index}`}>
              {row.map((tile, index) =>
                <Tile tile={tile} key={`word-${index}`} />
              )}
            </div>
          )}
      </div>
      <Keyboard handleKeyboardClick={handleKeyUp} board={board} />
    </div>
  )
}

export default Grid;
