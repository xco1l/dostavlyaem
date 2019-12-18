import React from 'react';
import {Container} from 'components';
import {FooterProps} from 'types';

const Footer: React.FC<FooterProps> = ({className}) => {
  return (
    <footer className={className + ' footer'}>
      <Container>
        <div className="footer__content">FOOTER</div>
      </Container>
    </footer>
  );
};

export default Footer;
