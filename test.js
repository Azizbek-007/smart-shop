var QRCode = require('qrcode')


QRCode.toFile(`/Users/muse/Desktop/1-sabaq/home/smart-shop/src/images/image.png`, 'sas'.toString(), function (err) {
  if (err) throw err
  console.log('done')
})