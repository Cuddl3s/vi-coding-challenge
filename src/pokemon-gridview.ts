import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getPokemonList } from "./api/pokemon";
import './pokemon-card';

type Type = {
    slot: number;
    type: {
        name: String;
        url: String;
    }
}

export type Pokemon = {
    id: number;
    name: String;
    sprite: String;
    types: Type[]
}

@customElement('pokemon-gridview')
export class PokemonGridview extends LitElement {

    @state() private pokemonList: Pokemon[] = []
    @state() private loading: boolean = false
    @property({ type: Number }) page = 1;

    constructor() {
        super();
        this.pokemonList = []
    }

    async loadData(){
        this.loading = true;
        this.pokemonList = await getPokemonList(20, this.page - 1);
        console.log(this.pokemonList)
        this.loading = false;
    }
    
    connectedCallback(): void {
        super.connectedCallback()
        this.loadData()
    }

    private nextPage() {
        this.page++;
        this.loadData();
    }

    private prevPage() {
        if (this.page > 1) {
            this.page--;
            this.loadData();
        }
    }

    render() {
        return this.loading ? html`<p>Loading...</p>` : html`
        <div class="container" >
            <h1>Pokemon List</h1>
            <div class="grid">
                ${this.pokemonList.map(item => html`<pokemon-card .pokemon=${item}></pokemon-card>`)}
            </div>
            <div class="controls">
                <button ?disabled=${this.page === 0} @click=${this.prevPage}>
                    Previous
                </button>
                <button @click=${this.nextPage}>Next</button>
            </div>
        </div>
        `
    }

    static styles = css`
        :host {
            flex: 1;
        }
        .container {
            padding: 0 32px;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 1rem;
        }
  `;
}