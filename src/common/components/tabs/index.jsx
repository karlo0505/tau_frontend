import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserApplications from '../boxes/application';
import UserRequirements from '../boxes/requirements';
// import UserSettings from '../boxes/settings';
import { useSelector } from 'react-redux';

import { Skeleton } from '@mui/material';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}



function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function ProfileDetails({ loadingData, reqGetApplication }) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);


    const { applications } = useSelector((state) => ({
        applications: state.applications,
    }));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };




    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%', marginTop: 1 }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    aria-label="full width tabs example"
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab label="Applications" {...a11yProps(0)} />
                    <Tab label="Requirements" {...a11yProps(1)} />

                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    {loadingData ? <Box sx={{ width: '280px' }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box> : <UserApplications reqGetApplication={reqGetApplication} data={applications?.profile?.applications} />}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {loadingData ? <Box sx={{ width: '280px' }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box> : <UserRequirements reqGetApplication={reqGetApplication} data={applications?.profile?.requirements} />}
                </TabPanel>
            </SwipeableViews>

        </Box>
    );
}
