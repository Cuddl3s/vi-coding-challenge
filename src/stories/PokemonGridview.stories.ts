import type { Meta, StoryObj } from '@storybook/web-components';
import '../pokemon-gridview';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/PokemonGridview',
  component: 'pokemon-gridview',
  parameters: {
    docs: {
      description: {
        component:
          'A grid view for browsing Pokémon with type filters and pagination controls.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="min-width: 800px; width: 100%; margin: auto;">
      <pokemon-gridview headline="These are our products"></pokemon-gridview>
    </div>
  `
};

export const Loading: Story = {
  render: () => {
    const el = document.createElement('pokemon-gridview') as any;

    el.loadData = async function (){}
    el.loadTypes = async function () {}

    el.headline = 'These are our products';
    el.loading = true;
    el.loadingTypes = true;

    return html`
      <div style="min-width: 800px; width: 100%; margin: auto;">
        ${el}
      </div>
    `;
  },
};
