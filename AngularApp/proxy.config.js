const proxy = [
  {
    context: '/api',
    target: 'https://br1.api.riotgames.com/lol/match/v4/',
    pathRewrite: {'^/api' : ''},
    secure: false
  }
];
module.exports = proxy;