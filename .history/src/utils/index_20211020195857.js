export const isFalsy = (value) => value === 0 ? true : !!value

export const cleanObject = (object) => {
    const result = {...object}
    Object.keys(object).forEach(key => {
        const value = object[key]
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}