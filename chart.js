// Copyright (c) 2017-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

const Task = require('data.task')
const ChartjsNode = require('chartjs-node')

const create = ({width, height}) =>
  new ChartjsNode(width, height)

const draw = (chart, opts) =>
  new Task((rej, res) =>
    chart.drawChart(opts).then(() => res(chart)).catch(rej))

const toBuffer = chart =>
  new Task((rej, res) =>
    chart.getImageBuffer('image/png').then(res).catch(rej))

const destroy = chart =>
  new Task((rej, res) =>
    res(chart.destroy()))

module.exports = {create, draw, toBuffer, destroy}
