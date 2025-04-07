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

const ARRAY_KEY_REGEX = /^\[(\d+)\]$/
const NON_LEADING_ARRAY_KEY_REGEX = /(?!^)\[\d+\]/g

export function getIn<T, P extends PathOf<T>>(object: T, path: P): ValueIn<T, P> {
    return split(path).reduce<any>((result, key) => result[key.match(ARRAY_KEY_REGEX)?.[1] || key], object)
}

function split(path: string) {
    return path.replace(NON_LEADING_ARRAY_KEY_REGEX, p => '.' + p).split('.')
}
