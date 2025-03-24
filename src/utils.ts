const PATH_KEY_REGEX = /[^.]+?(?=(\.|(\[\d+\])|$))/g
const ARRAY_KEY_REGEX = /^\[(\d+)\]$/

export function getIn(object: any, path: string) {
    const keys = path.match(PATH_KEY_REGEX)
 
    if (!keys) return undefined
    
    let value = object
 
    for (const key of keys) {
        if (!value) return undefined
        const arrKeyMatch = key.match(ARRAY_KEY_REGEX)
        value = value[arrKeyMatch ? +arrKeyMatch[1] : key]
    }

    return value
}