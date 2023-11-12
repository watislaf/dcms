// third-party
import { ReactNode } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
    children: ReactNode;
};

export default function SyntaxHighlight({ children, ...others }: Props) {
    return (
        <SyntaxHighlighter language="javacript" showLineNumbers style={a11yDark} {...others}>
            {children}
        </SyntaxHighlighter>
    );
}
