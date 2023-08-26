import React, { useState, useEffect, useRef } from "react";
import { ProgressBar } from 'primereact/progressbar';

const ProgressBarDefault = ({current, total}) => {
    const valueTemplate = (value) => {
        return (
            <React.Fragment>
                {value}/<b>100%</b>
            </React.Fragment>
        );
    };

    return (
        <div className="card">
            <ProgressBar value={current/total*100} displayValueTemplate={valueTemplate}></ProgressBar>
        </div>
    );
}

export { ProgressBarDefault }