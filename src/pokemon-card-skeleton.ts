import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("pokemon-card-skeleton")
export class PokemonCardSkeleton extends LitElement {
  render() {
    return html`
      <div class="card">
        <span class="number small"></span>
        <div class="skeleton image"></div>
        <hr />
        <div class="info">
          <div class="skeleton text name"></div>
          <div class="skeleton type"></div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .card {
      position: relative;
      border: 1px solid #ccc;
      border-radius: 12px;
      padding: 0.5rem;
      text-align: center;
      background: #f9f9f9;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .skeleton {
      background: linear-gradient(90deg, #eee, #ddd, #eee);
      background-size: 200% 100%;
      border-radius: 8px;
      animation: shimmer 1.5s infinite;
      margin: 0.5rem auto;
    }

    .number.skeleton {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 30px;
      height: 16px;
      border-radius: 4px;
      margin: 0;
    }

    .image {
      width: 128px;
      height: 128px;
      border-radius: 12px;
    }

    .text.name {
      height: 18px;
      width: 60%;
      border-radius: 4px;
    }

    .type {
      height: 18px;
      width: 40px;
      border-radius: 12px;
      margin-left: auto;
    }

    .info {
      display: flex;
      align-items: center;
      margin-top: 0.5rem;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `;
}
