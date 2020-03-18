import { ASTNode } from './ast';
import { ParseError } from './error';

export class PolynomialParser {

    location: number = 0;

    constructor(public expr: string) {}

    /**
     * Parse the provided expression and returned
     * the AST parsed.
     * @throws {ParseError} if
     */
    parse() {
        if (!this.eof()) {
            return this.parseAdd();
        }
    }

    private parseAdd(): ASTNode {
        let left = this.parseProd();
        this.whitespace();
        while (!this.eof()) {
            this.expect('+');
            this.whitespace();
            const right = this.parseProd();
            this.whitespace();
            left = {
                type: 'binop',
                op: '+',
                left,
                right,
            };
        }
        return left;
    }

    private parseProd(): ASTNode {
        let left = this.parseTerm();
        this.whitespace();
        while (!this.eof()) {
            this.expect('*');
            this.whitespace();
            const right = this.parseTerm();
            this.whitespace();
            left = {
                type: 'binop',
                op: '*',
                left,
                right,
            };
        }
        return left;
    }

    private parseTerm(): ASTNode {
        const nextV = this.peek();
        switch (nextV) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                return this.parseNumber();
            case 'x':
            case 'X':
                this.advance();
                this.whitespace();
                let left: ASTNode = { type: 'indeterminate' };
                if (this.peek() === '^') {
                    this.expect('^');
                    const right = this.parseNumber();
                    left = {
                        type: 'binop',
                        op: '^',
                        left,
                        right,
                    }
                }
                return left;
            default:
                throw new ParseError(
                    this.location,
                    `Unexpected character: ${nextV}`,
                );
        }
    }

    private parseNumber() {
        this.whitespace();
        const num = this.takeWhile(c => /[0-9]/.test(c));
        return { type: 'number' as const, value: Number.parseInt(num) };
    }

    private expect(str: string) {
        const val = this.peek(str.length);
        if (val !== str) {
            throw new ParseError(
                this.location,
                `Expected '${str}', got '${val}'`,
            );
        }
        this.location += str.length;
    }

    private whitespace() {
        this.takeWhile(c => c === ' ' || c === '\t' || c === '\n');
    }

    private takeWhile(predicate: (char: string) => boolean): string {
        const loc = this.location;
        while (this.expr.length > this.location && predicate(this.expr.charAt(this.location))) {
            this.location++;
        }
        return this.expr.slice(loc, this.location);
    }

    private advance(): string | undefined {
        if (!this.eof()) {
            const c = this.expr.charAt(this.location++);
            return c;
        }
    }

    private peek(length = 1): string | undefined {
        if (!this.eof()) {
            return this.expr.slice(this.location, this.location + length);
        }
    }

    private eof(): boolean {
        return this.expr.length <= this.location;
    }
}
