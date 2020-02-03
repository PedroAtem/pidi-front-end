import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

import './style.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        const items = [];
        for (let i = 0; i < 300; i++) {
            items.push({ i: `${i}`, w: 1, h: 1, x: i % 13, y: 0 });
        }

        this.state = {
            layouts: {},
            cols: { lg: 13, md: 11, sm: 7, xs: 3, xxs: 2 },
            items: items,
            rowHeight: 50
        };
    }

    resetLayout() {
        this.setState({ layouts: {} });
    }

    onLayoutChange(layout, layouts) {
        this.setState({ layouts });
    }

    onBreakpointChange(breakpoint) {
        const { layouts, items, cols } = this.state;
        items.map((item, index) => item.x = index % cols[breakpoint]);
        this.resetLayout();
    }

    onWidthChange(containerWidth, margin, cols, containerPadding) {
        this.setState({ rowHeight: (containerWidth - margin[0] * cols) / cols })
    }

    render() {
        const { layouts, items, cols, rowHeight } = this.state;

        return (
            <div>
                <ResponsiveReactGridLayout
                    className="layout"
                    cols={cols}
                    rowHeight={rowHeight}
                    layouts={layouts}
                    onLayoutChange={(layout, layouts) =>
                        this.onLayoutChange(layout, layouts)
                    }
                    onBreakpointChange={breakpoint => this.onBreakpointChange(breakpoint)}
                    onWidthChange={(containerWidth, margin, cols, containerPadding) => this.onWidthChange(containerWidth, margin, cols, containerPadding)}
                    isResizable={false}
                    isDraggable={false}
                    margin={[0, 0]}
                >
                    {
                        items.map((item, index) => (
                            <div className="pidi-item" key={item.i} data-grid={item}>
                                PiDi {index+1}
                            </div>
                        ))
                    }
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            "rgl-8",
            JSON.stringify({
                [key]: value
            })
        );
    }
}
