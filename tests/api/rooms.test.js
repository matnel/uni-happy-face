const client = require('./client')

describe('GET /rooms', () => {
  it('responds with JSON', async () => {
    const response = await client.get('/rooms')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.data).toBeInstanceOf(Array)
  })

  it('filters rooms by name', async () => {
    const roomsResponse = await client.get('/rooms')
    const room = roomsResponse.data[0]
    const response = await client.get(`/rooms?query=${room.name}`)
    expect(response.status).toBe(200)
    expect(response.data.length <= roomsResponse.data.length)
  })
})

describe('GET /rooms/:id', () => {
  it('responds with JSON', async () => {
    const roomsResponse = await client.get('/rooms')
    const room = roomsResponse.data[0]
    const response = await client.get(`/rooms/${room.id}`)
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.data).toMatchObject(room)
  })
})

describe('POST /rooms', () => {
  it('creates a new room', async () => {
    const beforeResponse = await client.get('/rooms')
    const randomName = Math.random()
      .toString(36)
      .substring(7)
    const response = await client.post('/rooms', { name: randomName })
    const afterResponse = await client.get('/rooms')

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.data.name).toBe(randomName)

    expect(beforeResponse.data.length).toBeLessThan(afterResponse.data.length)
    expect(
      afterResponse.data.find(room => room.id === response.data.id)
    ).toBeDefined()
  })
})

describe('PUT /rooms/:id', () => {
  it('updates the name of the room', async () => {
    const randomName = Math.random()
      .toString(36)
      .substring(7)
    const newRoomResponse = await client.post('/rooms', { name: randomName })
    const newRoom = newRoomResponse.data
    const newRandomName = Math.random()
      .toString(36)
      .substring(7)
    const response = await client.put(`/rooms/${newRoom.id}`, {
      name: newRandomName,
    })

    expect(newRoom.name).toBe(randomName)

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.data.id).toBe(newRoom.id)
    expect(response.data.name).toBe(newRandomName)
  })
})
