# Tasks

- [x] Create empty board
  - [x] Size width max 1056px, height same as width
  - [x] Horizontally center
- [x] Render initial board state (Standard chess)
  - [x] Use SVG for pieces (https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces)

- [x] create board context (wraps the whole app)
  - [x] there will be board set inside of it (state)
  - [x] also chess.js instance(chess = new Chess())
  - [x] wrapper functions:
    1. function makeMove (args. move etc.) => chess.move(), setBoard(chess.board())
    2. function moves => chess.moves(args. piece or square)

- [x] Use chess.js (https://jhlywa.github.io/chess.js/#moves-piece-piece-square-square-verbose--false--)
  - [x] Turns, black can move on his turn
  - [x] Validate moves, render dot on valid squares
  - [x] If in check, show an indicator
  - [x] If game ends, show result
  - [x] If promoting, display a piece selector

- [x] Add timer and time-control selector (hold preference in local storage)
- [x] Add sound effects
- [] Add multiplayer peer2peer
  // timer doesn't start ticking after white plays its first move
  // create increment logic and add incremented time selectors
  // center endgameAlertBox & promotionPieceSelector
