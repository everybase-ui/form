import { getIn } from '../src/utils'

describe('getIn', () => {
    const user =  {
        profile: {
            name: 'John',
            emails: ['john@gmail.com', 'doe@icloud.com']
        },
        friends: [
            {
                name: 'William',
                age: 30
            },
            {
                name: 'Selena',
                age: 28
            }
        ],
        children: null
    }
    it('returns value if found', () => {
        expect(getIn(user, 'profile.name')).toBe(user.profile.name)
        expect(getIn(user, 'profile.emails[0]')).toBe(user.profile.emails[0])
        expect(getIn(user, 'profile.emails[1]')).toBe(user.profile.emails[1])
        expect(getIn(user, 'friends[0].name')).toBe(user.friends[0].name)
        expect(getIn(user, 'friends[1].age')).toBe(user.friends[1].age)
        expect(getIn(user, 'children')).toBe(user.children)
    })

    it('returns undefined if not found', () => {
        expect(getIn(user, 'parent')).toBeUndefined()
        expect(getIn(user, 'profile.age')).toBeUndefined()
        expect(getIn(user, 'profile.emails[2]')).toBeUndefined()
        expect(getIn(user, 'friends[2].name')).toBeUndefined()
        expect(getIn(user, 'children.name')).toBeUndefined()
    })
})