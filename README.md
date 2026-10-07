# AI-design-harness

人と AI が同じ判断基準で UI を作り、レビューで得たことを正本へ還元するための、デザインシステムの最小テンプレート。

## 3つの決まり

1. **問いごとに正本を1つにする。** 値・原則・禁則・言葉・部品・組み方を、それぞれ別のファイルが答える。どれが何に答えるかは [`design-system/INDEX.md`](design-system/INDEX.md) だけに書く。
2. **作るときとレビューするときで、読むものを変える。** 組み合わせは INDEX の表で決める。
3. **レビューで得たことを正本へ還元する。** 気づきは [`work/feedback.md`](work/feedback.md) に貯め、人が承認したものだけを正本に入れる。

## 構成

```
AI-design-harness/
├── AGENTS.md / CLAUDE.md     ← エージェントの入口
├── design-system/            ← 正本。中身と答える問いは INDEX.md
├── work/
│   ├── features/             ← 施策ごとの検討（案・提案・レビュー）
│   └── feedback.md           ← 気づきの台帳
├── .claude/skills/           ← design-builder（作る）・design-review（レビュー）・promote-feedback（還元）
├── .agents/skills            ← Codex 用。.claude/skills へのシンボリックリンク
├── scripts/                  ← check（正本の形の検査）・build-tokens（tokens.css を作る）
└── .github/                  ← PR ごとの check と CODEOWNERS
```

## 回し方

```
 PRD ──▶ design-builder ──▶ 提案（1枚の HTML） ──▶ design-review ──▶ 人のレビュー
                ▲                                        │
                │                                        ▼
         design-system/  ◀── 人が承認 ◀── promote-feedback ◀── work/feedback.md
```

| やりたいこと | 呼ぶもの | 書く場所 |
|---|---|---|
| 画面を考える | `/design-builder <PRDのパス>` | `work/features/<日付>-<slug>/` |
| できたものを見る | `/design-review <対象のパス>` | 同じ施策の `review.md`。ほかでも効きそうなものは台帳へ |
| 気づきを正本へ還元する | `/promote-feedback` | 正本を直す PR。マージは人 |
| 確定した画面を残す | [`design-system/screens/README.md`](design-system/screens/README.md) の手順 | `design-system/screens/<画面名>/` |

`/名前` は Claude Code での呼び方。Codex では skill の名前で頼む。

## はじめ方

1. `design-system/` と `work/feedback.md` の「（例）」の行と `<!-- 書き換える -->` の箇所を、自分のプロダクトの内容に書き換える。例の行は消し、ID は 01 から振る。
2. 部品の仕様は、よく使う部品から `components/_template.md` をコピーして書く。全部を最初から書かない。
3. `.github/CODEOWNERS` の担当者を自分たちに変える。
4. 確かめる（Node.js 20 以降。依存パッケージなし）。

```bash
npm run tokens
```

```bash
npm run check
```

`tokens` は `tokens.json` から `tokens.css` を作る。`check` は索引と実ファイルのずれ、トークンの作り忘れ、色の直書き、存在しない CSS 変数、ID の重複と参照切れを見つける。PR ごとに GitHub Actions でも走る。

Windows で clone するときは、`.agents/skills` のシンボリックリンクが効くように `git config core.symlinks true` にしておく。

## 運用

- **はじめ（目安3か月）**：正本を変えるのはメンテナだけ。出力が安定するまで、気づきは台帳に貯めて人がまとめて判断する。
- **安定したら**：チームのデザイナーにも正本の PR を開く。文言とガイドラインから開くと事故が少ない。
- **承認**：2人以上になったら、CODEOWNERS とブランチ保護で正本の変更に承認を必須にする（GitHub では作成者が自分の PR を承認できず、private リポジトリのブランチ保護はプランによって使えない）。1人のうちは、自分の PR を1日置いて差分を見直してからマージする。
- **人のレビュー**：PR のコメントで出た指摘のうち、ほかでも効きそうなものは、指摘した人が台帳に1行足す。
- **還元**：週1回、メンテナが `/promote-feedback` を呼ぶ。

## 分けすぎない

ファイルを分けるかどうかは行数で決めない。次の3つで決める。

- 同じ内容が2か所以上に書かれていないか
- 変えるときに直す正本を1つに決められるか
- 全体のルールと、その画面だけの判断を区別できるか

案出しや大量生成のように量が大事な用途なら、1枚の DESIGN.md のほうが速いこともある。

## 向いていないこと

前例のない画面（ゼロイチ）は、案までは出てもそのまま出せる水準には届きにくい。体験を大きく変える勝負どころはデザイナーが作り、日々の改修をこの仕組みで回す。

## 参考

- カナリー「NestUI」：問いごとの正本、作るときとレビューで読むものを変える、レビューの還元 — <https://note.com/canary_inc/n/n538adfe8daee> ／ <https://github.com/SSK-TBD/NestUI>
- 令和トラベル：調査から提案までの工程を持つ skill、1枚にまとめる成果物、確定した画面をマスターにする — <https://note.com/toitoi1618/n/ndf35dbd2585b>
