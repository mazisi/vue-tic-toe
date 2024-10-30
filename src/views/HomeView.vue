<template>
  <div class="board">
    <Cell
      v-for="(cell, index) in board"
      :key="index"
      :value="cell"
      @cellClick="makeMove(index)"
    />
    <p v-if="winner">{{ winner === 'X' ? 'You' : 'Maz-Bot' }} wins!</p>
    <p style="color: #fff;" v-else-if="board.every((cell) => cell)">Its A Tie 😂😂</p>
    <button @click="resetGame">Reset</button>
  </div>
</template>

<script lang="ts" setup>
import { useTicTacToe } from '../composables/useTicTacToe';
import Cell from '../components/Cell.vue';

const { board, currentPlayer, winner, makeMove, resetGame } = useTicTacToe();
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}
</style>
