import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Jobs from './Jobs';
import Mentor from "./Mentor";
import Advancement from "./Advancement";


const CareerAdvice = () => {
    const [location, setLocation] = useState('All');
    const [degree, setDegree] = useState('All');
    const [value, setValue] = useState('Jobs');
    const [CSVData, setCSVData] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleDegreeChange = (event) => {
        setDegree(event.target.value);
    };

    useEffect(() => {
        Papa.parse("/data/test.csv", {
            download: true,
            header: true,
            complete: function (results) {
                console.log(results.data);
                setCSVData(results.data);
            }
        });
    }, []);

    const renderPage = () => {
        switch (value) {
            case 'Jobs':
                return <Jobs degree={degree} location={location} data={CSVData} />;
            case 'Mentors':
                return <Mentor degree={degree} location={location} data={CSVData} />;
            case 'Advancement':
                return <Advancement degree={degree} location={location} data={CSVData} />;
            default:
                return null;
        }
    };

    return (
        <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ minWidth: 250 }}>
                <FormControl fullWidth>
                    <InputLabel id="degree-select-label">Degree</InputLabel>
                    <Select
                        labelId="degree-select-label"
                        id="degree-select"
                        value={degree}
                        label="Degree"
                        onChange={handleDegreeChange}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Computer Science">Computer Science</MenuItem>
                        <MenuItem value="Finance">Finance</MenuItem>
                        <MenuItem value="Law">Law</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ minWidth: 250, mb: 2, marginTop: '20px' }}>
                <FormControl fullWidth>
                    <InputLabel id="location-select-label">Location</InputLabel>
                    <Select
                        labelId="location-select-label"
                        id="location-select"
                        value={location}
                        label="Location"
                        onChange={handleLocationChange}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Auckland">Auckland</MenuItem>
                        <MenuItem value="California">California</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                variant="fullWidth"
                style={{ width: '80%', marginTop: '30px' }}
            >
                <Tab value="Jobs" label="Jobs" />
                <Tab value="Mentors" label="Mentors" />
                <Tab value="Advancement" label="Advancement" />
            </Tabs>

            <div>{renderPage()}</div>
        </div>
    );
};

export default CareerAdvice;
