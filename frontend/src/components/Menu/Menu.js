import React from "react";
import { TabMenu } from 'primereact/tabmenu';

const MenuMain = ({ activeIndex, setActiveIndex }) => {
    const items = [
        {label: 'Lite'},
        {label: 'Pro'},
    ];

    return (
        <div className="card">
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
        </div>
    )
}

export { MenuMain };
