import React from 'react';

const inputUser = () => {

    return (
        <div className="inputUser field">
            <label className="label">Name</label>
            <div className="control">
                <input className="input" type="text" placeholder="Input name here" />
            </div>
        </div>
    )
}

export default inputUser;