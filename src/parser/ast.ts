
export type ASTNode =
    ASTInderterminate |
    ASTConstant |
    ASTNumber |
    ASTBinOp;

export interface ASTInderterminate {
    type: 'indeterminate'
}

export interface ASTConstant {
    type: 'const'
    name: string
}

export interface ASTNumber {
    type: 'number'
    value: number
}

export interface ASTBinOp {
    type: 'binop'
    op: '+' | '^' | '*'
    left: ASTNode
    right: ASTNode
}

