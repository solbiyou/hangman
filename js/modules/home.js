import Game from "./game.js";
import How from "./how.js";
import {sound} from "../data/sound.js";

const Home = (_ => {
  //cache DOM
    const $hangman = document.querySelector(".hangman");



  const init = _ => {
    render();
    listeners();
  }

  const render = _ => {
    let markup = '';
    markup += `
      <h1 class="hangman__title">Hangman</h1>
      <button class="button start">New Game</button>
      <button class="button instructions">Instructions</button>
    `
    $hangman.innerHTML = markup;
  }

  const listeners = _ => {
    document.querySelector(".start").addEventListener("click", () => {
      Game.init();
      sound.click.play();
    })
    document.querySelector(".instructions").addEventListener("click", () => {
      How.init();
      sound.click.play();
    })

  }


  return {
    init
  }
})();


export default Home;

