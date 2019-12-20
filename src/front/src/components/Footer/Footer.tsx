import React from 'react';

import './Footer.scss';
import {Container} from 'components';

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({className}) => {
  return (
    <footer className={className + ' footer'}>
      <Container>
        <div className="footer__content">FOOTER</div>
      </Container>
    </footer>
  );
};
