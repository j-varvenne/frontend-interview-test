import * as React from 'react';
import { SFC } from 'react';
import { PolynomialParser } from '@/parser';
import { ASTNode } from '@/parser/ast';
import * as style from './Polynomial.module.scss';


// tslint:disable-next-line: variable-name
export const Polynomial: SFC<Props> = ({ input }) => {
    const tree = new PolynomialParser(input).parse();

    function walk(tree: ASTNode): React.ReactElement {
        switch (tree.type) {
            case 'number': return <span className={style.number}>{tree.value}</span>;
            case 'indeterminate': return <span className={style.indeterminate}>X</span>;
            case 'const': return <span className={style.constant}>{tree.name}</span>;
            case 'binop': return <>
                {walk(tree.left)}
                {tree.op !== '^' ? tree.op : ''}
                {tree.op === '^' ? <span className={style.exponent}>{walk(tree.right)}</span>: walk(tree.right)}
            </>;
        }
    }


    return <div className={style.expression}>{walk(tree)}</div>;
};

interface Props {
    input: string
}
