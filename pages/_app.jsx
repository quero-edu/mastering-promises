import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from '../lib/with-redux-store';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
        <style jsx global>
          {`
            body {
              background-color: #f5f5dc;
              margin: 32px;
            }

            input[type=radio] {
              margin: 0 8px 0 0;
            }

            pre {
              margin: 0;
            }

            code.hljs {
              border-radius: 4px;
            }

            canvas {
              max-height: 80vh;
            }
          `}
        </style>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
