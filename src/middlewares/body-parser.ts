import express from 'express'

const bodyParserApp = express()

bodyParserApp.use(express.json())
bodyParserApp.use(express.urlencoded({ extended: false }))

export default bodyParserApp
