// Copyright (c) 2017-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

module.exports = (width, labels, data) =>
({
  type: "doughnut",
  data: {
    labels,
    datasets: [{
        data,
        backgroundColor: [
          "rgba(255, 105, 120, 1)",
          "rgba(52, 0, 104, 1)",
          "rgba(177, 237, 232, 1)",
          "rgba(109, 67, 90, 1)"
        ]
    }]
  },
  options:  {
    legend: {
      labels: {
        boxWidth: (width / labels.length) / 4,
        fontSize: 24
      }
    }
  }
})
