import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

import './style.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const PidiGrid = props => {

    const [layouts, setLayouts] = useState({});
    const [cols, setCols] = useState({ lg: 12, md: 11, sm: 7, xs: 3, xxs: 2 });
    const [rowHeight, setRowHeight] = useState(50);

    const initialLayout = 12;

    let x = 0;
    let y = 0;
    props.items.map((item, i) => {
        x = x >= initialLayout ? 0 : x;
        item.x = x;
        item.y = y;
        x += item.w;
        return item;
    })

    const [items, setItems] = useState(props.items);

    const onBreakpointChange = breakpoint => {
        items.map((item, index) => item.x = index % cols[breakpoint]);
        setLayouts({});
    }

    return (
        <div>
            <ResponsiveReactGridLayout
                className="layout"
                cols={cols}
                rowHeight={rowHeight}
                layouts={layouts}
                onLayoutChange={(layout, layouts) => setLayouts({ layouts })}
                onBreakpointChange={breakpoint => onBreakpointChange(breakpoint)}
                onWidthChange={(containerWidth, margin, cols, containerPadding) => setRowHeight((containerWidth - margin[0] * cols) / cols)}
                isResizable={false}
                isDraggable={false}
                margin={[0, 0]}
                compactType="vertical"
            >
                {
                    items.map((item, index) => (
                        <div className="pidi-item-container" key={item.i} data-grid={item}>
                            <div className="pidi-item">PiDi {index+1}</div>
                        </div>
                    ))
                }
            </ResponsiveReactGridLayout>
        </div>
    );
}
 
export default PidiGrid;
