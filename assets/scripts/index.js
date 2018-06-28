'use strict'

const gameEvents = require('./games/events')

$(() => {
  gameEvents.onInitGame()
  $('.cell').on('click', gameEvents.onCellClick)
  $('#new-game').on('click', gameEvents.onNewGame)
})
