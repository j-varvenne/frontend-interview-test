# Polyte

Polyte is an html renderer for polynomial written in a custom
language.

Example:

```
a * x^3 + b * x^2 + c * x
```

Or

```
3 * x + 5
```

It's written using react and using a hand written recusrive
descendent parser.

Sadly, this react application has a bug and you need to solve it.
Also, the code is not very clean. Any changes to improve the code
will be appreciated.

Any additional comments that you have for the interviewer are welcome! :)

## Preparation

You need an environment with bash and docker installed.
The following script have been tested to work under Ubuntu 18.04 LTS.

```bash
# Run this once.
./run.sh
```

Install dependencies

```bash
./exec.sh yarn
```

Start `webpack-dev-server`:

```bash
./exec.sh yarn start
```

## With more time

Do you think you could explain how you would add parentheses expressions?