const onGetItem = (name) => {
    return JSON.parse(localStorage.getItem(name))
}

const onSetItem = (name, value) => {
    return localStorage.setItem(name, value)
}

const onDeleteItem = (key) => {
    return localStorage.removeItem(key)
}

export {
    onGetItem,
    onSetItem,
    onDeleteItem,
}