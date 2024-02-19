'use strict';

// 1. Add new tetrimino
// 2. Create style for new tetriminoes
// 3. Add function for random return figure
// 4. Centuring figure undependent from width

const PLAY_FIELD_COLUMNS = 10;
const PLAY_FIELD_ROWS = 20;
const TETRIMINO_NAMES = [
  'O',
  'J'
];
const TETRIMINOES = {
  'O': [
    [1,1],
    [1,1]
  ],
  'J': [
    [1,0,0],
    [1,1,1],
    [0,0,0],
  ]
};

function convertPositionToIndex(row, column) {
  return row * PLAY_FIELD_COLUMNS + column;
}

let playfield;
let tetromino;


function generatePlayField() {
  for (let i = 0; i < PLAY_FIELD_ROWS * PLAY_FIELD_COLUMNS; i++) {
    const div = document.createElement('div');
    document.querySelector('.grid').append(div);
  }

  playfield = new Array(PLAY_FIELD_ROWS).fill()
    .map( () => new Array(PLAY_FIELD_COLUMNS).fill(0) );
  // console.table(playfield);
}

function generateTetromino() {

  // there is we retern figure from index
  const name = TETRIMINO_NAMES[1];
  const matrix = TETRIMINOES[name];

  // console.log(matrix);
  tetromino = {
    name: TETRIMINO_NAMES[0],
    matrix,
    row: 3,
    column: 5
  }
}


generatePlayField();
generateTetromino();
const cells = document.querySelectorAll('.grid div');



function drawPlayField() {
  for(let row = 0; row < PLAY_FIELD_ROWS; row++) {
    for(let column = 0; column < PLAY_FIELD_COLUMNS; column++) {
      if(playfield[row][column] === 0) continue;

      const name = playfield[row][column];
      const cellIndex = convertPositionToIndex( row, column );
      
      // console.log(cellIndex);
      cells[cellIndex].classList.add(name);

    }
  }
}



function drawTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;


  for(let row = 0; row < tetrominoMatrixSize; row++) {
    for(let column = 0; column < tetrominoMatrixSize; column++) {
      if(!tetromino.matrix[row][column]) continue;

      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      
      console.log(cellIndex);
      cells[cellIndex].classList.add(name);
    }
    //column
  }
  //row
}

// convertPositionToIndex();
// drawTetromino();
// drawPlayField();



function draw() {
  cells.forEach(cell => cell.removeAttribute('class'));
  drawTetromino();
  drawPlayField();
}

draw();

document.addEventListener('keydown', onKeyDown);

function onKeyDown(eventKeyboard) {
  switch(eventKeyboard.key) {
    case 'ArrowDown':
      moveTetrominoDown();
      break;
    case 'ArrowLeft':
      moveTetrominoLeft();
      break;
    case 'ArrowRight':
      moveTetrominoRight();
      break;
}

  draw();
}

function moveTetrominoDown() {
  tetromino.row += 1;
}

function moveTetrominoLeft() {
  tetromino.column -= 1;
}

function moveTetrominoRight() {
  tetromino.column += 1;
}
