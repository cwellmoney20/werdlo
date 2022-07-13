function Tile(props) {
  const tile = props.tile
  const status = () => {
    if (tile.status === 'present') {
      return 'bg-yellow-500 text-white'
    }

    if (tile.status === 'complete') {
      return 'bg-green-500 text-white'
    }

    if (tile.status === 'absent') {
      return 'bg-red-500 text-white'
    }

    return 'text-gray-700'
  }

  return (
    <div
      className={`h-12 text-2xl border flex rounded-lg items-center font-bold justify-center uppercase whitespace-nowrap tile empty:bg-gray-100 empty:animate-pulse ${status()}`}
      data-key={tile.letter}
    >{tile.letter}</div>
  )
}

export default Tile;
