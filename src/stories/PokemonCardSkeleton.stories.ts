import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../pokemon-card-skeleton';

const meta: Meta = {
  title: 'Components/PokemonCardSkeleton',
  component: 'pokemon-card-skeleton',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="min-width: 200px; width: 100%; margin: auto;">
      <pokemon-card-skeleton></pokemon-card-skeleton>
    </div>
  `,
};