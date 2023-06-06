import React from 'react';
import style from './style.scss';

const Footer = () => (
  <footer className={style.footer}>
    <ul className={style.links}>
      <li className={style.link}>
        <a
          href="https://github.com/kyaido/yugiri/blob/master/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          How to use
        </a>
      </li>
    </ul>
  </footer>
);

export default Footer;
