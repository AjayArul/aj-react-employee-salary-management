import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Sidebar  from './../sideBar/Sidebar';
import './MainLayout.scss';

export const MainLayout = (props) => {
  const { children } = props;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    // add class for mobile view
    window.addEventListener("resize", () => {
        const ismobile = window.innerWidth < 600;
        if (ismobile !== isMobile) setIsMobile(ismobile);
    }, false);
  }, [isMobile]);

  return (
    <Grid container spacing={0} className={`allBody ${isMobile ? "isMobile" : "allBody"}`}>
        <Grid item xs={12} sm={3} md={2}>
            <Sidebar />
        </Grid>
        <Grid item xs={12} sm={9} md={10}>
            <div className="rightBody addScroll">
              {children}
            </div>
        </Grid>
    </Grid>    
  );
};