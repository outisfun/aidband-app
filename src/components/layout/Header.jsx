import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from "../../providers/UserProvider";
import { auth } from "../../utils/firebase";

const Header = () => {
  const user = useContext(UserContext);

  const signOut = (event) => {
    auth.signOut();
  }

  return (
    <header className="ab-header">
      <div className="ab-header--inner">
        <div className="ab-header__brand">
          <Link to="./">
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.00042 3.7037C8.00042 5.7492 6.34222 7.40741 4.29672 7.40741C2.25122 7.40741 0.593018 5.7492 0.593018 3.7037C0.593018 1.6582 2.25122 -3.62412e-08 4.29672 -8.0947e-08C6.34222 -1.25653e-07 8.00042 1.6582 8.00042 3.7037Z" fill="#3D44E9" />
              <path d="M19.4074 3.7037C19.4074 5.7492 17.7492 7.40741 15.7037 7.40741C13.6582 7.40741 12 5.7492 12 3.7037C12 1.6582 13.6582 -3.62412e-08 15.7037 -8.0947e-08C17.7492 -1.25653e-07 19.4074 1.6582 19.4074 3.7037Z" fill="#3D44E9" />
              <path d="M30.8144 3.7037C30.8144 5.7492 29.1562 7.40741 27.1107 7.40741C25.0652 7.40741 23.407 5.7492 23.407 3.7037C23.407 1.6582 25.0652 -3.62412e-08 27.1107 -8.0947e-08C29.1562 -1.25653e-07 30.8144 1.6582 30.8144 3.7037Z" fill="#3D44E9" />
              <path d="M8.00042 20.2964C8.00042 22.3419 6.34222 24.0001 4.29672 24.0001C2.25122 24.0001 0.593018 22.3419 0.593018 20.2964C0.593018 18.2509 2.25122 16.5927 4.29672 16.5927C6.34222 16.5927 8.00042 18.2509 8.00042 20.2964Z" fill="#3D44E9" />
              <path d="M19.4074 20.2964C19.4074 22.3419 17.7492 24.0001 15.7037 24.0001C13.6582 24.0001 12 22.3419 12 20.2964C12 18.2509 13.6582 16.5927 15.7037 16.5927C17.7492 16.5927 19.4074 18.2509 19.4074 20.2964Z" fill="#3D44E9" />
              <path d="M30.8144 20.2964C30.8144 22.3419 29.1562 24.0001 27.1107 24.0001C25.0652 24.0001 23.407 22.3419 23.407 20.2964C23.407 18.2509 25.0652 16.5927 27.1107 16.5927C29.1562 16.5927 30.8144 18.2509 30.8144 20.2964Z" fill="#3D44E9" />
              <path d="M3.52005e-08 12.0001C1.57598e-08 11.1 0.72961 10.3704 1.62963 10.3704L6.81482 10.3704C7.71483 10.3704 8.44444 11.1 8.44444 12.0001C8.44444 12.9001 7.71483 13.6297 6.81482 13.6297L1.62963 13.6297C0.72961 13.6297 5.46413e-08 12.9001 3.52005e-08 12.0001Z" fill="#3D44E9" />
              <path d="M11.407 12.0001C11.407 11.1 12.1366 10.3704 13.0366 10.3704L18.2218 10.3704C19.1218 10.3704 19.8514 11.1 19.8514 12.0001C19.8514 12.9001 19.1218 13.6297 18.2218 13.6297L13.0366 13.6297C12.1366 13.6297 11.407 12.9001 11.407 12.0001Z" fill="#3D44E9" />
              <path d="M22.815 12.0001C22.815 11.1 23.5446 10.3704 24.4447 10.3704L29.6298 10.3704C30.5299 10.3704 31.2595 11.1 31.2595 12.0001C31.2595 12.9001 30.5299 13.6297 29.6298 13.6297L24.4447 13.6297C23.5446 13.6297 22.815 12.9001 22.815 12.0001Z" fill="#3D44E9" />
            </svg>
            <span>aidbind</span>
          </Link>
        </div>
        <nav className="ab-header__nav">
          <ul>
            <li className="ab-header__nav__item is--current">
              <Link to="./hospitals">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8H13.8L11.4 15L6.6 1L4.2 8H1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <small>Hospitals</small>
              </Link>
            </li>
            <li className="ab-header__nav__item item--truck">
              <Link to="./hospitals">
                <svg width="110" height="64" viewBox="0 0 110 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0)">
                    <path d="M58.334 12.5H45.834V23.3333H58.334V12.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M58.334 16.6667H61.6673L64.1673 19.1667V23.3334H58.334V16.6667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M49.5833 27.4999C50.7339 27.4999 51.6667 26.5672 51.6667 25.4166C51.6667 24.266 50.7339 23.3333 49.5833 23.3333C48.4327 23.3333 47.5 24.266 47.5 25.4166C47.5 26.5672 48.4327 27.4999 49.5833 27.4999Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M60.4173 27.4999C61.5679 27.4999 62.5007 26.5672 62.5007 25.4166C62.5007 24.266 61.5679 23.3333 60.4173 23.3333C59.2667 23.3333 58.334 24.266 58.334 25.4166C58.334 26.5672 59.2667 27.4999 60.4173 27.4999Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g><defs>
                    <clipPath id="clip0">
                      <rect x="45" y="10" width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <small>Suppliers</small>
              </Link>
            </li>
            <li className="ab-header__nav__item">
              <Link to="./hospitals">
                <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.3807 2.59133C19.8676 2.08683 19.2583 1.68663 18.5878 1.41358C17.9172 1.14054 17.1985 1 16.4727 1C15.7468 1 15.0281 1.14054 14.3576 1.41358C13.687 1.68663 13.0778 2.08683 12.5646 2.59133L11.4997 3.63785L10.4348 2.59133C9.39834 1.57276 7.99258 1.00053 6.52679 1.00053C5.06099 1.00053 3.65523 1.57276 2.61876 2.59133C1.58229 3.6099 1 4.99139 1 6.43187C1 7.87235 1.58229 9.25383 2.61876 10.2724L3.68367 11.3189L11.4997 19L19.3158 11.3189L20.3807 10.2724C20.8941 9.76814 21.3013 9.16942 21.5791 8.51045C21.857 7.85148 22 7.14517 22 6.43187C22 5.71857 21.857 5.01225 21.5791 4.35328C21.3013 3.69431 20.8941 3.09559 20.3807 2.59133V2.59133Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <small>Campaigns</small>
              </Link>
            </li>
          </ul>
        </nav>
        {user && (
            <Link to="/" onClick={() => auth.signOut()} className="ab-header__faq ab-button ab-button--lg ab-button--accent">
              Sign Out
            </Link>
        )}
        {/* <Link to="./hospitals" className="ab-header__faq ab-button ab-button--lg ab-button--accent">
              View demo
            </Link> */}
      </div>
    </header>
  )
}

export default Header;
