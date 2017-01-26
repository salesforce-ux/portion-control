const express = require('express')
const app = express()
const Task = require('data.task')
const renderChart = require('./render-chart')

const compression = require('compression')
const port = process.env.PORT || 3000

app.use(compression())
app.use(express.static(__dirname))
app.set('view engine', 'ejs')

const listen = (app, port) =>
  new Task((rej, res) =>
    app.listen(port, (err) =>
      err ? rej(err) : res(port)))

app.get('/pie.png', (req, res) =>
    renderChart(req.query)
    .fork(e => res
               .status(500)
               .send(`error ${e}`),
          r => res
               .contentType('image/png')
               .send(r)))

listen(app, port)
.map(port => `Listening on port ${port}`)
.fork(console.error, console.log)

