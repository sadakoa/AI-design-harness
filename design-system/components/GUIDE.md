# Choosing components

> Answers: Which component should I use?

This file is only about choosing. How each component behaves lives in `components/<name>.md` — copy `_template.md` to start one.

<!-- replace. Start with the pairs people mix up; don't list everything. -->

| When you want to | Use | Not | How to tell |
|---|---|---|---|
| (example) Confirm something briefly | Toast | Alert | Fine to miss it? Toast. They need to read it? Alert. |
| (example) Check before something can't be undone | Confirm dialog | Toast | Always confirm what can't be undone. |
| (example) Show details without leaving the list | Sheet | New page | If people go back and forth, use a sheet. |
| (example) Show a status | Text and icon | Color-only badge | See R-02 in `rules.md`. |
