import { sound } from "../data/sound.js";
import Home from "./home.js";

const How = (_ => {

  const $hangman = document.querySelector(".hangman");

  const init = _ => {
    render();
    listeners();
  }
  const listeners = _ => {
    document.querySelector('.hangman__trigger').addEventListener("click", _ => {
      sound.click.play();
      Home.init();
    })
  }
  const render = _ => {
    let markup = `
      <h1 class="hangman__title">Instructions</h1>
      <ul class="how">
        <li>Try to guess the word within the given lives</li>
        <li><a href="https://www.iup.edu/teachingexcellence/reflective-practice/past-events/2008-09/sample-games-to-be-used-in-the-classroom/instructions-for-playing-hangman/" target="_blank">Link</a></li>
      </ul>
      <button class="button hangman__trigger">Main Menu</button>
    `
    $hangman.innerHTML=markup;

  }

  
  return {
    init
  }
})();

export default How;