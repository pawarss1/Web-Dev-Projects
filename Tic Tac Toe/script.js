var turn = 1;
var player1 = 0; 
var player2 = 0;
var curState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function checkWin(curPlayer){
    for(let i = 0; i < winningConditions.length; i++){
        const curWiningCondition = winningConditions[i];
        if(curState[curWiningCondition[0]] == curPlayer && curState[curWiningCondition[1]] == curPlayer && curState[curWiningCondition[2]] == curPlayer){
            return true;
        }
    }
    return false;
}
function resetGrid(){
    const final = document.getElementById("resultId");
    final.innerText = "";
    turn = 1;
    player1 = 0; 
    player2 = 0;
    for(let i = 0; i < 9; i++){
        if(curState[i] == 1){
            const elem = document.getElementById(i + 1);
            elem.classList.remove("imageCross");
        }
        else if(curState[i] == 2){
            const elem = document.getElementById(i + 1);
            elem.classList.remove("imageCircle");
        }
        curState[i] = 0;
    }

}
function solve(id){
    if(turn == 1){
        const final = document.getElementById("resultId");
        final.innerText = "";
    }
    const elem = document.getElementById(id);
    if(curState[parseInt(id - 1)] == 0){
        if(turn % 2 != 0){
            //Player 1 goes
            curState[parseInt(id - 1)] = 1;
            elem.classList.add("imageCross");
            player1++;
            if(player1 >= 3){
                if(checkWin(1)){
                    const final = document.getElementById("resultId");
                    final.innerText = "Player 1 wins the round";
                    turn = 1;
                    player1 = 0;
                    player2 = 0;
                    setTimeout(resetGrid, 1500);
                    //resetGrid();
                    return;
                }
            }
        }
        else{
            //Player 2 goes
            curState[parseInt(id - 1)] = 2;
            elem.classList.add("imageCircle");
            player2++;
            if(player2 >= 3){
                if(checkWin(2)){
                    const final = document.getElementById("resultId");
                    final.innerText = "Player 2 wins the round";
                    turn = 1;
                    player1 = 0;
                    player2 = 0;
                    setTimeout(resetGrid, 1500);
                    //resetGrid();
                    return;
                }
            }
        }
        if(turn == 9){
            alert("Draw!");
            resetGrid();
            return;
        }
        else{
            turn++;
        }
    }
}
