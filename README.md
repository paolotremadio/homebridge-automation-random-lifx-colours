
# Automation - Lifx colour palettes  

## Intro
This accessory will apply a colour palette on your Lifx Z light trip.

The list of palettes must be stored on a file. The plugin will pick a random palette from the file every time you turn on the switch. If you want to apply always the same palette, create a json file with only one palette.

## Palettes file

Example:

```json
[
  {
    "name": "Giant Goldfish",
    "url": "https://www.colourlovers.com/palette/92095/Giant_Goldfish",
    "author": {
      "name": "manekineko",
      "url": "https://www.colourlovers.com/lover/manekineko"
    },
    "palette": [
      "#69d2e7",
      "#a7dbd8",
      "#e0e4cc",
      "#f38630",
      "#fa6900"
    ]
  },
  {
    "name": "Random 1",
    "url": "https://www.colourlovers.com/palette/629637/()",
    "author": {
      "name": "sugar!",
      "url": "https://www.colourlovers.com/lover/sugar%21"
    },
    "palette": [
      "#fe4365",
      "#fc9d9a",
      "#f9cdad",
      "#c8c8a9",
      "#83af9b"
    ]
  }
]
```

The JSON file must contain an array of objects. Each object will be a palette.

Format of each palette object:
| Attribute | Required | Description | Example |
|-----------|----------|-------------|---------|
| name | Yes | The name of the palette | `Random 1` |
| url | No | A link to the original palette (if any) | `https://website.com/palette` |
| author.name | No (default: `unknown`) | The name of the author of the palette | `John Doe` |
| author.url | No | An attribution link, if any | `https://webside.com/author` |
| palette | Yes | An array of HEX colour codes, starting with "#". You can have as many colours as you like, the palette will be spread across the zones of your Lifx Z strip. The max number of colours is the number of zones of your light strip (24 in the config example). | `["#ff0000", "#bb0000"]` |

You can find an example file in this repo under `palettes.json`. This file contains the top palettes from [COLOURlovers](https://www.colourlovers.com). 


## Config
  
Example config.json:  
  
```json
{
  "accessories": [
    {
      "accessory": "AutomationLifxColourPalettes",
      "name": "Lifx Z Colour Palette",
      "light": {
        "ip": "192.168.1.26",
        "mac": "d0:00:00:00:00:00",
        "zones": 24
      },
      "standardMode": {
        "brightness": 65
      },
      "fadeInMode": {
        "brightness": 100,
        "transitionDuration": 180
      },
      "palettesFile": "./palettes.json"
    }
  ]
}
```

This accessory will create a switch. Turning on the switch will apply a random palette to your Lifx Z light trip. The switch will turn off automatically after 1 second.

The switch has the following properties:

| Name | Description | Example |
|------|-------------|---------|
| Author | The name of the author of the current applied palette | `John Doe` |
| Palette |The name of the current applied palette | `Random 1` |
| Fade in | To be used instead of the main `Power switch`. It will pick a random palette and fade-in the lights. | Switch |

Note: some properties are not compatible with iOS Home app, use [Elgato Eve app](https://itunes.apple.com/us/app/elgato-eve/id917695792?mt=8) instead.
  
## Configuration options  
  
| Attribute | Required | Usage | Example |
|-----------|----------|-------|---------|
| name | Yes | A unique name for the accessory. It will be used as the accessory name in HomeKit. | `Living Room Light` |
| light.ip | Yes | The IP address of the light (this plugin does not currently support autodetect) | `192.168.1.26` |
| light.mac | Yes | The MAC address of the light (this plugin does not currently support autodetect) | `d0:00:00:00:00:00` |
| light.zones | Yes | The number of zones of your lightstrip (this plugin does not currently support autodetect) | `24` |
| standardMode.brightness | No (default: `100`) | The brightness to be set when turning on the main switch | `65` (% brightness) |
| fadeInMode.brightness | No (default: `100`) | The brightness to be set when turning on the fade-in switch | `100` (% brightness) |
| fadeInMode.transitionDuration | No (default: `1`) | The number of seconds to fade-in the light when turning on the fade-in switch | `180` (seconds) |
| palettesFile | Yes | The path of the palette file (relative to the Homebridge current working directory) | `./palettes.json` |

## Credits
Big thanks to [@futomi](https://github.com/futomi/node-lifx-lan) for the support in improving the `Node Lifx lan` module.  
