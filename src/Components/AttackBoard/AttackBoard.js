import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ScreenOverlay from '../ScreenOverlay/ScreenOverlay';
import AttackGameTile from '../AttackGameTile/AttackGameTile';
import Bg1 from '../../Assets/Images/bg1.jpg';
// import Bg2 from '../../Assets/Images/bg2.jpg';

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
  },
  paper: {
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  boardGrid: {
    height: '400px',
    width: '400px',
    backgroundImage: `url(${Bg1})`,
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridTemplateRows: 'repeat(8, 1fr)',
  },
  boardCell: {
    position: 'relative',
    // background: 'rgb(34, 84, 141)',
    width: 'auto',
    height: 'auto',
    // outline: '1px solid rgba(0,0,0,0.4)',
  },
  cellButton: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    // background: 'black',
    background: 'transparent',
  },
}));

const HiddenButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    padding: '0',
    margin: '0',
    minWidth: 'initial',
    height: '100%',
    width: '100%',
    transition: 'none',
    '&:hover': {
      background: 'transparent',
    },

    /*     '&:hover': {
      boxShadow: '0px 0px 0px 3px rgba(0,0,0,0.5) inset',
    },
    '&:active': {
      boxSizing: 'border-box',
      boxShadow: '0px 0px 0px 3px rgba(0,0,0,0.5) inset',
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderColor: '#005cbf',
    },
    '&:focus': {
      // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    }, */
  },
})(Button);

const AttackBoard = props => {
  const classes = useStyles();

  const generateBoard = gameboard => {
    const { boardIndex, players, currentCoords } = props;
    const grid = gameboard.grid;
    const newBoard = [];
    const size = 8;
    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < size; j += 1) {
        let selected = false;
        if (
          parseInt(currentCoords[0]) === i &&
          parseInt(currentCoords[1]) === j
        ) {
          selected = true;
        }
        newBoard.push({
          key: `${i} ${j}`,
          content: grid[i][j],
          visible: false,
          selected,
        });
      }
    }
    for (let i = 0; i < players[0].attacksMade.length; i += 1) {
      const x = players[0].attacksMade[i][0];
      const y = players[0].attacksMade[i][1];
      const attackIndex = parseInt(x) * 8 + parseInt(y);
      newBoard[attackIndex].visible = true;
    }
    return newBoard;
  };

  return (
    <div>
      <Paper>
        <div className={classes.boardGrid}>
          {generateBoard(props.gameboards[props.boardIndex]).map(item => (
            <div key={item.key} className={classes.boardCell}>
              <HiddenButton
                disableRipple
                onClick={() => props.handleClick(item.key)}
                value={item.key}
              >
                <AttackGameTile
                  content={item.content}
                  alignment={item.alignment}
                  visible={item.visible}
                  type="attack"
                  selected={item.selected}
                />
              </HiddenButton>
            </div>
          ))}
          <ScreenOverlay />
        </div>
      </Paper>
    </div>
  );
};

export default AttackBoard;
