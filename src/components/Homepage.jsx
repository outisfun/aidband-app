import React from 'react';
import { Link } from 'react-router-dom';
import Container from './layout/Container';
import TeamMember from './elements/TeamMember';

import { Scrollbars } from 'react-custom-scrollbars';
import HospitalsMap from './HospitalsMap';
import IosArrowRoundForward from 'react-ionicons/lib/IosArrowRoundForward';

import Illustration_1 from './elements/Illustration_1';
import Logo from './elements/Logo';

import _ from 'lodash';
import products from '../utils/products.js'; // replace later
import municipalities from '../utils/municipalities.js';


const Homepage = () => {
  return (
    <div className="ab-home">
      <div className="desktop-only">
        <h3>В момента само на десктоп! :)</h3>
      </div>
      <section className="ab-home__intro">
        <Container>
          <div className="ab-home__intro--inner">
            <div className="ab-home__intro__text">
              <h2 className="ab-heading ab-heading--one">
                Improving healthcare with data and whatnot.
              </h2>
              <p className="ab-p">
                The most up-to-date database on hospital needs, suppliers and non-state funding.
              </p>
            </div>
            <div className="ab-home__intro__image">
              <Illustration_1 />
            </div>
          </div>
        </Container>
      </section>
      <section className="ab-home__widgets">
        <Container>

          <div className="ab-home__widgets--inner">
            <div className="ab-home__widget widget--hospitals">
              <div className="ab-home__widget__background">
                <div className="img"></div>
                <div className="gradient"></div>
              </div>
              <div className="ab-home__widget__content">
                <div className="ab-widget__info">
                  <h4 className="ab-heading ab-heading--2">Hospitals</h4>
                  <p>
                    An up-to-date database of hospitals' needs for medical supplies.
                    We support the administrative work of maintaining
                    their database with local operational teams.
                  </p>
                </div>
                <Link to="./hospitals" className="ab-button ab-button--goto">
                  Виж списъка
                  <IosArrowRoundForward fontSize="45px" />
                </Link>
              </div>
            </div>
            <div className="ab-home__widget widget--suppliers">
              <div className="ab-home__widget__background">
                <div className="img"></div>
                <div className="gradient"></div>
              </div>
              <div className="ab-home__widget__content">
                <div className="ab-widget__info">
                  <h4 className="ab-heading ab-heading--2">Suppliers</h4>
                  <p>
                    An up-to-date database of hospitals' needs for medical supplies.
                    We support the administrative work of maintaining
                    their database with local operational teams.
                  </p>
                </div>
                <Link to="./hospitals" className="ab-button ab-button--goto">
                  Виж списъка
                  <IosArrowRoundForward fontSize="45px" />
                </Link>
              </div>
            </div>
            <div className="ab-home__widget widget--campaigns">
              <div className="ab-home__widget__background">
                <div className="img"></div>
                <div className="gradient"></div>
              </div>
              <div className="ab-home__widget__content">
                <div className="ab-widget__info">
                  <h4 className="ab-heading ab-heading--2">Funding Campaigns</h4>
                  <p>
                    An up-to-date database of hospitals' needs for medical supplies.
                    We support the administrative work of maintaining
                    their database with local operational teams.
                  </p>
                </div>
                <Link to="./hospitals" className="ab-button ab-button--goto">
                  Виж списъка
                  <IosArrowRoundForward fontSize="45px" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <div className="ab-section ab-section--accent">
        <Container>
          <div className="ab-home__about">
              <Logo />
             <p className="ab-p--small">
              aidband предоставя и поддържа информационна система, свързаща болници, доставчици и здравни фондове.
            </p>
            <Link to="./hospitals" className="ab-button ab-button--lg ab-button--accent">View demo (desktop)</Link>
          </div>
        </Container>
      </div>
      <section className="ab-section" id="ab-section--team">
        <Container>
          <h2 className="ab-heading--section">Team</h2>
          <div class="ab-team__members">
            <TeamMember
              name='Boris Mihov'
              role='Team Lead'
              bio='Lorem ipsum dolor sit amet' />
            <TeamMember
              name='Gergana Tyaneva'
              role='Outreach & Operations'
              bio='Lorem ipsum dolor sit amet' />
            <TeamMember
              name='Maria Petrova'
              role='PR, Marketing & Communications'
              bio='Lorem ipsum dolor sit amet' />
            <TeamMember
              name='Katerina Vaseva'
              role='Developer'
              bio='Lorem ipsum dolor sit amet' />
            <TeamMember
              name='Mirela Arnold'
              role='Communications & Health care consultancy'
              bio='Lorem ipsum dolor sit amet' />
            <TeamMember
              name='Dobromir Enchev'
              role='Developer'
              bio='Lorem ipsum dolor sit amet' />
            <TeamMember
              name='Henrik Hjalmarsson'
              role='Developer'
              bio='Lorem ipsum dolor sit amet' />
          </div>
          <h2 className="ab-heading--section">We're looking for...</h2>
          <div class="ab-team__members">
            <div class="ab-team__member">
              <div class="ab-team__member--inner">
                <div class="ab-team__member__img">
                </div>
                <div class="ab-team__member__info">
                  <h4 class="ab-team__member__name">
                    Developers
                  </h4>
                  <p class="ab-team__member__bio">
                    We use React & Firebase, so it would be great if you're cool with those. However, we always need masterminds from
                    the entire spectrum of development, so if you're enthusiastic about the idea, and want to work together, drop us a line!
                  </p>
                </div>
              </div>

            </div>
            <div class="ab-team__member">
              <div class="ab-team__member--inner">
                <div class="ab-team__member__img">
                </div>
                <div class="ab-team__member__info">
                  <h4 class="ab-team__member__name">
                    Name Surname
                  </h4>
                  <h4 class="ab-team__member__role">
                    my role
                  </h4>
                  <p class="ab-team__member__bio">
                    That’s my background that prooves I’m trustworthy. I bring value to the project based on my previous experience. You can trust me with your data.
                  </p>
                </div>
              </div>

            </div>
            <div class="ab-team__member">
              <div class="ab-team__member--inner">
                <div class="ab-team__member__img">
                </div>
                <div class="ab-team__member__info">
                  <h4 class="ab-team__member__name">
                    Name Surname
                  </h4>
                  <h4 class="ab-team__member__role">
                    my role
                  </h4>
                  <p class="ab-team__member__bio">
                    That’s my background that prooves I’m trustworthy. I bring value to the project based on my previous experience. You can trust me with your data.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </section>
    </div>

  )
}

export default Homepage;

//<h2 className="ab-heading--section">Нашата дейност</h2>
