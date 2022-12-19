const vfsFonts = require('pdfmake/build/vfs_fonts');

var fonts = {
  Roboto: {
    normal: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
    bold: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
    italics: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
    bolditalics: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-MediumItalic.ttf'],'base64'),
    
  }
};

module.exports = {
  fonts
}
