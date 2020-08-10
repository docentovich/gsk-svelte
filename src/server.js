import sirv from 'sirv';
import compression from 'compression';
import * as sapper from '@sapper/server'
const proxy = require('express-http-proxy')
const expressApp = require('express')();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

expressApp.use('/api', proxy('http://web',{
	proxyReqPathResolver: function (req) {
		return '/wp-json' + req.url;
	}
}))

expressApp // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
