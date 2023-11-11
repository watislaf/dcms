import { CSSProperties } from 'react';

export const layoutStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
};

export const cardStyles: CSSProperties = {
    width: '400px',
    padding: '32px',
    boxShadow:
        '0px 17px 17px -7px rgba(40, 0, 255, 0.16), 0px 36px 28px -7px rgba(0, 0, 0, 0.2), 0px 1px 3px rgba(0, 0, 0, 0.2)',
};

export const titleStyles: CSSProperties = {
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: 700,
};

export const pageTitleStyles: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '32px',
};
