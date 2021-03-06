/*
This Program simulates Crown and Anchor, a mid 19th century sailor game.
This is from Learning JavaScript by Ethan Brown
The game is simple: there’s a mat with six squares with symbols for “Crown,” “Anchor,” “Heart,” “Club,” “Spade,” and “Diamond.”
The sailor places any number of coins on any combination of the squares: these become the bets.
Then he rolls three six-sided dice with faces that match the squares on the mat.
For each die that matches a square that has a bet on it, the sailor wins that amount of money.
*/


//Functions
//Returns a random int int the range of [m,n]
function rand(m,n){
  return m + Math.floor((n - m + 1) * Math.random());
}

//Randomly returns a string that represents 1 of the 6 the Crown and Anchor faces
function randFace(){
  return ["Crown", "Anchor", "Heart", "Spade", "Club", "Diamond"]
    [rand(0,5)];
}

//Starting Conditions
let funds = 50;
let round = 0;

while(funds > 0 && funds < 100){

  round++;
  console.log(`Round ${round}:`);
  console.log(`\tStarting Funds: ${funds}p`);
  //place bets
  let bets = {Crown:0, Anchor:0, Heart:0, Spade:0, Club:0, Diamond:0};
  let totalBet  = rand(1, funds);

  if(totalBet === 7){
    totalBet = funds;
    bets.heart = totalBet;
  }else{
    //distribute total bet
    let remaining = totalBet;
    do {
      let bet = rand(1,remaining);
      let face = randFace();
      bets[face] = bets[face] + bet;
      remaining = remaining - bet;
    } while (remaining > 0)
  }
  funds = funds - totalBet;
  console.log("\tBets: " + Object.keys(bets).map(face => `${face}:${bets[face]} pence`).join(', ') +
    `(Total: ${totalBet} pence)`);

  //roll dice
  const hand = [];
  for(let roll=0; roll < 3; roll++){
    hand.push(randFace());
  }
  console.log(`\tHand: ${hand.join(', ')}`);

  //collect winnings
  let winnings = 0;
  for(let die=0; die < hand.length; die++){
    let face = hand[die];
    if(bets[face] > 0)
     winnings = winnings + bets[face];
  }
  funds = funds + winnings;
  console.log(`\tWinnings: ${winnings}`);
}
console.log(`\tEnding Funds: ${funds}`);
