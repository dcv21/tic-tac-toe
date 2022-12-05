const Gameboard = () => {
    const board = Array(9).fill(0);
    let moveCount = 0;
    let turn = 0;

    const gameEnd = (str) => {
        const main = document.querySelector("main");
        main.textContent = "";

        const p = document.createElement("p");
        p.textContent = str;

        main.appendChild(p);

        setTimeout(() => {
            main.textContent = "";

            const button = document.createElement("button");
            button.textContent = "Play";
            button.id = "play";
            button.type = "button";
            button.addEventListener("click", handleClick);

            main.appendChild(button);
        }, 3000);
    };

    const checkVictory = () => {
        const tmp = board.map((num) => {
            if (turn) {
                return num === 1 ? 0 : -num;
            } else {
                return num === -1 ? 0 : num;
            }
        });

        const checkSum =
            tmp[0] * tmp[1] * tmp[2] +
            tmp[3] * tmp[4] * tmp[5] +
            tmp[6] * tmp[7] * tmp[8] +
            tmp[0] * tmp[3] * tmp[6] +
            tmp[1] * tmp[4] * tmp[7] +
            tmp[2] * tmp[5] * tmp[8] +
            tmp[0] * tmp[4] * tmp[8] +
            tmp[2] * tmp[4] * tmp[6];

        if (checkSum) {
            gameEnd(turn ? "O wins" : "X wins");
        } else if (moveCount >= 9) {
            gameEnd("Draw");
        }
    };

    const play = (square) => {
        // return nothing signify that the game ended

        board[square] = turn ? -1 : 1;

        moveCount++;

        checkVictory();

        turn = turn ? 0 : 1;

        // return the piece if the game is still ongoing
        return turn ? "X" : "O";
    };

    return { play };
};

const handleClick = () => {
    const gameBoard = Gameboard();

    const main = document.querySelector("main");
    main.textContent = "";

    const board = document.createElement("div");
    board.className = "board";

    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.className = "square";
        square.addEventListener("click", function handler() {
            square.removeEventListener("click", handler);
            square.textContent = gameBoard.play(i);
        });

        board.appendChild(square);
    }

    main.appendChild(board);
};

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#play").addEventListener("click", handleClick);
});
