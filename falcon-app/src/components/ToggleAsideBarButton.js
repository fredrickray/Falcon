import React from 'react';

const ToggleAsidebarButton = ({ onClick }) => {
    return (
        <div onClick={onClick} className="w-4.5 overflow-hidden">
            <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
            <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
            <i className="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
        </div>
    );
};

export default ToggleAsidebarButton;
