import _ from 'lodash';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

const SinglePlayer = (props) => {
  const {
    answers,
    handleSubmit,
    submitting,
  } = props;

  return (
    <form className="single-player-form" onSubmit={handleSubmit}>
      {_.map(answers, (answer, index) => (
        <label className="single-player-form__answer" key={index} htmlFor={`answer${index}`}>
          <Field className="single-player-form__answer-input" name="answer" component="input" type="radio" value={answer} id={`answer${index}`} />
          {answer}
        </label>
      ))}
      <button className="single-player-form__button" type="submit" disabled={submitting}>
        Conferir
      </button>
      <style jsx>
        {`
          .single-player-form {
            background-color: #2b2b2b;
            border-radius: 4px;
            padding: 8px;
          }

          .single-player-form__answer {
            align-items: center;
            border: 1px solid rgba(255, 255, 255, 0.05);
            color: #bababa;
            cursor: pointer;
            display: block;
            display: flex;
            font-family: monospace;
            line-height: 2em;
            padding: 0 8px;
            user-select: none;
          }

          .single-player-form__answer:not(:first-child) {
            margin-top: 4px;
          }

          .single-player-form__answer:hover {
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .single-player-form__button {
            background-color: #6a8759;
            border: 0;
            color: #fff;
            cursor: pointer;
            font-family: monospace;
            font-weight: bold;
            height: 32px;
            margin-top: 8px;
            width: 100%;
          }

          .single-player-form__button:hover {
            background-color: #93ae84;
          }
        `}
      </style>
    </form>
  );
};

SinglePlayer.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'singlePlayer',
})(SinglePlayer);
