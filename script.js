function createGameboard() {
    let playBoard = Array(9).fill("");

    const clearBoard = function() {
        let tokenHolders = document.querySelectorAll(".token-holder");

        tokenHolders.forEach(el => el.textContent = "");

        for (let i = 0; i < playBoard.length; i++) {
            playBoard[i] = "";
        }
    }

    const addToken = function(index, playerToken) {
        let tokenList = ["O", "X"];

        if (!tokenList.includes(playerToken)) {
            return console.error("token must be O or X");
        }

        if (playBoard[index] != "") {
            return console.error("token already in place");
        } else {
            playBoard[index] = playerToken;
        }
    }

    const countWinner = function() {
        let board = playBoard;
        let positionsX = [];
        let positionsO = [];
        let winner;

        let winningPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (let i = 0; i < board.length; i ++) {
            if (board[i] == "X") {
                positionsX.push(i);
            } else if (board[i] == "O") {
                positionsO.push(i);
            } else {
                continue;
            }
        };

        winningPositions.forEach(el => {
            let countX = 0;
            let countO = 0;

            for (let i = 0; i < positionsO.length; i ++) {
                for (let j = 0; j < el.length; j++) {
                    if (positionsO[i] == el[j]) {
                        countO += 1;
                    }
                };
            };

            for (let i = 0; i < positionsX.length; i ++) {
                for (let j = 0; j < el.length; j++) {
                    if (positionsX[i] == el[j]) {
                        countX += 1;
                    }
                };
            };

            if (countX == 3) {
                winner = "X";
            }

            if (countO == 3) {
                winner = "O";
            }

        });

        return winner;
    }

    const addEventsToBoard = (function () {
        let blocks = document.querySelectorAll(".token-holder");
        blocks.forEach(el => el.addEventListener("click", e => {
            GameController.playRound(e.target.id)}
        ))
    })

    const renderArray = (function() {
        let tokenHolders = document.querySelectorAll(".token-holder");

        for (let i = 0; i < tokenHolders.length; i++) {
            tokenHolders[i].textContent = playBoard[i];
        }
    })

    return { clearBoard, countWinner, playBoard, addToken, addEventsToBoard, renderArray }
};

const Player = function(name, token) {
    return {
        name,
        token
    }
};

const GameController = (function startGame(playerOne, playerTwo, playerOneMarker, playerTwoMarker) {
    let player1 = Player(playerOne, playerOneMarker);
    let player2 = Player(playerTwo, playerTwoMarker);
    let gameboard = createGameboard();
    let currentPlayerTurn = player1.token;
    let resultPane = document.querySelector(".result")

    const switchPlayerTurn = function() {
        currentPlayerTurn = currentPlayerTurn === player1.token ? player2.token : player1.token;
    };

    gameboard.addEventsToBoard();

    let count = 0;
    const playRound = function(playerChoice) {
        gameboard.addToken(playerChoice.charAt(1), currentPlayerTurn);
        switchPlayerTurn();
        gameboard.renderArray();
        let winner = gameboard.countWinner();
        count += 1;

        if (winner == "X") {
            resultPane.textContent = "Player 1 Win!"
            currentPlayerTurn = player1.token
            gameboard.clearBoard();
            gameboard.renderArray();
            count = 0;
            return;
        }

        if (winner == "O") {
            resultPane.textContent = "Player 2 Win!"
            currentPlayerTurn = player1.token
            gameboard.clearBoard();
            gameboard.renderArray();
            count = 0;
            return;
        }

        if (count > 8) {
            resultPane.textContent = "Draw!";
            currentPlayerTurn = player1.token;
            gameboard.clearBoard();
            gameboard.renderArray();
            count = 0;
            return;
        }
    }

    return { playRound }
})("Player1", "Player2", "X", "O");

