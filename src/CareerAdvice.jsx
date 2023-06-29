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
        <div>
        <div style={{backgroundImage: "linear-gradient(to bottom right, #7F00FF, #E100FF)", height: 350}}>
        <h1 align="center" style={{paddingTop: 110, color: "#FFFFFF", fontSize:40, fontWeight:"bold", fontFamily:"Roboto"}}>Connect with Jobs, Mentors and see future oppurtunities!</h1>
            <hr style = {{width:800}}></hr>
            <div align="center" style={{marginTop: 50}}>
                <FormControl style={{width: 600, backgroundColor: "#FFFFFF", marginRight: 10}}>
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
                <FormControl style={{width: 600, backgroundColor: "#FFFFFF", marginLeft: 10}}>
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
                </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                variant="fullWidth"
                style={{ width: '80%', marginTop: '30px' }}
            >
                <Tab style={{fontSize:20}} value="Jobs" label="Jobs" />
                <Tab style={{fontSize:20}}value="Mentors" label="Mentors" />
                <Tab style={{fontSize:20}} value="Advancement" label="Advancement" />
            </Tabs>

            <div>{renderPage()}</div>
        </div>
        </div>
    );
};

export default CareerAdvice;
