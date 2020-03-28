import React from 'react';
import { Sticky } from 'react-sticky';
import Container from './Container';

/* <Sticky topOffset={0}>
      {({ style }) => (
        <header className="ab-header">
          <Container>
            <div className="ab-header--inner">
              <div className="ab-header__brand">aidband</div>
              <nav className="ab-header__nav">
              </nav>
              <button className="ab-header__faq">
                how to help
              </button>
            </div>
          </Container>
        </header>
      )}
    </Sticky> */

const Header = () => {
  return (
    <header className="ab-header">
      <Container>
        <div className="ab-header--inner">
          <div className="ab-header__brand">aidband</div>
          <nav className="ab-header__nav">
          </nav>
          <button className="ab-header__faq">
            how to help
          </button>
        </div>
      </Container>
    </header>
  )
}

export default Header;
