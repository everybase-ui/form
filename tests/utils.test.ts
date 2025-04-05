import { getIn } from '../src/utils'
import type { PathOf, ValueIn } from '../src/utils'

const starships = [
    {
        name: "Naboo fighter",
        length: 11,
        cargo_capacity: 65
    },
    {
        name: "Trade Federation cruiser",
        length: 1088,
        cargo_capacity: 50000000
    },
    {
        name: 'Jedi Interceptor',
        length: 5.47,
        cargo_capacity: 60
    }
]

const character = {
    name: 'Anakin Skywalker',
    height: 188,
    wife: {
        name: 'Padmé Amidala',
        height: 185
    },
    starships
}

const characters = [character]

type Starships = typeof starships
type Character = typeof character
type Characters = typeof characters

describe('types', () => {
    it('PathOf', () => {
        const starshipsPaths: PathOf<Starships>[] = ['[0]', '[1].name', '[10].length', '[999].cargo_capacity']
        expect(starshipsPaths).toBeDefined()

        const characterPaths: PathOf<Character>[] = ['height', 'name', 'wife', 'wife.height', 'wife.name', 'starships', 'starships[0].name', 'starships[1].length', 'starships[10].cargo_capacity']
        expect(characterPaths).toBeDefined()
    })

    it ('ValueIn', () => {
        const starship: ValueIn<Starships, '[0]'> = starships[0]
        expect(starship).toBeDefined()

        const starshipName: ValueIn<Starships, '[0].name'> = starships[0].name
        expect(starshipName).toBeDefined()

        const starshipLength: ValueIn<Starships, '[1].length'> = starships[1].length
        expect(starshipLength).toBeDefined()

        const starshipCargoCapacity: ValueIn<Starships, '[2].cargo_capacity'> = starships[2].length
        expect(starshipCargoCapacity).toBeDefined()

        const characterName: ValueIn<Character, 'name'> = character.name
        expect(characterName).toBeDefined()

        const characterWifeHeight: ValueIn<Character, 'wife.height'> = character.wife.height
        expect(characterWifeHeight).toBeDefined()

        const characterStarshipName: ValueIn<Character, 'starships[0].name'> = character.starships[0].name
        expect(characterStarshipName).toBeDefined()

        const firstCharacterStarshipLength: ValueIn<Characters, '[0].starships[0].length'> = characters[0].starships[0].length
        expect(firstCharacterStarshipLength).toBeDefined()
    })
})

describe('getIn', () => {
    it('returns matched value against path', () => {
        expect(getIn(starships, '[1].name')).toBe('Trade Federation cruiser')
        expect(getIn(starships, '[2].length')).toBe(5.47)
        expect(getIn(starships, '[0].cargo_capacity')).toBe(65)

        expect(getIn(character, 'name')).toBe('Anakin Skywalker')
        expect(getIn(character, 'height')).toBe(188)
        expect(getIn(character, 'wife.name')).toBe('Padmé Amidala')
        expect(getIn(character, 'wife.height')).toBe(185)
        expect(getIn(character, 'starships[0].name')).toBe('Naboo fighter')
        expect(getIn(character, 'starships[1].length')).toBe(1088)
        expect(getIn(character, 'starships[2].cargo_capacity')).toBe(60)

        expect(getIn(characters, '[0].starships[2].name')).toBe('Jedi Interceptor')
        expect(getIn(characters, '[0].starships[0].length')).toBe(11)
        expect(getIn(characters, '[0].starships[1].cargo_capacity')).toBe(50000000)
    })
})