import React, { PureComponent } from 'react';
import 'highlightjs/styles/darkula.css';
import Router from 'next/router';
import Link from 'next/link';

class IndexPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  playSinglePlayer() {
    Router.push('/game');
  }

  render() {
    return (
      <div className="index">
        <h1 className="index__title">Dominando Promises</h1>
        <h2 className="index__author">Quero Educação</h2>

        <div className="index__options">
          <button
            className="index__link"
            onClick={() => this.playSinglePlayer()}
            type="button"
          >
            Jogar
          </button>
          <Link href="/introduction">
            <span className="index__link">
              Callbacks VS Promises
            </span>
          </Link>
        </div>

        <style jsx>
          {`
            .index {
              align-items: center;
              background-color: #2b2b2b;
              border-radius: 4px;
              display: flex;
              flex-direction: column;
              font-family: monospace;
              justify-content: center;
              padding: 8px;
              height: calc(100vh - 80px);
            }

            .index__title {
              font-size: 52px;
              color: #cb7832;
            }

            .index__author {
              color: #bababa;
              font-size: 28px;
            }

            .index__options {
              align-items: center;
              display: flex;
              flex-direction: column;
              margin-top: 48px;
            }

            .index__link {
              background: transparent;
              border: 0;
              color: #e0c46c;
              cursor: pointer;
              font-size: 22px;
              font-weight: bold;
              text-decoration: none;
              user-select: none;
            }

            .index__link:not(:first-child) {
              margin-top: 16px;
            }

            .index__link:hover {
              color: #6a8759;
            }

            .index__link:hover::before {
              content: "> ";
            }

            .index__link:hover::after {
              content: " <";
            }
          `}
        </style>
      </div>
    );
  }
}

export default IndexPage;
