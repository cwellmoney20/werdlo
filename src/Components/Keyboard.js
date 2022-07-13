function Keyboard(props) {
  const keys = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['Enter', ...'ZXCVBNM'.split(''), 'Backspace']
  ]
  const board = props.board ?? []

  // TODO
  const matchKeyForTile = (key) => {
    const flatBoard = board.flat()

    if (flatBoard.find(tile => tile.status === 'complete' && tile.letter === key)) {
      return 'complete'
    }

    if (flatBoard.find(tile => tile.status === 'present' && tile.letter === key)) {
      return 'present'
    }

    if (flatBoard.find(tile => tile.status === 'absent' && tile.letter === key)) {
      return 'absent'
    }

    return null
  }

  return (
    <div className='max-w-md mx-auto mt-8 space-y-1'>
        {keys.map((row, index) =>
          <div className="flex items-center justify-center space-x-1" key={`row-${index}`}>
            {row.map((button, index) =>
                <button
                  type="button"
                  className={`key bg-gray-300 border text-gray-700 py-1 px-2 uppercase hover:bg-gray-500 hover:text-white focus:outline-none text-base md:text-lg focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition h-12 flex font-bold duration-150 ease-in-out items-center justify-center min-w-[1.5rem] sm:min-w-[2rem] ${button === 'Backspace' ? 'px-4' : ''}`}
                  key={button}
                  onClick={() => props.handleKeyboardClick({key: button})}
                  data-key={button}
                  data-state={matchKeyForTile(button)}
                >
                  {button === 'Backspace' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" className="flex items-center fill-current">
                          <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
                      </svg>
                    ) : button
                  }
                </button>
            )}
          </div>
        )}
    </div>
  )
}

export default Keyboard;
