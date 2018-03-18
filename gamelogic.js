const DIMENSION = 3

const bingoCategories = [
  {
    category: 'Movies',
    choices: [
      'Titanic', 'Star Wars', 'Thor', 'Red Sparrow', 'Se7en', 'Guardians Of the galaxy','Matrix', 'Tomb Raider', 'Infinity War','Sex and the city',
      'Hulk', 'Inception', 'Lord of the rings', 'Casablanca', 'Dunkirk', 'Rambo', 'Notebook', 'John Wick', 'Taken', 'Interstellar'
    ]
  },
  {
    category: 'Pokemon',
    choices: [
      'Pikachu', 'Bulbasaur', 'Charizard', 'Mewtwo', 'Raichu', 'Squirtle', 'Charmander', 'Metapod', 'Caterpie', 'Lapras',
      'Taurus', 'Jigglipuff', 'Mr. Mine', 'Kangaskan', 'Butterfree', 'Eevee', 'Jynx', 'Odish', 'Ekans', 'Arbok'
    ]
  },
  {
    category: 'Bands',
    choices: [
      'Spice Girls', 'Scorpions', 'Backstreet Boys', 'KISS', 'AC/DC', 'Guns n Roses', 'Destiny\'s Child', 'Sugababes', 'Nirvana', 'Metallica',
      'Pink Floyd', 'Toto', 'Aerosmith', 'Radiohead', 'Coldplay', 'Linkin Park', 'Ramones', 'Muse', 'The Doors', 'REM'
    ]
  },
  {
    category: 'TV Series',
    choices: [
      'Jessica Jones', 'Sherlock', 'Luke Cage', 'Orange is the new black', 'How to get away with murder', 'This is us', 'Homeland', 'Vikings', 'Game of thrones', 'Blindspot',
      'Blacklist', 'Designated Survivor', 'Defenders', 'Iron fist', 'Dardevil', 'House of cards', 'Stranger Things', 'Black Mirror', 'The Flash', 'Arrow'
    ]
  },
  {
    category: 'Countries',
    choices: [
      'Greece', 'Italy', 'Albania', 'Bulgaria', 'The Netherlands', 'Belgium', 'France', 'Spain', 'Portugal', 'Denmark',
      'Austria', 'Poland', 'UK', 'Ireland', 'Turkey', 'Finland', 'Sweden', 'Korea', 'Canada', 'Brazil'
    ]
  },
  {
    category: 'Marvel Heroes',
    choices: [
      'Thor', 'Hulk', 'Cap', 'Black Widow', 'Loki', 'Vision', 'Iron-Man', 'Black panther', 'Dr Strange', 'Spiderman',
      'Dead Pool', 'Ant Man', 'Groot', 'Rocket', 'Wolverine', 'Scarlet-Witch', 'Star Lord', 'Gamora', 'Drax', 'Hawkeye'
    ]
  },
]

// returns a random category's name and available choices
function getRandomCategory(bingoCategories) {
  return bingoCategories[Math.floor(Math.random() * bingoCategories.length)]
}

const { category, choices } = getRandomCategory(bingoCategories)

const initialGrid = [
  [{value: '', selected: false}, {value: '', selected: false}, {value: '', selected: false}],
  [{value: '', selected: false}, {value: '', selected: false}, {value: '', selected: false}],
  [{value: '', selected: false}, {value: '', selected: false}, {value: '', selected: false}]
]

let gameGrid = [...initialGrid]

// adds a new word in the grid in the first empty cell and returns the grid
function putToGrid(gameGrid, value) {
  for (let i=0; i<gameGrid.length; i++) {
    for (let j=0; j<gameGrid[i].length; j++) {
      if (gameGrid[i][j].value === '') {
        gameGrid[i][j].value = value
        return gameGrid
      }
    }
  }
}

// returns 9 unique random words from the array
function getRandomSelections(choices) {
  return choices.sort(() => .5 - Math.random()).slice(0,9)
}
console.log(getRandomSelections(choices))

// test grid
let grid = [
  [{value: 'Titanic', selected: false}, {value: 'Star Wars', selected: false}, {value: 'Tomb Raider', selected: false}],
  [{value: 'Infinity War', selected: false}, {value: 'Guardians Of the galaxy', selected: false}, {value: 'Matrix', selected: false}],
  [{value: 'Red Sparrow', selected: false}, {value: 'Thor', selected: false}, {value: 'Se7en', selected: false}]
]

// test selections
let selections = [
  'Titanic', 'Star Wars', 'Thor', 'Red Sparrow', 'Se7en', 'Guardians Of the galaxy','Matrix', 'Tomb Raider', 'Infinity War'
]

// compares our grid against the selections array and for each match modifies the selected to true and returns a new array
function findMatches(grid, selections) {
  let matches = []
  for (let i=0; i< DIMENSION; i++) {
    matches.push(grid[i].map( cell => {
      if (selections.includes(cell.value)) {
        cell.selected = true
      }
      return cell
    }))
  }
  return matches
}

const matches = findMatches(grid, selections)

// helper array which contains the valid bingo combinations
const bingoCombs = [
  [[0,0], [0,1], [0,2]],
  [[1,0], [1,1], [1,2]],
  [[2,0], [2,1], [2,2]],
  [[0,0], [1,0], [2,0]],
  [[0,1], [1,1], [2,1]],
  [[0,2], [1,2], [2,2]],
  [[0,0], [1,1], [2,2]],
  [[2,0], [1,1], [0,2]],
]

// checks if the cells of the provided compination have the selected value to true and return boolean
function checkForMatch(grid, combinations) {
  const [opt1, opt2, opt3] = combinations
  return grid[opt1[0]][opt1[1]].selected === true && grid[opt2[0]][opt2[1]].selected === true && grid[opt3[0]][opt3[1]].selected === true
}

let bingoMatches = []

for (let i=0; i<bingoCombs.length; i++) {
  bingoMatches.push(checkForMatch(matches, bingoCombs[i]))
}

console.log(bingoMatches)
const points = bingoMatches.filter( match => {
  return match
}).length
console.log(points)
