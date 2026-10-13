// <hl-dialog heading="Close 3 requests?">Body</hl-dialog> — call .open() and .close()
class HlDialog extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<dialog style="border: 1px solid var(--hl-border); border-radius: var(--hl-radius); padding: var(--hl-space-6);"><h2 style="margin-top: 0; font-size: 18px;">${this.getAttribute("heading") || ""}</h2>${this.innerHTML}</dialog>`;
  }
  open() { this.querySelector("dialog").showModal(); }
  close() { this.querySelector("dialog").close(); }
}
customElements.define("hl-dialog", HlDialog);
