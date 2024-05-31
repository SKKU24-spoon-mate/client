import React from 'react';

import LogoIm from '@assets/png/Logo.png';

export const LogoImage = (props: { width?: string; height?: string; style?: React.CSSProperties }) => (
  <img
    src={LogoIm}
    width={props.width || '100%'}
    height={props.height || '100%'}
    style={{ marginRight: '20px', ...props.style }}
    alt="Logo"
  />
);
