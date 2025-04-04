type Path<T> = T extends object
    ? keyof T
    : never

export function getIn<T, P extends Path<T>>(object: T, path: P) {
    return object[path]
}