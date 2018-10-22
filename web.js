const express = require('express'),
      fs = require('fs'),
      cheerio = require('cheerio'),
      url = require('url');

const PORT = process.env.PORT || 5000,
      html = fs.readFileSync('./index.html', 'utf8');

express()
  .get('/', (req, res) => {
    let params = url.parse(req.url, true).query;
    let $ = cheerio.load(html);  
    if (params.title != '') {
      $('#title').text(params.title);
    }
    if (params.hex != '') {
      $('#c-1').css({ fill: '#'+params.hex })
      $('#c-2').css({ fill: '#'+params.hex })
      $('#c-3').css({ fill: '#'+params.hex })
      $('#c-4').css({ fill: '#'+params.hex })
    }
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.send($('#svgForyou').html());
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))