// Copyright (c) 2015, salesforce.com, inc. - All rights reserved
// Licensed under BSD 3-Clause - https://opensource.org/licenses/BSD-3-Clause

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
    .fork(error => res
               .status(500)
               .send(`error ${error}`),
          result => res
               .contentType('image/png')
               .send(result)))

listen(app, port)
.map(port => `Listening on port ${port}`)
.fork(console.error, console.log)

