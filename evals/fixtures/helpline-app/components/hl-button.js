// <hl-button variant="primary|secondary|danger">Label</hl-button>
class HlButton extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute("variant") || "secondary";
    const colors = {
      primary: "background: var(--hl-primary); color: var(--hl-white); border-color: var(--hl-primary);",
      secondary: "background: var(--hl-surface); color: var(--hl-text); border-color: var(--hl-border);",
      danger: "background: var(--hl-surface); color: var(--hl-danger); border-color: var(--hl-danger);",
    };
    this.innerHTML = `<button style="font: inherit; padding: var(--hl-space-2) var(--hl-space-3); border: 1px solid; border-radius: var(--hl-radius); cursor: pointer; ${colors[variant]}">${this.innerHTML}</button>`;
  }
}
customElements.define("hl-button", HlButton);
