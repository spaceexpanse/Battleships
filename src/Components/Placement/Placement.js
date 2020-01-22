import React from 'react';
import BoardPlacement from '../BoardPlacement/BoardPlacement';
import ShipSelector from '../ShipSelector/ShipSelector';
import MainActionBar from '../MainActionBar/MainActionBar';

const Placement = props => {
  const {
    gameboards,
    setGameboards,
    players,
    startGameplay,
    computerPlaced,
    setComputerPlaced,
  } = props;

  return (
    <div>
      <BoardPlacement
        gameboards={gameboards}
        setGameboards={setGameboards}
        players={players}
        startGameplay={startGameplay}
        computerPlaced={computerPlaced}
        setComputerPlaced={setComputerPlaced}
      />
      {/* <MainActionBar buttonText="Play" handleClick={startGameplay} />
      <ShipSelector /> */}
    </div>
  );
};

export default Placement;
