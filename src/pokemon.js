
export class PokemonTeam{
    constructor(){
      this.roster = [];
    }

    addPokemon(pokemon){
      this.battleRoster.push(pokemon);
    }

    pokeCounter() {
      let pokemon = 0;
      for(let i = 0; i < this.roster.length; i++){
          if (this.roster[i] != null) {
            pokemon++;
          }
      }
      return pokemon;
    }
}
