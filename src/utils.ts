type PathOf<T> = T extends object ? {
    [K in keyof T]: `${Exclude<K, symbol>}${"" | (PathOf<T[K]> extends `${infer P}` ? `.${P}` : never)}`
}[keyof T] : never

type ValueOf<T, P extends PathOf<T>> = P extends `${infer K}.${infer P1}`
    ? K extends keyof T
        ?  P1 extends PathOf<T[K]>
            ? ValueOf<T[K], P1>
            : never
        : never
    : P extends keyof T ? T[P] : never

export function getIn<T, P extends PathOf<T>>(object: T, path: P): ValueOf<T, P> {
    return split(path).reduce<any>((result, key) => result[key], object)
}

function split(path: string) {
    return path.split('.')
}