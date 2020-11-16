import Home from './home.js';
import End from './end.js'
import Canvas from './canvas.js';

import {sound} from '../data/sound.js';

const Game = (_ => {
  const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const words = ['apple', 'banana', 'cat', 'dog', 'elephant', 'computer'];

  let chosenWord;
  let guessingWord;
  let lives;
  let guesses;

  //cache the DOM

  const $hangman = document.querySelector('.hangman');

  const init = _ => {
    chosenWord = chooseWord();
    guessingWord = Array(chosenWord.length).fill("_");
    // console.log(guessingWord);
    guesses = [];
    lives = 7;
    // show initial screen screen or page
    showInitPage();
    listeners();
    Canvas.init();
  }
  const listeners = _ => {
    $hangman.addEventListener('click', event => {
      if (event.target.matches('.hangman__letter')) {
        sound.click.play();
        check(event.target.innerHTML);
      } 
      if (event.target.matches('.hangman__trigger')) {
        sound.click.play();
        Home.init();
      }
    })
  }

  const isAlreadyTaken = letter => {
    return guesses.includes(letter);
  }
  const check = guess => {
    if (isAlreadyTaken(guess)) {
      return;
    }
    guesses.push(guess);
    //check if the guess exists in chosen word
    if (chosenWord.includes(guess)) {
      //update the guessing word
      updateGuessingWord(guess);
    } else {
      lives--;
      Canvas.setLives(lives);
    }
    render();
    isGameOver();
  }

  const hasWon = _ => guessingWord.join("") === chosenWord;

  const hasLost = _ => lives <= 0;
  const isGameOver = _ => {
    if (hasWon()) {
      sound.win.play();
      // End.
      End.setState({
        chosenWord: chosenWord,
        winOrLose: 'win'
      })
    }
    if (hasLost()) {
      sound.win.play();
      End.setState({
        chosenWord: chosenWord,
        winOrLose: 'lose'
      })
    }
  }
  const render = _ => {
    document.querySelector('.hangman__lives').innerHTML = lives;
    document.querySelector('.hangman__word').innerHTML = guessingWord.join("");
    document.querySelector('.hangman__letters').innerHTML = creatLetters();
  }
  const updateGuessingWord = letter => {
    chosenWord.split("").forEach((elem, index) => {
      if (elem === letter) {
        guessingWord[index] = elem; //update  _ to the letter when they match
        console.log(guessingWord);
      }
    })
  }
  const showInitPage = _ => {
    let markup = `
      <p class="hangman__stats">Lives:
        <span class="hangman__lives">${lives}</span>
      </p>
      <h1 class="hangman__title">Hangman</h1>
      <canvas class="hangman__board" height="155px"></canvas>
      <div class="hangman__word">${guessingWord.join("")}</div>
      <p class="hangman__instructions">Pick a letter below to guess the whole word.</p>
      <ul class="hangman__letters">
        ${creatLetters()}
      </ul>
      <button class="button hangman__trigger">Main Menu</button>
    `
    $hangman.innerHTML = markup;
  }

  const creatLetters = _ => {
    let markup = ``;

    letters.forEach(letter => {
      const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' : '';
      markup += `
        <li class="hangman__letter ${isActive}">${letter}</li>
      `
    })
    return markup;
  }

  const chooseWord = _ => {
    let randNum = Math.floor(Math.random() * words.length);
    return words[randNum];
  }
  //1. choose a random word chosenword = chooseWord(); //apple
  
  //apple
  // -----

  return {
    init
  }
})();

export default Game;