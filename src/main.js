import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import {Pokemon, PokemonTeam} from "./pokemon.js";

const currentTeam = new PokemonTeam();


function pokeAPIRequest(pokemonName){

  let pokeRequest = new XMLHttpRequest();
  const pokeurl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  pokeRequest.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
      const response = JSON.parse(this.responseText);
      currentTeam.roster.push(response);
      appendPokemon();
    }
  }

  pokeRequest.open("GET", pokeurl, true);
  pokeRequest.send();

  // $('.output').text("");

  console.log(currentTeam);

}

function appendPokemon() {
  $(".output").empty();
  for (let i = 0; i < currentTeam.roster.length; i++){
    console.log(`roster: ${currentTeam.roster}, index: ${[i]}`);

    if(currentTeam.roster[i] != null){
        $('.output').append(`<div class="card"><img class="${currentTeam.roster[i].name}${i}" src="${currentTeam.roster[i].sprites.front_default}"></div>`);
        $(`.card`).click(function() {
          currentTeam.roster[i] = null;
          console.log("image click event");
          this.remove();
          // appendPokemon();
        })
      }
  }

}

function pokemonNullChecker(pokemon){
  if (pokemon.sprites.front_default != null) {
      return true;
  } else {
    return false;
  }
}




$(document).ready(function(){


  $('.poke-random').click(function() {
    console.log('click');
    randomTeam();
  });

  $(".poke-button").click(function(event){
    event.preventDefault();
    console.log(currentTeam.pokeCounter());
    const pokeName = $('.poke-input').val().toLowerCase();

    if( currentTeam.pokeCounter() < 6) {
      pokeAPIRequest(pokeName);
    }
    });





  $('.poke-remove').click(function() {
    currentTeam.roster = [];
    $(".output").empty();
    console.log(currentTeam);
  })

  function randomTeam() {
    currentTeam.roster = [];
    $(".output").empty();
    $(".poke-random").off('click');
    setTimeout(function() {
      $(".poke-random").on('click', randomTeam);
    }, 2500);

      for (let i = 0; i < 6; i++) {
        let pokeRequest = new XMLHttpRequest();
        const pokeurl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=964`;


        pokeRequest.onreadystatechange = function(){
          if(this.readyState === 4 && this.status === 200){
            const response = JSON.parse(this.responseText);
            let randomNum = Math.floor(Math.random()  * response.results.length)
              pokeAPIRequest(response.results[randomNum].name);

          }
        }

        pokeRequest.open("GET", pokeurl, true);
        pokeRequest.send();
      }

      if(currentTeam.roster > 6) {
        console.log('bonus pokemon detected! POP POP!');
        currentTeam.roster.pop();
        currentTeam.roster.pop();
      }
    }






});
