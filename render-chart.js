const Task = require('data.task')
const Canvas = require('canvas')
const Chart = require('nchart')

const official = [
  {
    value: 300,
    color:"#F7464A",
    highlight: "#FF5A5E",
    label: "Red"
  },
  {
    value: 50,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Green"
  },
  {
    value: 100,
    color: "#FDB45C",
    highlight: "#FFC870",
    label: "Yellow"
  },
  {
    value: 40,
    color: "#949FB1",
    highlight: "#A8B3C5",
    label: "Grey"
  },
  {
    value: 120,
    color: "#4D5360",
    highlight: "#616774",
    label: "Dark Grey"
  }
]

// makeCanvas :: {width :: Int, height :: Int } -> Canvas
const makeCanvas = ({width, height}) =>
  new Canvas(width, height)

const makeChart = context =>
  new Chart(context)

const doughnut = (chart, context, data, options) =>
  new Task((rej, res) => {
    chart.Doughnut(data, options) // mutates!
    res(context)
  })

const chartToBuffer = canvas =>
  new Task((rej, res) =>
    canvas.toBuffer((err, buf) =>
      err ? rej(err) : res(buf)))

const getSize = params =>
  params.size.split('x').map(Number)

const partitionParams = params =>{
  const [width, height] = getSize(params)

  return {
    size: { width, height },
    values: params
  }
}

module.exports = query =>
  Task.of(query)
  .map(partitionParams)
  .chain(({size, values}) =>
    Task.of(makeCanvas(size))
    .chain(canvas =>
      doughnut(makeChart(canvas.getContext('2d')), canvas, official, {  scaleShowValues: true, scaleFontSize: 24})))
  .chain(chartToBuffer)
