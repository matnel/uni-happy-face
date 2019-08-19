const { Router } = require('express')

const app = require('../../utils/app')
const { prisma } = require('../../generated/prisma-client')
const { log } = require('../../lib/log')

const router = Router()

router.get('/', async (req, res) => {
  if (req.query.query) {
    log.info(`get.rooms.withQuery.${req.query.query}`)
    res.json(await prisma.rooms({ where: { name_contains: req.query.query } }))
  } else {
    log.info('get.rooms.all')
    res.json(await prisma.rooms())
  }
})

router.post('/', async (req, res) => {
  log.info('post.rooms')
  res.json(await prisma.createRoom({ ...req.body }))
})

router.get('/:id', async (req, res) => {
  log.info('get.room')
  const room = await prisma.room({ id: req.params.id })
  if (!room) return res.status(404).send('Not found')
  res.json(room)
})

router.put('/:id', async (req, res) => {
  log.info('put.room')
  const { name } = req.body
  res.json(
    await prisma.updateRoom({
      where: { id: req.params.id },
      data: { name },
    })
  )
})

app.use('/api/rooms', router)

module.exports = app
