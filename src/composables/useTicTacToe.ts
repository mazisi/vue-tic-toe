import { ref, computed } from 'vue';

export function useTicTacToe() {
  const board = ref<Array<string | null>>(Array(9).fill(null)); // 3x3 board
  const currentPlayer = ref<'X' | 'O'>('X');
  const winner = ref<string | null>(null);

  const isBoardFull = computed(() => !board.value.includes(null));
  
  function makeMove(index: number) {
    // Only proceed if it's the human's turn and the cell is empty
    if (!board.value[index] && !winner.value && currentPlayer.value === 'X') {
      board.value[index] = currentPlayer.value;
      checkWinner();
      if (!winner.value && !isBoardFull.value) {
        switchPlayer();
        aiMove();
      }
    }
  }

  function switchPlayer() {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
  }

  function aiMove() {
    const bestMove = minimax(board.value, 'O').index;
    if (bestMove !== undefined) {
      board.value[bestMove] = 'O';
      checkWinner();
      if (!winner.value) {
        switchPlayer();
      }
    }
  }

  function resetGame() {
    board.value = Array(9).fill(null);
    currentPlayer.value = 'X';
    winner.value = null;
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of winPatterns) {
      if (board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]) {
        winner.value = board.value[a];
        break;
      }
    }
  }

  // Minimax algorithm
  function minimax(newBoard: Array<string | null>, player: 'X' | 'O') {
    const availableSpots = newBoard.map((cell, index) => cell === null ? index : null).filter(cell => cell !== null) as number[];

    // Base cases
    if (checkWinnerForMinimax(newBoard) === 'O') return { score: 1 };
    if (checkWinnerForMinimax(newBoard) === 'X') return { score: -1 };
    if (availableSpots.length === 0) return { score: 0 };

    const moves: { index: number; score: number }[] = [];

    for (let i = 0; i < availableSpots.length; i++) {
      const move = { index: availableSpots[i], score: 0 };
      newBoard[move.index] = player;

      const result = minimax(newBoard, player === 'O' ? 'X' : 'O');
      move.score = result.score;
      newBoard[move.index] = null;

      moves.push(move);
    }

    // Choose the best move based on the player
    let bestMove: { index: number; score: number };
    if (player === 'O') {
      let maxScore = -Infinity;
      for (const move of moves) {
        if (move.score > maxScore) {
          maxScore = move.score;
          bestMove = move;
        }
      }
    } else {
      let minScore = Infinity;
      for (const move of moves) {
        if (move.score < minScore) {
          minScore = move.score;
          bestMove = move;
        }
      }
    }
    return bestMove!;
  }

  function checkWinnerForMinimax(board: Array<string | null>): string | null {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of winPatterns) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  return { board, currentPlayer, winner, makeMove, resetGame };
}
