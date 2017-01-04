
import {RouletteGame} from "./lib/rouletteGame"

let gameCount = 1000;

console.log(`Playing ${gameCount} games:`);

let wins = 0;

for(var index = 0; index < gameCount; index++){
    let game = new RouletteGame(20000,40000,10,false);

    let result = game.play();

    //console.log(`Result: Pot: ${result.pot}, turns: ${result.turns}, success: ${result.success}`);

    if(result.success){
        wins++;
    }
}

console.log(`Won ${wins} out of ${gameCount}`);