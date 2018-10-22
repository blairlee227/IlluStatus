const express = require('express'),
      fs = require('fs'),
      cheerio = require('cheerio'),
      url = require('url'),
      SVGO = require('svgo');

const PORT = process.env.PORT || 5000,
      html = fs.readFileSync('./index.html', 'utf8');

express()
  .get('/', (req, res, next) => {
    let params = url.parse(req.url, true).query;
    let $ = cheerio.load(html);  
    if ('title' in params) {
      $('#title').text(params.title);
    }
    if (params.fill != '') {
      $('#c-1').css({ fill: params.fill })
      $('#c-2').css({ fill: params.fill })
      $('#c-3').css({ fill: params.fill })
      $('#c-4').css({ fill: params.fill })
    }
    let svg = $('#svgForyou').html();
    minify().optimize(svg).then(result => {
      res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
      res.send(result.data);
    }).then(next);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function minify() {
  return new SVGO({
    plugins: [{
      cleanupAttrs: true,
    }, {
      removeDoctype: true,
    },{
      removeXMLProcInst: true,
    },{
      removeComments: true,
    },{
      removeMetadata: true,
    },{
      removeTitle: true,
    },{
      removeDesc: true,
    },{
      removeUselessDefs: true,
    },{
      removeEditorsNSData: true,
    },{
      removeEmptyAttrs: true,
    },{
      removeHiddenElems: true,
    },{
      removeEmptyText: true,
    },{
      removeEmptyContainers: true,
    },{
      removeViewBox: false,
    },{
      cleanupEnableBackground: true,
    },{
      convertStyleToAttrs: false,
    },{
      convertColors: true,
    },{
      convertPathData: true,
    },{
      convertTransform: true,
    },{
      removeUnknownsAndDefaults: true,
    },{
      removeNonInheritableGroupAttrs: true,
    },{
      removeUselessStrokeAndFill: true,
    },{
      removeUnusedNS: true,
    },{
      cleanupIDs: true,
    },{
      cleanupNumericValues: true,
    },{
      moveElemsAttrsToGroup: true,
    },{
      moveGroupAttrsToElems: true,
    },{
      collapseGroups: true,
    },{
      removeRasterImages: false,
    },{
      mergePaths: true,
    },{
      convertShapeToPath: true,
    },{
      sortAttrs: true,
    },{
      removeDimensions: true,
    }]
  });
}