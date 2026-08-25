# Google Sheets question bank

Create a spreadsheet with a `questions` worksheet. Use this exact header row:

`id, category, section, question, option_a, option_b, option_c, option_d, correct_option, difficulty, is_active`

- `category`: `AI`, `Technology`, `Finance`, or `Digital Marketing`
- `correct_option`: `A`, `B`, `C`, or `D`
- `difficulty`: `easy`, `medium`, or `hard`
- `is_active`: `TRUE` only for questions available to users

Grant Viewer access to the spreadsheet for the Google service-account email. Keep the private key in `.env.local` and Vercel environment settings only.
