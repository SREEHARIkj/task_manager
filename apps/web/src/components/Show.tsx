import { Children, ReactElement, ReactNode } from 'react';

type NodeElement = ReactNode | ReactNode[];

export const Show = (props: { children: NodeElement }) => {
    let when: NodeElement = null;
    let otherwise: NodeElement = null;

    Children.forEach(props.children, (children) => {
        if ((children as ReactElement<{ isTrue?: boolean | undefined }>)?.props?.isTrue === undefined) {
            otherwise = children;
        } else if (!when && (children as ReactElement<{ isTrue?: boolean | undefined }>)?.props?.isTrue === true) {
            when = children;
        }
    });
    return when || otherwise;
};

Show.When = ({ isTrue, children }: { isTrue: boolean; children: NodeElement }) => isTrue && children;
Show.Else = ({ render, children }: { render: boolean; children: NodeElement }) => render || children;
