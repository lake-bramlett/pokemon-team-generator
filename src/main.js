import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import {Pokemon, PokemonTeam} from "./pokemon.js";

const currentTeam = new PokemonTeam();



$(document).ready(function(){



  $(".poke-button").click(function(event){
    event.preventDefault();
    if(currentTeam.roster.length < 6) {
      const pokeName = $('.poke-input').val().toLowerCase();

      let pokeRequest = new XMLHttpRequest();
      const pokeurl = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

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


    $('.poke-remove').click(function() {
      currentTeam.roster = [];
      $(".output").empty();
      console.log(currentTeam);
    })



  });

  function appendPokemon() {
    $(".output").empty();
    for (let i = 0; i < currentTeam.roster.length; i++){
      console.log(`roster: ${currentTeam.roster}, index: ${[i]}`);

      if(currentTeam.roster[i] != null){
          $('.output').append(`<div class="card"><img class="${currentTeam.roster[i].name}${i}" src="${currentTeam.roster[i].sprites.front_default}"></div>`);
          $(`img.${currentTeam.roster[i].name}${i}`).click(function() {
            currentTeam.roster.splice([i]);
            console.log("image click event");
            this.remove();
          })
        }
    }

  }



})
