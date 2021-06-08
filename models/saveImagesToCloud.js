'use strict'

const { Storage } = require('@google-cloud/storage')
const storage = new Storage({ projectId: process.env.GCLOUD_PROJECT, credentials: { client_email: process.env.GCLOUD_CLIENT_EMAIL, private_key: process.env.GCLOUD_PRIVATE_KEY } })
const bucket = storage.bucket(process.env.GCS_BUCKET)

async function saveImages (file) {
  try {
    const filename = Date.now() + '--' + file.originalname
    const blob = bucket.file(filename)
    const blobStream = blob.createWriteStream()
    blobStream.on('error', (err) => { console.log(err) })
    blobStream.on('finish', () => {
      const publicUrl = `http://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`
    })
    blobStream.end(file.buffer)
    console.log(blob.publicUrl())
    let data = ''
    data = blob.publicUrl()
    return data
  } catch (err) {
    console.log(err)
  }
}
module.exports = saveImages
