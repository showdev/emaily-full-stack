const localtunnel = require('localtunnel')
localtunnel(5000, { subdomain: 'ewmjzkemshay' }, function(err, tunnel) {
  console.log('LT running on ', tunnel.url)
})
