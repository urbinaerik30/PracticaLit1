import { LitElement, html, css } from "lit";
import pokemon123 from "/pokemonData.js";

export class PrincipalPokemon extends LitElement {
  static properties = {
    tipo: { type: String },
    selectedPokemonName : { type: String }
  };

  constructor() {
    super();
  
    this.pokemonData = pokemon123.pokemon;

  }

  static styles = [
    css`
    :root{
        --grupo1: red;
        --grupo2: blue;
        --grupo3: green;
    }
    
    
      
      .A {
        background-color: var(--grupo1); 
    
      }
      
      .B {
        background-color: var(--grupo2); 
      }
      
      .C {
        background-color: var(--grupo3); 
      }
    
    
      .combo{
        background-color: aqua;
        color: blue;
        border: 1px solid black;
      }
    
    .image{
      display: flex;
      justify-content: left;
      border: 1px solid red;
    }
    
      .image__img{
        width: 90px;
        height: 90px;
        border: 1px solid black;
    
       
        
      }
    
      .image__titulo{
       
        left: 0px;
        border: 1px solid black;
      }
    

      .image2{
        display: flex;
        justify-content: left;
        border: 1px solid red;
      }
      
        .image__img2{
          width: 90px;
          height: 90px;
          border: 1px solid black;
      
         
          
        }
      
        .image__titulo2{
         
          left: 0px;
          border: 1px solid black;
        }
    
    
      
    `,
  ];




  render() {
    const filtrar = this.pokemonData.filter((pokemon) => pokemon.rarity === this.tipo);
    const allPokemonNames = this.pokemonData.map((pokemon) => pokemon);


    return html`
    

    <div>
      <select class="combo" @change="${this.handleGroupChange}">
        <option value="legendary">Legendary</option>
        <option value="normal">Normal</option>
        <option value="mythic">Mythic</option>
      </select>

      <select class="combo" @change="${this.handleSortOrderChange}">
      <option value="asc">A-Z</option>
      <option value="desc">Z-A</option>
      </select>

      <div class="image">
        ${filtrar
          
                .slice() 
                .sort((a, b) => {
                 
                  if (this.orden === "asc") {
                    return a.name.localeCompare(b.name);
                  } else if (this.orden === "desc") {
                    return b.name.localeCompare(a.name);
                  }
                  return 0;
                })

            .map(
          (pokemon) => html`
            <div class="image__container">
              <img
                class="image__img"
                src="${pokemon.img}"
                alt="${pokemon.name}"
                @click="${() => this.handleImageClick(pokemon.name)}"
                
              />
              <p class="image__titulo">${pokemon.name}</p>
            </div>
          `
        )}
            <div class="image2">
            ${allPokemonNames
                .slice() 
                .sort((a, b) => {
                 
                  if (this.orden === "asc") {
                    return a.name.localeCompare(b.name);
                  } else if (this.orden === "desc") {
                    return b.name.localeCompare(a.name);
                  }
                  return 0;
                })
                .map(
                (pokemon) => html`
              <div class="image__container2">
              <img
                class="image__img2"
                src="${pokemon.img}"
                alt="${pokemon.name}"
                @click="${() => this.handleImageClick(pokemon.name)}"
               />
               <p class="image__titulo">${pokemon.name}</p>
                </div>
            </div>  `
            )}
      </div>
    </div>
    
    
    `;
  }

  handleGroupChange(event) {
    this.tipo = event.target.value;
     const nameContainer1 = this.shadowRoot.querySelector('.image');

    try {
    const nameContainer = this.shadowRoot.querySelector('.image2');
    nameContainer.remove("image2");
    this.requestUpdate(); 
    } catch (error) {
     
    }



    // if (nameContainer1.contains("image_container")) {
       
    // } else {
    //     nameContainer1.add("image_container");
    // }
  }


  handleSortOrderChange(event){
    this.orden = event.target.value;
    this.requestUpdate(); 
  }

  handleImageClick(name) {
    this.selectedPokemonName = name;
    this.requestUpdate();
    console.log(this.selectedPokemonName);
    // const nameContainer = this.shadowRoot.querySelector('.image')
    // nameContainer.remove("image");
    // this.requestUpdate(); 
  }



}

customElements.define("principal-pokemon", PrincipalPokemon);
