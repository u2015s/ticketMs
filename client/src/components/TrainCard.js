import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ScheduleModal from "./ScheduleModal"
import BookingModal from "./BookingModal"
import DayInfo from './DayInfo';
export default function TrainCard({item}) {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    function calcSch(sch){
        let str
        for(const ch of sch){
            str = ch.someStr.replace(/['"]+/g, '')
        }
        return str
    }
    function getWeekDay(date) {
        let d = new Date(date)
        const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let day = weekday[d.getDay()];
        return day
      }
      
    function getMonth(date) {
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

        const d = new Date();
        let name = month[d.getMonth()];
        return name
      }
    function calInitDate(date){
        return (getWeekDay(date) +" "+ date.substring(8, 10)  + " "+ getMonth(date))
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

    function calcFinalDate(date,day){
        if(item.day===1){
            return calInitDate(date)
        }else{
            let finalDate = addDays(date,day-1)
            finalDate = finalDate.toISOString().substring(0,10)
            return calInitDate(finalDate)
        }
    }
    console.log(item)
    return (
        <>
        <ScheduleModal
            state={open}
            handleClose= {handleClose}
            stops = {item.stops}
        />
        
        <BookingModal
            state={open2}
            handleClose= {handleClose2}
            bookingData = {item}
        />
        <Box sx={{ margin: "1% auto", maxWidth: "1200px" }}>
            <Card variant="outlined">
                <CardContent
                    sx={{
                        padding: 0
                    }}
                >
                    {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
            </Typography> */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: "#f5f5f5",
                            padding: 1
                        }}
                    >
                        <Typography variant="h6" component="div">
                            {item.trainName + "(" + item.trainNo + ")" }
                        </Typography>

                        <Typography variant="h6" component="div" sx={{display:"flex", flexDirection:"row"}}>
                            Runs On: {<DayInfo sch = {item.schedule}/>}
                        </Typography>

                        <Button
                            variant="outlined"
                            onClick={() =>{handleOpen()}}
                        >
                            Train Schedule
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 1
                        }}
                    >
                        <Typography variant="h6" component="div">
                            { item.depTime + " | " + item.from + " | " + calInitDate(item.date)}
                        </Typography>

                        {/* <Typography variant="h6" component="div">
                            13:08
                        </Typography> */}

                        <Typography
                            variant="h6" component="div"
                        >
                            { item.arrTime + " | " + item.to + " | " + calcFinalDate(item.date,item.day)}
                            {/* 06:53 | GWALIOR | Sun, 03 Apr */}
                        </Typography>
                    </Box>


                    <Button 
                    variant="contained" 
                    size="large" 
                    sx={{
                        m: 1,
                        backgroundColor: '#0058bd'
                    }}
                    onClick = {()=>{handleOpen2()}}
                    >
                        Book Now
                    </Button>
                    {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography> */}
                </CardContent>
                
            </Card>
        </Box>
        </>
        
    );
}
