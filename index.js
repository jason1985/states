let states = document.getElementsByClassName('state')[0]
let question = document.getElementById('state')
let score = document.getElementById('score')
let scoreNum = 0
let statesArray = Array.from(states.children)
let currentState

//get list of states

let statesList = []

Array.from(states.children).forEach((element) => {
  statesList.push(element.children[0].innerHTML)
})

function getNewState() {
  if (statesList.length === 0) {
    question.innerHTML = 'All States found!'
    return
  }
  currentState = statesList[Math.floor(Math.random() * statesList.length)]
  question.innerHTML = `Click on: ${currentState}`
}

getNewState()
resetMap()

function removeCurrentState() {
  statesList = removeItemOnce(statesList, currentState)
}

//reset all unfound states to default color after new current state is picked
//onclick checks if it matches current state if so then green & remove it from array and next current state & setattr found

statesArray.forEach((element) => {
  element.addEventListener('click', (e) => {
    //gets the state name
    let check = element.children[0].innerHTML
    if (element.getAttribute('found') === 'false') {
      if (check === currentState) {
        element.setAttribute('found', 'true')
        element.style.fill = 'green'

        removeCurrentState()
        resetColors()
        getNewState()
      } else {
        //clicked on the wrong state
        if (element.style.fill !== 'red') {
          scoreNum++
          score.innerHTML = `Number of Guesses: ${scoreNum}`
          element.style.fill = 'red'
        }
      }
    }
  })
})

function resetMap() {
  statesArray.forEach((element) => {
    element.setAttribute('found', 'false')
  })
}

function resetColors() {
  statesArray.forEach((element) => {
    if (element.getAttribute('found') === 'false') {
      element.style.fill = '#3f3c3c'
    }
  })
}

function removeItemOnce(arr, value) {
  let index = arr.indexOf(value)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}
