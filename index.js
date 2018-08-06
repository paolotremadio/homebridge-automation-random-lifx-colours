const fs = require('fs');
const debug = require('debug')('automation-random-lifx-colours');
const pkginfo = require('./package');

const CustomCharacteristics = require('./custom-characteristics');
const LifxColourPalettes = require('./lifx-colour-palettes');

let Service;
let Characteristic;

class AutomationRandomLifxColours {
  constructor(log, config) {
    this.log = log;

    const { light, palettesFile, name, standardMode, fadeInMode } = config;

    this.name = name;

    this.currentPaletteName = 'none';
    this.currentPaletteAuthor = 'none';

    this.loadPalettes(palettesFile);

    this.lifxColourPalettes = new LifxColourPalettes({
      light,
      logger: log,
    });

    this.standardModeConfig = {
      brightness: (standardMode.brightness || 100) / 100,
      transitionDuration: (standardMode.transitionDuration || 1) * 1000,
    };

    this.fadeInModeConfig = {
      brightness: (fadeInMode.brightness || 100) / 100,
      transitionDuration: (fadeInMode.transitionDuration || 1) * 1000,
    };

    this.createServices();
  }

  createServices() {
    this.switchService = new Service.Switch(this.name);

    this.switchService
      .getCharacteristic(Characteristic.On)
      .on('get', callback => callback(null, false))
      .on('set', this.setSwitch.bind(this));

    this.switchService
      .addCharacteristic(CustomCharacteristics.FadeInMode)
      .on('get', callback => callback(null, false))
      .on('set', this.setFadeIn.bind(this));

    this.switchService
      .addCharacteristic(CustomCharacteristics.PaletteName)
      .on('get', callback => callback(null, this.currentPaletteName));

    this.switchService
      .addCharacteristic(CustomCharacteristics.PaletteAuthor)
      .on('get', callback => callback(null, this.currentPaletteAuthor));

    this.accessoryInformationService = new Service.AccessoryInformation()
      .setCharacteristic(Characteristic.Name, this.name)
      .setCharacteristic(Characteristic.Manufacturer, pkginfo.author.name || pkginfo.author)
      .setCharacteristic(Characteristic.Model, 'LIFX Z')
      .setCharacteristic(Characteristic.SerialNumber, 'n/a')
      .setCharacteristic(Characteristic.FirmwareRevision, pkginfo.version)
      .setCharacteristic(Characteristic.HardwareRevision, pkginfo.version);
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
    return [
      this.switchService,
      this.accessoryInformationService,
    ];
  }

  setSwitch(on, callback) {
    if (on) {
      this
        .setRandomPalette()
        .then(() => {
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

  setFadeIn(on, callback) {
    if (on) {
      this
        .setRandomPalette(true)
        .then(() => {
          // Turn off the switch after one second
          setTimeout(() => {
            this.switchService
              .setCharacteristic(CustomCharacteristics.FadeInMode, false);
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

  async setRandomPalette(fadeInMode = false) {
    const paletteConfig = this.pickRandomPalette();

    const { brightness, transitionDuration } = this[fadeInMode ? 'fadeInModeConfig' : 'standardModeConfig'];

    const paletteName = paletteConfig.name;
    const paletteAuthor = paletteConfig.author.name || 'unknown';

    this.log(`Applying palette "${paletteName}" by ${paletteAuthor}`);
    await this.lifxColourPalettes.applyPaletteToLight(paletteConfig.palette, brightness, transitionDuration);

    this.currentPaletteName = paletteName;
    this.currentPaletteAuthor = paletteAuthor;

    this.refreshValues();
  }
}

module.exports = (homebridge) => {
  Service = homebridge.hap.Service; // eslint-disable-line
  Characteristic = homebridge.hap.Characteristic; // eslint-disable-line

  homebridge.registerAccessory('homebridge-automation-random-lifx-colours', 'AutomationRandomLifxColours', AutomationRandomLifxColours);
};
