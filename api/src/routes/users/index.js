const { Router } = require('express')

const app = require('../../utils/app')
const { prisma } = require('../../generated/prisma-client')
const { log } = require('../../lib/log')

const router = Router()

const USER_WITH_ROOMS = /* GraphQL */ `
  fragment UserWithRooms on User {
    id
    createdAt
    updatedAt

    name
    expoPushToken
    rooms {
      id
      name
    }
  }
`

router.get('/', async (req, res) => {
  if (req.query.query) {
    log.info(`get.users.withQuery.${req.query.query}`)
    res.json(
      await prisma
        .users({ where: { name_contains: req.query.query } })
        .$fragment(USER_WITH_ROOMS)
    )
  } else {
    log.info('get.users.all')
    res.json(await prisma.users().$fragment(USER_WITH_ROOMS))
  }
})

router.post('/', async (req, res) => {
  res.json(await prisma.createUser({ ...req.body }).$fragment(USER_WITH_ROOMS))
})

router.get('/:id', async (req, res) => {
  const user = await prisma
    .user({ id: req.params.id })
    .$fragment(USER_WITH_ROOMS)
  if (user) {
    res.json(user)
  } else {
    res.status(404).send('Not found')
  }
})

router.put('/:id', async (req, res) => {
  const { expoPushToken, room } = req.body
  const data = {}

  if (expoPushToken) {
    log.info('put.user | update Expo push token')
    data.expoPushToken = expoPushToken
  }

  if (room) {
    log.info(`put.user | connect room: ${room}`)
    data.rooms = { connect: { id: room } }
  }

  res.json(
    await prisma
      .updateUser({
        where: { id: req.params.id },
        data,
      })
      .$fragment(USER_WITH_ROOMS)
  )
})

router.get('/name/:name', async (req, res) => {
  const user = await prisma
    .user({ name: req.params.name })
    .$fragment(USER_WITH_ROOMS)
  if (user) {
    res.json(user)
  } else {
    res.status(404).send('Not found')
  }
})

app.use('/api/users', router)

module.exports = app
