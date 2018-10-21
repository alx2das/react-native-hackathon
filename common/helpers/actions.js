const LS_REQUEST_ACTIONS = [
    'request',
    'success',
    'failure'
];

/**
 * Создает функцию экшен
 * @param enums {String}
 * @param action {null|Function}
 * @returns {Function}
 */
export function createAction(enums, action = null) {
    const type = enums.toUpperCase();
    const func = action instanceof Function
        ? (...payload) => ({...(action(...payload)), type})
        : (payload = {}) => ({...payload, type});

    func.toString = () => type;

    return func;
}

/**
 * Балванка для создания action запросов
 * @param enums {String}
 * @param actions {Object}
 * @returns {Object} [{request: () => ({}), success: () => ({}), failure: () => ({})}]
 */
export function createRequestActions(enums, actions = {}) {
    return [...LS_REQUEST_ACTIONS, ...(Object.keys(actions))]
        .reduce((accumulator, currentValue) => {
            const type = `${enums}.${currentValue.toUpperCase()}`;
            const func = actions[currentValue] instanceof Function
                ? (...payload) => ({...(actions[currentValue](...payload)), type})
                : (payload = {}) => ({...payload, type});

            func.toString = () => type;

            return {
                ...accumulator,
                [currentValue]: func
            };
        }, {});
}