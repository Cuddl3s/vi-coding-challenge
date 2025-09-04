import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import './type-indicator';
import type { Pokemon } from "./api/pokemon";

@customElement('pokemon-card')
export class PokemonCard extends LitElement {
    @property({type: Object}) pokemon!: Pokemon

    render() {
        if (!this.pokemon) {
            return html`<div class="card"><p>No data</p></div>`;
        }
        return html`
            <div class="card">
                <a href="#">
                    <span class="number">#${this.pokemon.id}</span>
                    <img src=${String(this.pokemon.sprite)} alt=${String(this.pokemon.name)} />
                    <hr />
                    <div class="info">
                        <div class="name">${this.pokemon.name}</div>
                        <div class="types">${this.pokemon.types.map(({type: {name}}) => html`<type-indicator .type=${name}></type-indicator>`)}</div>
                    </div>
                </a>
            </div>
        `
    }

    static styles = css`
        .number {
            position: absolute;
            top: 8px;
            right: 8px;
            color: black;
            font-weight: bold;
        }
        .card {
            position: relative;
            border: 1px solid #ccc;
            border-radius: 12px;
            padding: 0.5rem;
            text-align: center;
            background: #f9f9f9;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        img {
            width: 128px;
            height: 128px;
        }
        .name {
            font-weight: bold;
            text-transform: capitalize;
            color: black;
            flex: 1;
        }
        .info {
            display: flex;
        }
  `;
}