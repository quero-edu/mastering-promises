import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import beautify from 'js-beautify';
import hljs from 'highlightjs';
import SinglePlayerForm from './forms/single-player';

const beautifyOptions = {
  break_chained_methods: true,
  indent_size: 2,
};

function formatCode(code) {
  return beautify(code.toString(), beautifyOptions)
    .replace(/\n/g, '<br>')
    .replace(/\s/g, '&nbsp;');
}

class Question extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: 'question',
      value: 0,
      output: '',
    };
  }

  componentDidMount() {
    _.forEach(document.querySelectorAll('pre code'), b => hljs.highlightBlock(b));
  }

  verifyAnswer(formData) {
    const { answer } = formData;
    const { question } = this.props;

    this.setState({
      answer,
      step: 'verify',
    });

    const { log } = console;
    console.log = (value) => {
      this.setState(prevState => ({
        output: `${prevState.output}${prevState.output ? '|' : ''}${value}`,
      }));
    };

    return question.problem().then(() => {
      const { output } = this.state;

      if (answer === output) {
        this.setState({
          step: 'end',
          value: 1,
        });
      } else {
        this.setState({
          step: 'end',
          value: -1,
        });
      }
      console.log = log;
    });
  }

  renderForm() {
    const { isMultiplayer, question } = this.props;
    const { answers } = question;

    if (isMultiplayer) {
      return (
        null
        // <MultiPlayerFrom onSubmit={onSubmit} answers={answers} />
      );
    }

    return (
      <SinglePlayerForm
        answers={answers}
        onSubmit={evt => this.verifyAnswer(evt)}
      />
    );
  }

  renderEndButton() {
    const { onSubmit } = this.props;
    const { value, step } = this.state;

    if (step !== 'end') return null;

    if (value >= 0) {
      return (
        <button
          className="question__button question__button--correct"
          onClick={() => { onSubmit(value); }}
          type="submit"
        >
          Acertei :D
          <style jsx>
            {`
              .question__button {
                border: 0;
                color: #fff;
                cursor: pointer;
                font-family: monospace;
                font-weight: bold;
                height: 32px;
                margin-top: 8px;
                width: 100%;
              }

              .question__button--correct {
                background-color: #6a8759;
              }

              .question__button--correct:hover {
                background-color: #93ae84;
              }
            `}
          </style>
        </button>
      );
    }

    return (
      <button
        className="question__button question__button--wrong"
        onClick={() => { onSubmit(value); }}
        type="submit"
      >
        Errei D:
        <style jsx>
          {`
            .question__button {
              border: 0;
              color: #fff;
              cursor: pointer;
              font-family: monospace;
              font-weight: bold;
              height: 32px;
              margin-top: 8px;
              width: 100%;
            }

            .question__button--wrong {
              background-color: #d15d41;
            }

            .question__button--wrong:hover {
              background-color: #d18471;
            }
          `}
        </style>
      </button>
    );
  }

  render() {
    const { question } = this.props;
    const {
      dependencies,
      description,
      problem,
    } = question;
    const {
      answer,
      output,
      step,
    } = this.state;

    return (
      <div>
        <div className="question__description">
          {description}
        </div>
        <div className="question__dependencies">
          {_.map(dependencies, (dependency, index) => (
            <pre className="question__dependencies__item" key={index}>
              <code
                className="javascript"
                dangerouslySetInnerHTML={{
                  __html: formatCode(dependency),
                }}
              />
            </pre>
          ))}

        </div>
        <div className="question__problem">
          <pre>
            <code
              className="javascript"
              dangerouslySetInnerHTML={{
                __html: formatCode(problem),
              }}
            />
          </pre>
        </div>

        {step === 'question' ? (
          <div className="question__form">
            {this.renderForm()}
          </div>
        ) : (
          <div className="question__results">
            <div className="question__result-title">
              Resultado esperado:
            </div>
            <div className="question__result-content">
              { answer }
            </div>
            <div className="question__result-title">
              Resultado encontrado:
            </div>
            <div className="question__result-content">
              { output }
            </div>
            {this.renderEndButton()}
          </div>
        )}

        <style jsx>
          {`
            .question__description {
              background-color: #2b2b2b;
              border-radius: 4px;
              box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.4);
              color: #cb7832;
              font-family: monospace;
              font-size: 1.6rem;
              padding: 8px;
            }

            .question__dependencies {
              display: flex;
              margin-top: 8px;
            }

            .question__dependencies__item {
              border-radius: 4px;
              box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.4);
            }

            .question__dependencies__item:not(:first-child) {
              margin-left: 8px;
            }

            .question__problem {
              border-radius: 4px;
              box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.4);
              margin-top: 8px;
            }

            .question__form {
              border-radius: 4px;
              box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.4);
              margin-top: 8px;
            }

            .question__results {
              background-color: #2b2b2b;
              border-radius: 4px;
              box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.4);
              font-family: monospace;
              margin-top: 8px;
              padding: 8px;
            }

            .question__result-title {
              color: #cb7832;
              font-size: 1.1rem;
            }

            .question__result-content {
              color: #bababa;
              font-size: 1.05rem;
              padding: 8px;
            }
          `}
        </style>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    problem: PropTypes.func.isRequired,
    dependencies: PropTypes.arrayOf(PropTypes.func),
  }).isRequired,
  isMultiplayer: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Question;
