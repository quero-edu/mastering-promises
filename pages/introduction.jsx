import _ from 'lodash';
import React, { PureComponent } from 'react';
import Link from 'next/link';
import hljs from 'highlightjs';

class IntroductionPage extends PureComponent {
  componentDidMount() {
    _.forEach(document.querySelectorAll('pre code'), b => hljs.highlightBlock(b));
  }

  render() {
    return (
      <div>
        <div className="introduction__content">
          <div className="introduction__panel">
            <pre>
              <code>
                {`
  // Callbacks

  function onSuccess(result) {
    // do something here
  }

  function onError(error) {
    // handle error here
  }

  doSomethingAsync(params, onSuccess, onError);
                `}
              </code>
            </pre>
          </div>

          <div className="introduction__panel">
            <pre>
              <code>
              {`
  // Promises

  doSomethingAsync(params)
    .then(function (result) {
      // do something here
    })
    .catch(function (error) {
      // handle error here
    });
                `}
              </code>
            </pre>
          </div>

          <div className="introduction__panel">
            <pre>
              <code>
              {`
  // Promises with await

  async function example() {
    try {
      const result = await doSomethingAsync(params);
      // do something here
    } catch (error) {
      // handle error here
    }
  }
                `}
              </code>
            </pre>
          </div>
        </div>

        <div className="introduction_footer">
          <Link href="/">
            <span className="introduction__link">
              Voltar
            </span>
          </Link>
        </div>
        <style jsx>
          {`
            .introduction__content {
              display: flex;
            }

            .introduction__panel {
              border-radius: 4px;
              flex: 1;
            }

            .introduction__panel:first-child {
              margin-right: 8px;
            }

            .introduction__panel:not(:first-child) {
              margin-left: 8px;
            }

            .introduction_footer {
              margin-top: 32px;
              text-align: center;
            }

            .introduction__link {
              background: transparent;
              border: 0;
              color: #cb7832;
              cursor: pointer;
              font-size: 22px;
              font-weight: bold;
              text-decoration: none;
              user-select: none;
            }
          `}
        </style>
      </div>
    );
  }
}

export default IntroductionPage;
