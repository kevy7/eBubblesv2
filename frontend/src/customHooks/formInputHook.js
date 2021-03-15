import React, { useState } from 'react';

export const formInputHook = (initialValue) => {

    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        onChange: (e) => {
            setValue(e.target.value);
        }
    }
}