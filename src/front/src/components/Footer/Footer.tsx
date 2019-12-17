import React from 'react';
import {Container} from 'components';

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

interface FooterProps {
  className?: string;
}
