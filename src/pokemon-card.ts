import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Pokemon } from "./pokemon-gridview";
import './type-indicator';

@customElement('pokemon-card')
export class PokemonCard extends LitElement {
    @property({type: Object}) pokemon!: Pokemon

    render() {
        if (!this.pokemon) {
            return html`<div class="card"><p>No data</p></div>`;
        }
        return html`
            <div class="card">
                <img src=${String(this.pokemon.sprite)} alt=${String(this.pokemon.name)} />
                <hr />
                <div class="info">
                    <div class="name">${this.pokemon.name}</div>
                    <div class="types">${this.pokemon.types.map(({type: {name}}) => html`<type-indicator .type=${name}></type-indicator>`)}</div>
                </div>
            </div>
        `
    }

    static styles = css`
        .card {
            border: 1px solid #ccc;
            border-radius: 12px;
            padding: 0.5rem;
            text-align: center;
            background: #f9f9f9;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        img {
            width: 96px;
            height: 96px;
        }
        .name {
            font-weight: bold;
            text-transform: capitalize;
            color: black;
        }
  `;
}