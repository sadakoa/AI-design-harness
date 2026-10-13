// <hl-badge tone="high|medium|low|neutral">High</hl-badge> — always shows its text, never color alone
class HlBadge extends HTMLElement {
  connectedCallback() {
    const tone = this.getAttribute("tone") || "neutral";
    const color = { high: "var(--hl-danger)", medium: "var(--hl-amber-600)", low: "var(--hl-text-muted)", neutral: "var(--hl-text-muted)" }[tone];
    this.innerHTML = `<span style="display: inline-block; padding: 0 var(--hl-space-2); border: 1px solid ${color}; color: ${color}; border-radius: 999px; font-size: 12px;">${this.innerHTML}</span>`;
  }
}
customElements.define("hl-badge", HlBadge);
