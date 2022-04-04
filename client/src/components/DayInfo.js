import React, { Component, useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import Typography from '@mui/material/Typography';

export const DayInfo = ({sch}) => {

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {
                ["M", "T", "W", "T", "F", "S", "S"].map((item, index) => {

                    var b= 'normal';
                    var c = "green"
                    if(!sch.includes(item)){
                        // b = '600'
                        c = 'red'
                    }

                   return(
                   <Typography 
                   variant="h6"
                   component="div" 
                   key={index} 
                   sx={{
                       ml:1,
                    //    fontWeight:b,
                       color:c
                   }}
                   >
                        {item}
                    </Typography>
                    )
                })
            }

        </div>
    )
}
export default DayInfo