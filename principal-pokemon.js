import { LitElement, html, css } from "lit";
import pokemon123 from "/pokemonData.js";

export class PrincipalPokemon extends LitElement {
  static properties = {
    tipo: { type: String },
    selectedPokemonName: { type: String },
    mostrarImagenes: { type: Boolean },
    mostrarImagenes2: { type: Boolean },
    // inputText: { type: String }
  };

  constructor() {
    super();

    this.pokemonData = pokemon123.pokemon;

    this.mostrarImagenes = true;
    this.mostrarImagenes2 = true;
    // this.inputText = "";

    // text_search: "";
  }

  static styles = [
    css`
      body {
        border: 1px solid green;
        position: relative;
        min-width: 1290px;
        width: 100%;
        height: 100vh;
        min-height: 100vh;
        overflow: auto;
        overflow-x: hidden;
      }

      @media (max-width: 768px) {
        body {
          font-size: 14px;
          overflow: auto;
          overflow-x: hidden;
        }
        .header {
          text-align: center;
          font-size: 14px;
        }
        .combo {
          font-size: 14px;
        }
        .image__titulo {
          font-size: 12px;
        }

        .image {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          border: 1px solid red;
        }

        .allContainer {
          background-size: contain;
        }
      }

      @media (min-width: 769px) and (max-width: 1024px) {
        body {
          font-size: 18px;
          overflow: auto;
          overflow-x: hidden;
        }
        .header {
          text-align: left;
          font-size: 16px;
        }
        .combo {
          font-size: 16px;
        }
        .image__titulo {
          font-size: 16px;
        }
        .image {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          border: 1px solid red;
        }
        .allContainer {
          background-size: contain;
        }
      }

      @media (min-width: 1025px) {
        body {
          font-size: 20px;
          overflow: auto;
          overflow-x: hidden;
        }
        .header {
          font-size: 18px;
        }
        .combo {
          font-size: 18px;
        }
        .image__titulo {
          font-size: 18px;
        }
      }

      .AllContainer {
        align-items: flex-start;
        border: 1px solid green;
        /* position: relative;
      min-width: 1290px;
      width: 100%;
      height: 100%;
      min-height: 100vh; */

        border: 4px solid yellow;
        background-image: url("fondo.jpg");
        background-size: cover;
        background-repeat: no-repeat;
      }

      .header {
        position: relative;

        background-image: url("subfondo.jpg");
        background-size: contain;
        background-repeat: repeat;
        text-align: center;
        padding: 10px;
      }

      .combo {
        background-color: aqua;
        color: blue;
        border: 1px solid black;
      }

      .image {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        border: 1px solid red;
        font-weight: bold;
      }

      .image:hover {
        background-image: url("fondo.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-color: #ffffff;
        color: #04b4e0;
      }

      .image__img:hover {
        background-color: #007bff;

        border: 2px solid #007bff;
      }

      .image__container {
        align-items: center;
        text-align: center;
        border: 1px solid blue;
      }

      .image__img {
        width: 90px;
        height: 90px;
        border: 3px solid black;
        border-radius: 20rem;
      }

      .image__titulo {
        left: 0px;
        border: 1px solid black;
      }

      .image2:hover {
        background-image: url("fondo.jpg");
        background-size: cover;
        background-repeat: no-repeat;
      }

      .image2 {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        border: 1px solid red;
        font-weight: bold;
      }

      .image__img2:hover {
        background-color: #007bff;

        border: 2px solid #007bff;
      }

      .image__container2 {
        border: 1px solid blue;
        align-items: center;
        text-align: center;
      }

      .image__img2 {
        width: 90px;
        height: 90px;
        border: 3px solid black;
        border-radius: 20rem;
      }

      .image__titulo2 {
        border: 1px solid purple;
      }

      .image__filter {
        border: 3px solid black;
      }
    `,
  ];

  render() {
    const filtrar = this.pokemonData.filter(
      (pokemon) => pokemon.rarity === this.tipo
    );
    const filtrarUnico = this.pokemonData.filter(
      (pokemon) => pokemon.name === this.selectedPokemonName
    );
    const allPokemonNames = this.pokemonData.map((pokemon) => pokemon);

    //  const inputText = this.querySelector('.text_search').value()
    const resultadosFiltrados = filtrar.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.inputText)
    );

    return html`
      <section class="header">
        <h1 class="header__name">Erik Urbina y sus Pokemones</h1>
        <h2 class="header__sub">¡Atrápalos todos!</h2>
      </section>

      <select class="combo" @change="${this.handleGroupChange}">
        <option value="legendary">Legendary</option>
        <option value="normal">Normal</option>
        <option value="mythic">Mythic</option>
      </select>

      <select class="combo" @change="${this.handleSortOrderChange}">
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>

      <input
        type="text"
        class="text_search"
        placeholder="Buscar pokemon"
        @input="${this.handleSearchInputChange}"
      />

      <div class="AllContainer">
        ${this.mostrarImagenes2
          ? resultadosFiltrados.map(
              (pokemon) => html`
                <div class="image__filter">
                  <img
                    class="filter__img"
                    src="${pokemon.img}"
                    alt="${pokemon.name}"
                    @click="${() => this.handleImageClick(pokemon.name)}"
                  />
                  <p class="filter__titulo">${pokemon.name}</p>
                </div>
              `
            )
          : ""}

        <div class="image">
          ${this.mostrarImagenes
            ? html`
                ${filtrar

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
              `
            : html` ${filtrarUnico.map(
                (pokemon) => html`
                  <div class="image__container2">
                    <img
                      class="image__img2"
                      src="${pokemon.img}"
                      alt="${pokemon.name}"
                      @click="${() => this.handleImageClick(pokemon.name)}"
                    />
                    <p class="image__titulo">${pokemon.name}</p>
                    <p class="image__number">${pokemon.num}</p>
                    <p class="image__titulo">${pokemon.name}</p>
                    <p class="image__info">${pokemon.about}</p>
                  </div>
                `
              )}`}

          <div class="image2">
            ${allPokemonNames

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
    </div> 
    
    
 
    `
              )}
          </div>
        </div>
      </div>

      <footer class="user-info__footer">&copy; 2023 Erik Urbina WEB</footer>
    `;
  }

  handleGroupChange(event) {
    this.tipo = event.target.value;
    // const nameContainer1 = this.shadowRoot.querySelector(
    //   ".image image__container"
    // );

    try {
      const nameContainer = this.shadowRoot.querySelector(".image2");
      nameContainer.remove("image2");
    } catch (error) {}

    this.mostrarImagenes = true;
    this.requestUpdate();
  }

  handleSortOrderChange(event) {
    this.orden = event.target.value;
    this.requestUpdate();
  }

  handleImageClick(name) {
    this.selectedPokemonName = name;
    this.requestUpdate();
    console.log(this.selectedPokemonName);
    //
    this.requestUpdate();
    this.mostrarImagenes = false;
  }

  handleSearchInputChange(event) {
    //    const inputText = event.target.value.toLowerCase();

    //   if(inputText.length < 4){
    //     console.log("Teclea más");
    //   }else{
    //   this.resultadosFiltrados = this.pokemonData.filter((pokemon) =>
    //     pokemon.name.toLowerCase().includes(inputText)
    //   );
    //   this.requestUpdate();
    //   console.log(this.resultadosFiltrados);
    // }

    this.inputText = event.target.value.toLowerCase();
    if (this.inputText.length < 4) {
      this.mostrarImagenes2 = false;
      this.mostrarImagenes = true;
    } else {
      this.mostrarImagenes2 = true;
      this.mostrarImagenes = false;
      this.requestUpdate();
    }
  }
}

customElements.define("principal-pokemon", PrincipalPokemon);
