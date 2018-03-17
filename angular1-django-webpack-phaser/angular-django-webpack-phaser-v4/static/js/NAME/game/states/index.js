var Game = {
  name: 'NAME',

};

require('./StatePreloader')(Game);
require('./StateTitle')(Game);
require('./StateMain')(Game);

module.exports = Game;
