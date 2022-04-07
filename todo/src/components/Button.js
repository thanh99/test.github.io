import React from "react";

const COLOR = {
    add: '#4CAF50',
    delete: '#D9534F',
    done: '#2196F3',
    detail: '#00BCD4',
}


export default function Button(props){
    const { children, type, ...rest } = props

    return <button
        style={{
            ...styles.button,
            backgroundColor: COLOR[type]
        }}
        {...rest}>
        {children}
    </button>
}


const styles = {
    button: {
        fontSize: 15,
        border: '#BDBDBD solid 1px',
        width: '100%',
        padding: 8,
        borderRadius: 5,
        color: 'white',
        minWidth: 100,
    },
}