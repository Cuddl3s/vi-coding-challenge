import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getPokemon, type Pokemon } from "./api/pokemon";
import { getAllTypes } from "./api/types";
import './pokemon-card';
import './type-indicator';
import './pokemon-card-skeleton';

@customElement('pokemon-gridview')
export class PokemonGridview extends LitElement {

    @state() private pokemonList: Pokemon[] = []
    @state() private types: string[] = []
    @state() private selectedTypes: string[] = []
    @state() private loading: boolean = false
    @state() private loadingTypes: boolean = false
    @property({ type: Number }) page = 1;
    @property({ type: String }) headline = '';

    async loadData(){
        this.loading = true;
        this.pokemonList = await getPokemon(this.selectedTypes,this.page - 1);
        console.log(this.pokemonList)
        this.loading = false;
    }

    async loadTypes(){
        this.loadingTypes = true
        this.types = await getAllTypes();
        this.loadingTypes = false
    }
    
    connectedCallback(): void {
        super.connectedCallback()
        this.loadData()
        this.loadTypes()
    }

    private toggleType(type: string, e: Event) {
        const checked = (e.target as HTMLInputElement).checked;
        if (checked) {
            this.selectedTypes = [...this.selectedTypes, type];
        } else {
            this.selectedTypes = this.selectedTypes.filter(t => t !== type);
        }
        this.page = 1;
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
        return html`
            <div class="container" >
                <h1>${this.headline}</h1>
                <div class="filter-and-grid-container">
                    <div class="filter-panel">
                        <h2>Filter</h2>
                        <h3>Type</h3>
                        <ul class="type-list">
                            ${this.loadingTypes ? 
                                Array.from({length: 23}).map(() => html`<li></li>`): 
                                this.types.map(type => html`
                                <li>
                                    <label class="type-filter">
                                        <input 
                                            type="checkbox"
                                            .checked=${this.selectedTypes.includes(type)}
                                            @change=${(e: Event) => this.toggleType(type, e)}
                                        />
                                        ${type}
                                        <type-indicator .type=${type}></type-indicator>
                                    </label>
                                </li>
                            `)}
                        </ul>
                    </div>
                    <div class="grid-container">
                        <div class="grid">
                            ${this.loading ? Array.from({ length: 20 }).map(() => html`<pokemon-card-skeleton></pokemon-card-skeleton>`)
                            : (
                                this.pokemonList.map(pokemon => html`<pokemon-card .pokemon=${pokemon}></pokemon-card>`)
                            )}
                        </div>
                        <div class="controls">
                            <button ?disabled=${this.page === 0} @click=${this.prevPage}>
                                <
                            </button>
                            <span>${(this.page - 1) * 20} - ${this.page * 20}</span>
                            <button @click=${this.nextPage}>></button>
                        </div>
                    </div>
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

        .filter-and-grid-container {
            display: flex;
            gap: 16px;
        }

        .filter-panel {
            min-width: 200px;
            border: 1px solid #ccc;
            border-radius: 12px;
            padding: 0.5rem;
            background: #f9f9f9;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            color: black;
        }

        .grid-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .controls {
            text-align: end;
        }

        .type-list {
            list-style: none;
            padding: 0 16px;
            
        }
        .type-list label {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            text-transform: capitalize;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
        }
        .centered {
            text-align: center;
        }
  `;
}