const store = require('../store')

const onInitGame = () => {
  store.moves = Array(9).fill('')
  store.player = 0
  store.over = false
  store.winner = null
}

const onCellClick = e => {
  if (store.over) {
    return
  }
  if (!storeMove(e)) {
    return
  }
  if (checkDone()) {
    return
  }
  switchPlayer()
}

const storeMove = e => {
  const target = $(e.target)
  const move = target.attr('data-move')
  const id = e.target.id

  if (move.length > 0) {
    return false
  } else {
    store.moves[parseInt(id)] = store.player
    target.attr('data-move', store.player)
    return true
  }
}

const switchPlayer = () => {
  store.player = 1 - store.player
}

const declareWinner = winner => {
  store.winner = winner
  console.log(store)
}

const endGame = () => {
  store.over = true
  $('.cell').addClass('done')
}

const checkDone = () => {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const checkWin = (tuple) => {
    const sum = tuple.reduce((total, num) => total + num)
    if (sum === 0 || sum === 3) {
      const winner = sum === 0 ? 0 : 1
      declareWinner(winner)
    }
  }

  const { moves } = store

  wins.forEach(win => {
    const tuple = win.map(idx => moves[idx])
    checkWin(tuple)
    if(store.winner !== null) {
      endGame()
      return true
    }
  })

  const totalMoves = moves.filter(move => move !== '').length
  if (totalMoves >= 9) {
    endGame()
    return true
  }

  return false
}

module.exports = {
  onInitGame,
  onCellClick
}
