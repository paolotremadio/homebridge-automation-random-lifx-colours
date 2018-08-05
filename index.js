const fs = require('fs');
const debug = require('debug')('automation-random-lifx-colours');
const CustomCharacteristics = require('./custom-characteristics');

const LifxColourPalettes = require('./lifx-colour-palettes');

let Service;
let Characteristic;

class AutomationRandomLifxColours {
  constructor(log, config) {
    this.log = log;

    const { light, palettesFile, name } = config;

    this.name = name;

    this.currentPaletteName = 'none';
    this.currentPaletteAuthor = 'none';

    this.loadPalettes(palettesFile);

    this.lifxColourPalettes = new LifxColourPalettes({
      light,
      logger: log,
    });

    this.createServices();
  }

  createServices() {
    this.switchService = new Service.Switch(this.name);

    this.switchService
      .getCharacteristic(Characteristic.On)
      .on('get', callback => callback(null, false))
      .on('set', this.setSwitch.bind(this));

    this.switchService
      .addCharacteristic(CustomCharacteristics.PaletteName)
      .on('get', callback => callback(null, this.currentPaletteName));

    this.switchService
      .addCharacteristic(CustomCharacteristics.PaletteAuthor)
      .on('get', callback => callback(null, this.currentPaletteAuthor));
  }

  refreshValues() {
    this.switchService
      .getCharacteristic(CustomCharacteristics.PaletteName)
      .updateValue(this.currentPaletteName);

    this.switchService
      .getCharacteristic(CustomCharacteristics.PaletteAuthor)
      .updateValue(this.currentPaletteAuthor);
  }

  getServices() {
    return [this.switchService];
  }

  setSwitch(on, callback) {
    if (on) {
      this
        .setRandomPalette()
        .then((palette) => {
          this.currentPaletteName = palette.name;
          this.currentPaletteAuthor = palette.author;

          this.refreshValues();

          // Turn off the switch after one second
          setTimeout(() => {
            this.switchService
              .setCharacteristic(Characteristic.On, false);
          }, 1000);

          callback();
        });
    } else {
      callback();
    }
  }

  loadPalettes(path) {
    const jsonFile = fs.readFileSync(path, 'utf8');
    this.palettes = JSON.parse(jsonFile);

    debug(`Loaded ${this.palettes.length} palettes`);
  }

  pickRandomPalette() {
    const { palettes } = this;

    return palettes[Math.floor(Math.random() * palettes.length)];
  }

  async setRandomPalette() {
    const paletteConfig = this.pickRandomPalette();

    const paletteName = paletteConfig.name;
    const paletteAuthor = paletteConfig.author.name || 'unknown';

    this.log(`Applying palette "${paletteName}" by ${paletteAuthor}`);
    await this.lifxColourPalettes.applyPaletteToLight(paletteConfig.palette, 0.5);

    return { name: paletteName, author: paletteAuthor };
  }
}

module.exports = (homebridge) => {
  Service = homebridge.hap.Service; // eslint-disable-line
  Characteristic = homebridge.hap.Characteristic; // eslint-disable-line

  homebridge.registerAccessory('homebridge-automation-random-lifx-colours', 'AutomationRandomLifxColours', AutomationRandomLifxColours);
};
