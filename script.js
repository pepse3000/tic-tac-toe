function createGameboard() {
    let playBoard = Array(9).fill("");

    const clearBoard = function() {
        let tokenHolders = document.querySelectorAll(".token-holder");

        tokenHolders.forEach(el => el.textContent = "");

        for (let i = 0; i < playBoard.length; i++) {
            playBoard[i] = "";
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

    return { clearBoard, countWinner, playBoard }
};


function createPlayer(name, token) {
    const playerName = name;
    const playerToken = token;

    const addToken = function(index, playBoard) {
        let tokenList = ["O", "X"];

        if (!tokenList.includes(playerToken)) {
            return console.error("token must be O or X");
        }

        if (playBoard[index] != "") {
            return console.error("token already in place");
        } else {
            playBoard[index] = playerToken;
            let block = document.querySelector("#b" + (index + 1));
            block.textContent = playerToken;
        }
    }

    return { addToken, playerToken, playerName };
};


function showHoverElement(holder) {
    holder.textContent = "X";
}

function hideHoverElement(holder) {
    holder.textContent = "";
}


function displayController() {
    let tokenHolders = document.querySelectorAll(".token-holder");

    for (let i = 0; i < tokenHolders.length; i++) {
        tokenHolders[i].addEventListener("mouseover", () => showHoverElement(tokenHolders[i]));
        tokenHolders[i].addEventListener("mouseout", () => hideHoverElement(tokenHolders[i]));
    }
}


function startGame() {
    const player1 = createPlayer("Bib", "X");
    const player2 = createPlayer("Dum", "O");

    const gameboard = createGameboard();

    const playRoundX = function() {
        let indexX = +prompt("X turn");

        player1.addToken(indexX, gameboard.playBoard);
        return gameboard.countWinner();
    }

    const playRoundO = function() {
        let indexO = +prompt("O turn");

        player2.addToken(indexO, gameboard.playBoard);
        return gameboard.countWinner();
    }

    const playGame = function() {
        let winner;
        let count = 0;

        while (!winner) {
            count += 1;

            if (playRoundX()) {
                winner = "X";
                break;
            }

            if (playRoundO()) {
                winner = "O";
                break;
            }
            
            if (count > 8) {
                winner = "Draw";
                break;
            }
        }
    }

    return { playGame }
};