import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../pokemon-card';
import type { Pokemon } from '../api/pokemon';

const meta: Meta = {
  title: 'Components/PokemonCard',
  component: 'pokemon-card',
};
export default meta;

type Story = StoryObj;

const samplePokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  types: [
    { type: { name: 'grass', url: '' }, slot: 1 },
    { type: { name: 'poison', url: '' }, slot: 2 },
  ],
};

export const Default: Story = {
  render: () => html`
    <div style="min-width: 200px; width: 100%; margin: auto;">
      <pokemon-card .pokemon=${samplePokemon}></pokemon-card>
    </div>
  `,
};

export const SingleType: Story = {
  render: () => {
    const singleTypePokemon: Pokemon = {
      id: 4,
      name: 'charmander',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      types: [{ type: { name: 'fire', url: '' }, slot: 1 }],
    };
    return html`
      <div style="min-width: 200px; width: 100%; margin: auto;">
        <pokemon-card .pokemon=${singleTypePokemon}></pokemon-card>
      </div>
    `;
  },
};
