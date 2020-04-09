import React from 'react';
import { Link } from 'react-router-dom';
import Container from './layout/Container';

import { Scrollbars } from 'react-custom-scrollbars';
import HospitalsMap from './HospitalsMap';
import IosArrowRoundForward from 'react-ionicons/lib/IosArrowRoundForward';

import _ from 'lodash';
import products from '../utils/products.js'; // replace later
import municipalities from '../utils/municipalities.js';


const Homepage = () => {
  return (
    <section className="ab-home">
      <div className="desktop-only">
        <h3>В момента само на десктоп! :)</h3>
      </div>
      <div className="ab-home__ffs">
        <Container>
          <div className="ab-home__intro">
            <h2 className="ab-heading ab-heading--1">
              ПОМАГАМЕ НА ЗДРАВНИ ЗАВЕДЕНИЯ И ДОСТАВЧИЦИ ДА РАЗРЕШАТ КРИЗАТА С ЛИПСАТА НА МАТЕРИАЛИ
            </h2>
            <p className="ab-p">
              Свързвайки болници, доставчици, производители и не-държавно финансиране, създаваме пазар и помагаме в преодоляването на регулаторни и логистични трудности.
            </p>
          </div>
          <div className="ab-home__widgets">
            <div className="ab-home__widget widget--hospitals">
              <div className="ab-home__widget__background">
                <div className="img"></div>
                <div className="gradient"></div>
              </div>
              <div className="ab-home__widget__content">
                <div className="ab-widget__info">
                  <h4 className="ab-heading ab-heading--2">Болници</h4>
                  <p>
                    В нужда от медицински материали, апаратура и консумативи
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
                  <h4 className="ab-heading ab-heading--2">Доставчици</h4>
                  <p>
                    В нужда от медицински материали, апаратура и консумативи
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
                  <h4 className="ab-heading ab-heading--2">Средства</h4>
                  <p>
                    Дарителски кампании, фондове, дарителски сметки.
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
      </div>
      <div className="ab-home__about">
        <Container>
          <h2 className="ab-heading ab-heading--1">Нашата дейност</h2>
          <p className="ab-p">
            aidband предоставя и поддържа информационна система, свързаща болници, доставчици и здравни фондове.
          </p>
          <img src="https://zeroattentionspan.net/zas/graph.jpg" />
        </Container>
      </div>
    </section>

  )
}

export default Homepage;
