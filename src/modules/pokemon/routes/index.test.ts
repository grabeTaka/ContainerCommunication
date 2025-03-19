import request from 'supertest'

describe('GET /api/pokemons/:pokemon_name', () => {
    it('Should return a pokemon returned by api', () => {
        request(`http://localhost:${process.env.APPLICATION_PORT}`)
            .get('/api/pokemons/pikachu')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})
