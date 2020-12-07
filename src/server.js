import sirv from 'sirv'
import compression from 'compression'
import * as sapper from '@sapper/server'
import { redirects } from './redirects'

const proxy = require('express-http-proxy'),
  https = require('https'),
  fs = require('fs')
const expressApp = require('express')() // https
const httpApp = require('express')() // http

const { NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

// no dev http -> https && ignore .well-known
if (!dev) {
  httpApp.use(
    '/.well-known/acme-challenge',
    express.static(
      '/var/www/front/static/letsencrypt/.well-known/acme-challenge',
      { dotfiles: 'allow' }
    )
  )
  httpApp.get(/^((?!.*api.*).)*$/, function(req, res) {
    res.redirect('https://' + req.headers.host + req.url)
  })
}

// inner request network
httpApp.use(
  '/api',
  proxy('http://web', {
    proxyReqPathResolver: function(req) {
      return '/wp-json' + req.url
    },
  })
)

// use http:// for dev mode and use sapper
if (dev) {
  httpApp.use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware()
  )
}

// need to be listened here in order to redirect && ignore .well-known in prod
// and use http:// for dev mode
httpApp.listen(3000, err => {
  // http
  if (err) console.log('error', err)
})

// in prod mode prod redirects and use sapper
if (!dev) {
  redirects(expressApp)

  expressApp.use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware()
  )

  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/www.gsk-stroy.ru/privkey.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/www.gsk-stroy.ru/chain.pem'),
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/www.gsk-stroy.ru/fullchain.pem'
    ),
  }

  let server;
  let endDate;

  function setEndDate() {
    endDate = new Date();
    endDate.setDate((new Date()).getDate() + 30);
  }

  function startServer() {
    setEndDate();
    server && server.close();
    server = https.createServer(options, expressApp)

    server.listen(3001, function() {
      // https
      console.log('https')
    });
  }

  startServer();
  setInterval(() => {
    let curDate  = new Date();
    if(endDate && (endDate > curDate)){
      return;
    }
    startServer();
  },  1000 * 60 * 60 * 24 * 5)

}
