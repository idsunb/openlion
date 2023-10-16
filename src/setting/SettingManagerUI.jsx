import React from 'react';
import openlion from '../workspace/lionAPI/openlion';

const SettingManager = () => {

    return (
        <div>
        {JSON.stringify(openlion.lionContext.getConfig())}
        </div>
    );
}

export default SettingManager;