import { getIn } from '../src/utils'

describe('getIn', () => {
    const object = {
        name: 'Anakin Skywalker',
        height: 188,
        wife: {
            name: 'Padmé Amidala',
            height: 185
        },
        starships: [
            {
                name: "Naboo fighter",
                length: 11
            },
            {
                name: "Trade Federation cruiser",
                length: 1088
            },
            {
                name: 'Jedi Interceptor',
                length: 5.47
            }
        ]
    }

    it('returns matched value against path', () => {
        expect(getIn(object, 'name')).toBe('Anakin Skywalker')
        expect(getIn(object, 'height')).toBe(188)
        expect(getIn(object, 'wife.name')).toBe('Padmé Amidala')
        expect(getIn(object, 'wife.height')).toBe(185)
    })
})