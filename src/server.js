import sirv from 'sirv'
import compression from 'compression'
import * as sapper from '@sapper/server'
import { redirects } from './redirects'

const proxy = require('express-http-proxy'),
  https = require('https'),
  fs = require('fs')
const express = require('express')
const httpsApp = express() // https
const httpApp = express() // http

const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const prod = !dev;

// inner request network
httpApp.use(
  '/api',
  proxy('http://web', {
    proxyReqPathResolver: function(req) {
      return '/wp-json' + req.url
    },
  })
)
httpsApp.use(
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

// on prod http -> https && ignore .well-known
if (prod) {
  // http
  httpApp.use(
    '/.well-known/acme-challenge',
    express.static(
      '/var/www/front/public/static/letsencrypt/.well-known/acme-challenge',
      { dotfiles: 'allow' }
    )
  )
  httpApp.get(/^(.(?!.well-known))*$/, function(req, res) {
    res.redirect('https://' + req.headers.host + req.url)
  })

  httpsApp.get(/.*/, function(req, res, next) {
    const host = req.header("host");
    if (host.match(/^www\..*/i)) {
      next();
    } else {
      res.redirect(301, "https://www." + host + req.url);
    }
  });

  //https
  const context = {
    server: null,
    endDate: null,
    failRuns: 0
  };


  // in prod mode prod redirects and use sapper
  redirects(httpsApp)

  httpsApp.use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware()
  )

  safeStartHttps(context);
}


// need to be listened here in order to redirect && ignore .well-known in prod
// and use http:// for dev mode
httpApp.listen(3000, err => {
  // http
  if (err) console.log('error', err)
})



// util server run logic
function safeStartHttps(_context) {
  try {

    const options = {
      key: fs.readFileSync('/etc/letsencrypt/live/gsk-stroy.ru/privkey.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/gsk-stroy.ru/chain.pem'),
      cert: fs.readFileSync(
        '/etc/letsencrypt/live/gsk-stroy.ru/fullchain.pem'
      ),
    }

    startHttpsWithAutoRefresh(options, _context);

  } catch (e) {

    _context.failRuns ++;
    if(_context.failRuns < 20) {
      console.log(JSON.stringify(e));
      setTimeout(() => safeStartHttps(_context), 1000 * 60)
    } else {
      console.log('no cert, stop trying after 20 attempts');
    }

  }
}

function startHttpsWithAutoRefresh(_options, _context) {
  startServer(_options, _context);
  // setInterval(() => {
  //   let curDate  = new Date();
  //   if(_context.endDate && (_context.endDate > curDate)){
  //     return;
  //   }
  //   startServer(_options, _context);
  // },  1000 * 60 * 60 * 24 * 5)
}

function setEndDate(_context) {
  _context.endDate = new Date();
  _context.endDate.setDate((new Date()).getDate() + 30);
}

function startServer(_options, _context) {
  setEndDate(_context);
  _context.server && _context.server.close();
  _context.server = https.createServer(_options, httpsApp)

  _context.server.listen(3001, function() {
    // https
    console.log('https started on 3001')
  });
}
