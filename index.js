const gameBoard = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let boardState = Array(9).fill(null);
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            boardState[a] &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        ) {
            return boardState[a];
        }
    }
    return boardState.includes(null) ? null : "Draw";
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (!boardState[index] && isGameActive) {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");

        const winner = checkWinner();
        if (winner) {
            isGameActive = false;
            message.textContent =
                winner === "Draw"
                    ? "It's a draw!"
                    : `Player ${winner} wins!`;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function resetGame() {
    boardState = Array(9).fill(null);
    isGameActive = true;
    currentPlayer = "X";
    message.textContent = "Player X's turn";

    gameBoard.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}

gameBoard.forEach((cell) =>
    cell.addEventListener("click", handleClick)
);
resetButton.addEventListener("click", resetGame);