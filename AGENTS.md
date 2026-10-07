# エージェントへの指示

UI を作る・直す・レビューする前に、必ず [`design-system/INDEX.md`](design-system/INDEX.md) を読む。

## 読み方

- INDEX の表で、いまの工程と観点に印のあるファイルだけを読む。`design-system/` を全部読まない。
- 値は `design-system/tokens/tokens.json` が正本。ほかの場所の値と食い違ったら tokens を信じ、食い違いを `work/feedback.md` に記録する。
- 正本に「（例）」や `<!-- 書き換える -->` が残っていたら、仮の基準として使い、成果物の「前提と未決」に「正本が例のまま」と書く。

## 工程ごとの skill

| 工程 | skill |
|---|---|
| 画面を考える（PRD から案と仕様まで） | `design-builder` |
| できたものを観点別に見る | `design-review` |
| 気づきを正本へ還元する | `promote-feedback` |

## してはいけないこと

- `design-system/` を直接書き換えない。変えるのは `promote-feedback` で人の返事をもらってからだけ。
- 正本に無い部品・色・言葉を正本に足さない。要るときは `work/` の中でだけ組み、外した箇所に FB の ID を書いて台帳に記録する（書き方は `work/feedback.md`）。
- 推測で埋めない。決まらないところは質問するか、「未決」と書いて先へ進む。
- 作業の出力は `work/` の下に置く。`design-system/screens/` に入れるのは、`screens/README.md` の手順の PR だけ。マージは人がする。
