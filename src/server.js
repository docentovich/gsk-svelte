import sirv from 'sirv'
import compression from 'compression'
import * as sapper from '@sapper/server'

const proxy = require('express-http-proxy'),
  https = require('https'),
  fs = require('fs')
const expressApp = require('express')()
const httpApp = require('express')()

const { NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

if (!dev) {
  httpApp.get(/^((?!.*api.*).)*$/, function(req, res) {
    res.redirect('https://' + req.headers.host + req.url)
  })
}

httpApp.use(
  '/api',
  proxy('http://web', {
    proxyReqPathResolver: function(req) {
      return '/wp-json' + req.url
    },
  })
)

if (dev) {
  httpApp.use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware()
  )
}

httpApp.listen(3000, err => {
  if (err) console.log('error', err)
})

if (!dev) {
  expressApp.get(
    /\/(stati-pereplanirovki|soglasovanie-stroitelstva)\/([a-zA-Z\-\_\?\&]+)/,
    (req, res) => {
      res.redirect('/' + req.params[1])
    }
  )

  expressApp
    .use(
      '/api',
      proxy('http://web', {
        proxyReqPathResolver: function(req) {
          return '/wp-json' + req.url
        },
      })
    )
    .use(
      compression({ threshold: 0 }),
      sirv('static', { dev }),
      sapper.middleware()
    )

  try {
    // var options = {
    //   key: fs.readFileSync('/etc/letsencrypt/live/example.org/privkey.pem'),
    //   ca: fs.readFileSync('/etc/letsencrypt/live/example.org/ca_bundle.crt'),
    //   cert: fs.readFileSync('/etc/letsencrypt/live/example.org/fullchain.pem'),
    // }
    const options = {
      key: fs.readFileSync('/etc/ssl/private.key'),
      ca: fs.readFileSync('/etc/ssl/ca_bundle.crt'),
      cert: fs.readFileSync('/etc/ssl/certificate.crt'),
    }

    const server = https.createServer(options, expressApp)

    server.listen(3001, function() {
      console.log('https')
    })
  } catch (e) {
    console.log('error:', e)
  }
}
