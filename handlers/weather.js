const cheerio = require('cheerio');
const request = require('request');

module.exports = function(app) {
  return {
    scrape: function (req, res, next) {
      request({
          url: 'https://weather.com/weather/tenday/l/15224:4:US',
          method: 'GET',
          headers: {
            'Accept-Charset': 'utf-8'
          }
        }, function(err, response, body) {
          if(err) {
            return next(err);
          }
          console.log(response.statusCode);
          let $ = cheerio.load(body);
          let $weatherTable = $('.twc-table');
          let weather = $weatherTable.find('tr.clickable').map(function() {
            let self = $(this);
            return {
              day: self.find('.day-detail').text(),
              description: self.find('td.description').text(),
              temp: {
                hi: self.find('td.temp > div > span').first().text(),
                lo: self.find('td.temp > div > span').last().text()
              }
            }
          });
          console.log('length weather ' + weather.length);
          res.locals = {
            weather: weather.length > 5 ? weather.slice(0, 5) : weather
          };
          next();
      });
    },
    api: function (req, res, next) {
      request({
          //TODO: store key in config file
          url: 'http://api.openweathermap.org/data/2.5/weather?q=pittsburgh&appid=a83b736fb31d8b6705a909743cac5b99',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }, function(err, response, json) {
          if(err) {
            return next(err);
          }
          console.log(json);
          // res.locals = {
          //   weather: weather.length > 5 ? weather.slice(0, 4) : weather
          // };
          next();
      });
    }
  }
}
