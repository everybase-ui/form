import { getIn } from '../src/utils'

describe('getIn', () => {
    const object = {
        name: 'Luke Skywalker',
        height: 172,
        starships: [
            {
                name: "X-wing",
                length: 12.5
            },
            {
                name: "Imperial shuttle",
                length: 20
            }
        ]
    }

    it('returns matched value against path', () => {
        expect(getIn(object, 'name')).toBe('Luke Skywalker')
        expect(getIn(object, 'height')).toBe(172)
    })
})