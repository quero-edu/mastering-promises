import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontFamily = 'monospace';
Chart.defaults.global.defaultFontStyle = 'bold';
Chart.defaults.global.defaultFontColor = '#bababa';

class ResultGraph extends PureComponent {
  componentDidMount() {
    const { data } = this.props;

    this.chart = new Chart(this.graph, {
      type: 'line',
      data,
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Questão',
            },
          }],
          yAxes: [{
            ticks: {
              callback: value => (Number.isInteger(value) ? value : null),
            },
          }],
        },
      },
    });
  }

  render() {
    return (
      <div className="result-graph">
        <canvas ref={(c) => { this.graph = c; }} />
        <style jsx>
          {`
            .result-graph {
              background-color: #2b2b2b;
              border-radius: 4px;
              padding: 8px;
            }
          `}
        </style>
      </div>
    );
  }
}

ResultGraph.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default ResultGraph;
