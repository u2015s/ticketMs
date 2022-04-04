import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from "axios";

// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

export default function TrainSearchCard({setTrainData}) {
    const [from, setFrom] = React.useState('MMCT');
    const [to, setTo] = React.useState('SUNR');
    const [date, setDate] = React.useState(new Date('2022-04-05'));

    async function submit(){
        let postData = {
            from,
            to,
            date
        }
        // console.log(postData);
        try {
            setTrainData([])
            const { data } = await axios.post("/api/train/getTrainsInfo", postData);
            setTrainData(data.data)
          } catch (error) {
             
            alert(error)
            console.log(error)
          }
    }
    var today = new Date().toISOString().split('T')[0];
    return (
        <>
            <Grid
                sx={{
                    maxWidth: "1200px",
                    border: "1px solid grey",
                    padding: "2%",
                    margin: "1% auto"
                }}
            >

                <Typography variant="h5" gutterBottom>
                    Search Trains
                </Typography>
                <Grid container spacing={3}
                sx = {{
                    alignItems: "center"
                }}
                >
                    <Grid item xs={12} sm={3}>
                        <TextField
                            required
                            id="firstName"
                            name="From"
                            label="From"
                            fullWidth
                            autoComplete="given-name"
                            variant="outlined"
                            onChange = {(e) => setFrom(e.target.value)}
                            value = {from}
 
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            required
                            id="lastName"
                            name="To"
                            label="To"
                            fullWidth
                            autoComplete="family-name"
                            variant="outlined"
                            onChange = {(e) => setTo(e.target.value)}
                            value = {to}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            id="date"
                            label="Date"
                            type="date"
                            value = {date}
                            min={today}
                            // minDate={new Date()}
                            // disablePast
                            // defaultValue={date}
                            // sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{inputProps: { min: "2022-04-05", max: "2022-04-08"} }}
                            onChange = {(e) => setDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} sx ={{justifyContent: 'center'}}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ml: -4 }}
                        onClick = {()=>{submit()}}
                    >
                        Search
                    </Button>
                    </Grid>
                    
                </Grid>

            </Grid>
        </>
    );
}