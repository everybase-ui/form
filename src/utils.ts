type Key = string | number
type ArrayKey = `[${number}]`

type JoinPath<P1 extends Key, P2 extends Key> = `${P1}${P2 extends `[${number}]${string}` ? P2 : `.${P2}`}`

export type PathOf<T> = T extends object ? (
    T extends Array<infer I> ? (
        ArrayKey | JoinPath<ArrayKey, PathOf<I>>
    ) : (
        {
            [K in keyof T]: K extends `${Key}`
                ? K | JoinPath<K, PathOf<T[K]>>
                : never
        }[keyof T]
    )
) : never

type SplitArrayPath<P extends string> = P extends `${infer P1}[${number}]${infer P3}`
    ? P extends `${P1}${infer P2}${P3}`
        ? P1 extends ''
            ? [P2, P3]
            : [P1, `${P2}${P3}`]
        : never
    : [P, '']

    type SplitPath<P extends string> = P extends `${infer P1}.${infer P2}`
    ? SplitArrayPath<P1> extends [`${infer C1}`, `${infer C2}`]
        ? [C1, `${C2}${C2 extends '' ? '' : '.'}${P2}`]
        : never
    : SplitArrayPath<P>

export type ValueIn<T, P extends PathOf<T>> = SplitPath<P> extends [infer P1, infer P2]
    ? P1 extends `[${number}]`
        ? T extends Array<infer I>
            ? P2 extends ''
                ? I
                : P2 extends PathOf<I>
                    ? ValueIn<I, P2>
                    : P2
            : never
        : P1 extends keyof T
            ? P2 extends ''
                ? T[P1]
                : P2 extends PathOf<T[P1]>
                    ? ValueIn<T[P1], P2>
                    : never
            : never
    : never

const ARRAY_KEY_REGEX = /\[(\d+)\]/
const OBJECT_KEY_REGEX = /\.(.*)/

export function getIn<T, P extends PathOf<T>>(object: T, path: P): ValueIn<T, P> {
    const [p1, p2] = splitPath(path)
    const { key } = parseSegment(p1)
    const value = object[key as keyof T]
    return p2 ? getIn(value, p2 as PathOf<T[keyof T]>) : value as ValueIn<T, P>
}

function splitPath<P extends string>(path: P) {
    const [p1, p2] = path.split(OBJECT_KEY_REGEX)
    const [c1, c2] = splitArrayPath(p1)
    if (!p2) return [c1, c2]
    return [c1, [c2, p2].filter(Boolean).join('.')]
}

function splitArrayPath<P extends string>(path: P) {
    const match = path.match(ARRAY_KEY_REGEX)
    if (!match) return [path, '']
    if (match.index === 0) return [match[0], path.slice(match[0].length)]
    return [path.slice(0, match.index), path.slice(match.index)]
}

function parseSegment<S extends string>(segment: S) {
    const match = segment.match(ARRAY_KEY_REGEX)
    return {
        key: match?.[1] || segment,
        isArray: !!match
    }
}