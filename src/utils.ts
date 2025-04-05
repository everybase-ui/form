type Key = string | number
type ArrayKey = `[${number}]`

type JoinPath<P1 extends Key, P2 extends Key> = `${P1}${P2 extends `[${number}]${string}` ? P2 : `.${P2}`}`
type DottedPath<P extends string, Root = true> = P extends `${infer P1}[${infer K}]${infer P3}`
    ? K extends `${number}`
        ? Root extends true
            ? P1 extends ''
                ? `[${K}]${DottedPath<P3, false>}`
                : `${P1}.[${K}]${DottedPath<P3, false>}`
            : `${P1}.[${K}]${DottedPath<P3, false>}`
        : P
    : P

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

type ValueInDottedPath<T, P extends DottedPath<PathOf<T>>> = P extends `${infer K}.${infer P1}`
    ? K extends `[${number}]`
        ? T extends Array<infer I>
            ? P1 extends DottedPath<PathOf<I>>
                ? ValueInDottedPath<I, P1>
                : never
            : never
        : K extends keyof T
            ? P1 extends DottedPath<PathOf<T[K]>>
                ? ValueInDottedPath<T[K], P1>
                : never
            : never
    : P extends `[${number}]`
        ? T extends Array<infer I>
            ? I
            : never
        : P extends keyof T
            ? T[P]
            : never

export type ValueIn<T, P extends PathOf<T>> = ValueInDottedPath<T, DottedPath<P>>

const ARRAY_KEY_REGEX = /^\[(\d+)\]$/
const NON_LEADING_ARRAY_KEY_REGEX = /(?!^)\[\d+\]/g

export function getIn<T, P extends PathOf<T>>(object: T, path: P): ValueIn<T, P> {
    return split(path).reduce<any>((result, key) => result[key.match(ARRAY_KEY_REGEX)?.[1] || key], object)
}

function split(path: string) {
    return path.replace(NON_LEADING_ARRAY_KEY_REGEX, p => '.' + p).split('.')
}