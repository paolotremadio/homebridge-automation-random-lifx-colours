const Lifx = require('node-lifx-lan');
const debug = require('debug')('pt-lifx-colour-palettes');

class LifxColourPalettes {
  constructor({ light, logger }) {
    this.log = logger;

    this.device = null;

    this.lightConfig = {
      ip: light.ip,
      mac: light.mac,
    };

    this.lightSettings = {
      zones: light.zones,
    };
  }

  async detectDevice() {
    if (!this.device) {
      debug('Detecting device...');
      this.device = await Lifx.createDevice(this.lightConfig);
      debug('Device detected');
    } else {
      debug('Device already detected');
    }
  }

  async destroyDevice() {
    if (this.device) {
      debug('Destroying device...');
      await Lifx.destroy();
      this.device = null;
      debug('Device destroyed');
    }
  }

  calculateZonesPerColour(numberOfColours) {
    const numberOfZones = this.lightSettings.zones;

    const zonesPerColour = Math.floor(numberOfZones / numberOfColours);
    const buckets = [];

    // Divide the zones
    for (let x = 0; x < numberOfColours; ++x) {
      buckets[x] = zonesPerColour;
    }

    // Distribute the reminder
    const remainder = numberOfZones % numberOfColours;
    for (let x = 0; x < remainder; ++x) {
      buckets[x]++;
    }

    // Format the output
    let start = 0;
    const bucketObjects = [];
    buckets.forEach((zonesInBucket) => {
      bucketObjects.push({
        start,
        end: (start + zonesInBucket) - 1,
      });

      start += zonesInBucket;
    });

    return bucketObjects;
  }

  async applyPaletteToLight(paletteColoursArray, brightness = 1.0, transitionDuration = 1000) {
    const colourInPalette = paletteColoursArray.length;

    const zones = this.calculateZonesPerColour(colourInPalette);
    debug(`Setting palette over ${colourInPalette} buckets`);

    try {
      await this.detectDevice();
    } catch (e) {
      this.log(`Cannot detect device -- ${e.toString()}`);
    }

    try {
      for (let x = 0; x < colourInPalette; ++x) {
        const zone = zones[x];

        debug(`  Bucket: ${x} - Start: ${zone.start} - End: ${zone.end} - Color: ${paletteColoursArray[x]}`);

        await this.device.multiZoneSetColorZones({
          start: zone.start,
          end: zone.end,
          color: { css: paletteColoursArray[x], brightness },
          duration: 500,
          apply: 1,
        });
      }
    } catch (e) {
      this.log(`Cannot apply palette -- ${e.toString()}`);
    }

    try {
      await this.device.lightSetPower({
        level: 1,
        duration: transitionDuration,
      });
    } catch (e) {
      this.log(`Cannot turn on device -- ${e.toString()}`);
    }

    try {
      await this.destroyDevice();
    } catch (e) {
      this.log(`Cannot destroy device -- ${e.toString()}`);
    }
  }
}

module.exports = LifxColourPalettes;
