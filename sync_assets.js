const Jimp = require('jimp')
const fs = require('fs')
const {
  faviconPhotoUri,
  headerPhotoUri,
  bgImgUri,
} = require('./src/constants/user.json')

// eslint-disable-next-line import/newline-after-import
;(async () => {
  try {
    if (faviconPhotoUri) {
      const favicon = await Jimp.read(faviconPhotoUri)
      favicon.cover(32, 32)
      const buf32Fav = await favicon.getBufferAsync(Jimp.MIME_PNG)
      fs.writeFileSync('./static/img/favicon-32x32.png', buf32Fav)
      favicon.cover(16, 16)
      const buf16Fav = await favicon.getBufferAsync(Jimp.MIME_PNG)
      fs.writeFileSync('./static/img/favicon-16x16.png', buf16Fav)
    }
  } catch (err) {
    console.error(err)
  }
  try {
    const header = await Jimp.read(headerPhotoUri)
    const bufHeader = await header.getBufferAsync(Jimp.MIME_JPEG)
    fs.writeFileSync('./static/img/og-image.jpg', bufHeader)
  } catch (err) {
    console.error(err)
  }
  try {
    if (bgImgUri) {
      const bgImg = await Jimp.read(bgImgUri)
      const bufBg = await bgImg.getBufferAsync(Jimp.MIME_PNG)
      fs.writeFileSync('./static/header_background.png', bufBg)
    }
  } catch (err) {
    console.error(err)
  }
})()
