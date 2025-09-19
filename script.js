document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.getElementById("status");
  const resetBtn = document.getElementById("resetBtn");
  const resultScreen = document.getElementById("resultScreen");
  const resultMessage = document.getElementById("resultMessage");
  const newGameBtn = document.getElementById("newGameBtn");

  let currentPlayer = "X";
  let gameActive = true;
  let boardState = ["", "", "", "", "", "", "", "", ""];

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      showResult(`Player ${currentPlayer} wins!`);
      gameActive = false;
      return;
    }

    if (!boardState.includes("")) {
      showResult("It's a draw!");
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }

  function checkWin() {
    return winPatterns.some(pattern =>
      pattern.every(index => boardState[index] === currentPlayer)
    );
  }

  function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.classList.remove("hidden");
  }

  function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => (cell.textContent = ""));
    resultScreen.classList.add("hidden");
  }

  cells.forEach(cell => cell.addEventListener("click", handleCellClick));
  resetBtn.addEventListener("click", resetGame);
  newGameBtn.addEventListener("click", resetGame);
});
