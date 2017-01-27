// Copyright (c) 2015, salesforce.com, inc. - All rights reserved
// Licensed under BSD 3-Clause - https://opensource.org/licenses/BSD-3-Clause

const Task = require('data.task')
const Chart = require('./chart')
const {Map} = require('immutable')
const chartOptions = require('./chart-ops')

const optsFromValues = (width, values) =>
  chartOptions(width, values.keySeq().toArray(), values.valueSeq().toArray())

const formatSize = size => {
  const [width, height] = size.split('x').map(Number)
  return {width, height}
}

const formatQuery = query =>
  Task.of(query)
  .map(Map)
  .map(params =>
    ({ size: formatSize(params.get('size')),
       values: params.delete('size')
    }))

module.exports = query =>
  formatQuery(query)
  .chain(({size, values}) =>
    Chart.draw(Chart.create(size), optsFromValues(size.width, values)))
  .chain(chart =>
    Chart.toBuffer(chart)
    .chain(buffer =>
      Chart.destroy(chart)
      .map(() => buffer)))
