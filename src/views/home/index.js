import React from "react";
import TextField from '@material-ui/core/TextField';

import './style.css';

import PidiGrid from '../../components/pidi-grid';

import gridItems from './gridItems.json';

const Home = () => {
    return (
        <div>
            <h1>PiDi</h1>
            <TextField label="Busca" variant="outlined" />
            <div style={{ padding: 10 }}>
                <PidiGrid items={gridItems}></PidiGrid>
            </div>
        </div>
    );
}
 
export default Home;