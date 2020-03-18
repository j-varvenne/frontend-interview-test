
export class ParseError extends Error {

    constructor(
        public location: number,
        message: string
    ) {
        super(message);
    }
}