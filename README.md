# Polyte

Polyte is an html renderer for polynomials. Polynomials
are written using a familar grammar.

Examples of polynomial written in this grammar:

```
a * x^3 + b * x^2 + c * x
3 * x + 5
```

The application is written using react and a hand written recusrive descendent parser to convert the input string into
an AST.

Sadly, this application has a bug and you need to solve it.
Also, the code is not very clean. Any changes to improve the code
will be appreciated.

:)

## Preparation

You need an environment with bash and docker installed.
The following commands have been tested to work under Ubuntu 18.04 LTS.

```bash
# Run this once to start a container in the background
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

If you have enough time what kind of improvements would you consider
making?