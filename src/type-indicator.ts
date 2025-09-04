import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

@customElement('type-indicator')
export class TypeIndicator extends LitElement {
    @property({ type: String }) type: keyof typeof TYPE_COLORS = 'normal';

    updated() {
        this.style.setProperty('--type-color', TYPE_COLORS[this.type])
    }

    static styles = css`
        :host {
            width: 16px;
            height: 16px;
            display: inline-block;
            border-radius: 50%;
            background-color: var(--type-color);
            margin-right: 4px;
        }
    `

    render() {
        return html`<span title=${this.type}></span>`
    }
}