function Tile(props) {
  const tile = props.tile
  const index = props.index ?? null

  const status = () => {
    if (tile.status === 'present') {
      return 'bg-yellow-500'
    }

    if (tile.status === 'complete') {
      return 'bg-green-500'
    }

    if (tile.status === 'absent') {
      return 'bg-red-500'
    }

    return ''
  }

  return (
    <div
      className={`h-10 border flex items-center justify-center uppercase ${status()}`}
      data-key={tile.letter}
    >
      {tile.letter}
    </div>
  )
}

export default Tile;
