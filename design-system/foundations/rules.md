# Rules

> Answers: What must we never do, and who catches it?

Hard limits live here and nowhere else. Other files point to them by ID. If a machine can catch it, let the machine catch it.

<!-- replace. Never renumber; mark retired rules as retired instead of deleting them. -->

| ID | Rule | Why | Caught by |
|---|---|---|---|
| R-01 | Use tokens for color, spacing, radius and type. Things with no token yet — border width, sizes, line height — can be written directly. | Values copied around get missed when they change. | `npm run check` for colors and variable names. Review (parts) for the rest. |
| R-02 | Don't rely on color alone. Add text or an icon. | Not everyone can tell colors apart. | Review (parts) |
| R-03 | One primary action per screen. Don't use `color.action.primary` for decoration. | Two main actions means neither is main. | Review (layout) |
| R-04 | Don't stack confirmation dialogs. | People lose track of where they are. | Review (layout) |
| R-05 | Keep work in progress off the screen: version names, notes, file paths, state switchers. | It means nothing to users and breaks the illusion. | Review (copy) |
