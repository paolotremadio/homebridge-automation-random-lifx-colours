const { Characteristic } = require('hap-nodejs');

const PaletteNameUUID = '85c4fc02-98ed-11e8-9eb6-529269fb1459';
function PaletteName() {
  const char = new Characteristic('Palette', PaletteNameUUID);

  char.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
  });
  char.value = char.getDefaultValue();

  return char;
}
PaletteName.UUID = PaletteNameUUID;

const PaletteAuthorUUID = '85c4ffcc-98ed-11e8-9eb6-529269fb1459';
function PaletteAuthor() {
  const char = new Characteristic('Author', PaletteAuthorUUID);

  char.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
  });
  char.value = char.getDefaultValue();

  return char;
}
PaletteAuthor.UUID = PaletteAuthorUUID;

module.exports = {
  PaletteName,
  PaletteAuthor,
};
