import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BookingModal({ state, handleClose, bookingData }) {
    const [open, setOpen] = React.useState(false);
    const [isBooking, setIsBooking] = React.useState(false);
    const [seats, setSeats] = React.useState(0);
    const [showBookingDetails, setshowBookingDetails] = React.useState(false);
    const [seatValue, setSeatValue] = React.useState(0);
    const user = JSON.parse(localStorage.getItem("login"));


    const handleOpen = () => setOpen(true);
    //   const handleClose = () => setOpen(false);

    React.useEffect(() => {
        if (state === true) {
            getInfo()
        }
        setOpen(state)
    }, [state])

    async function getInfo() {
        let postData = {
            trainNo: bookingData.trainNo,
            date: bookingData.date.substring(0, 10)
        }
        try {
            // axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}` 
            const { data } = await axios.post("/api/booking/checkSeatInfo",postData, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setSeats(data.data)
            // console.log(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    // React.useEffect(() => {
    //     // setTimeout(() => {
    //     //     setSeats(67)
    //     // }, 1000); 


    // },[])
    function showBookingData() {

        var bookingD = {
            "Train No": bookingData.trainNo,
            "Train Name": bookingData.trainName,
            "userId": user._id,
            "Date of journey": bookingData.date.substring(0, 10),
            "From station": bookingData.from,
            "To station": bookingData.to,
            "Seats": seatValue
        }
        const arr = Object.entries(bookingD);

        return (arr.map((item, index) => {
            let key = item[0]
            let value = item[1]

            return (
                <Typography id="transition-modal-title" variant="subtitle" key={index}>
                    {key + " : " + value}
                </Typography>
            )
        }))
    }

    function cleanState() {
        setSeatValue(0)
        setshowBookingDetails(false)
    }
    async function bookTicket() {
        setIsBooking(true)
        var sendData = {
            "trainNo": bookingData.trainNo,
            "userId": user._id,
            "date": bookingData.date.substring(0, 10),
            "from": bookingData.from,
            "to": bookingData.to,
            "seats": seatValue
        }
        // console.log(sendData)
        try {
            const { data } = await axios.post("/api/booking/bookTicket",sendData, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            // console.log(data)
            if (data.message === "ticket booked successfully") {
                alert('Ticket booking successfully. Seat Number are:' + data.data.seatNumbers)
                setIsBooking(false)
                cleanState()
                handleClose();
            } else if (data.message === "Seats Not Available") {
                alert('Seats Not Available')
                setIsBooking(false)
                cleanState()
                handleClose();
            }
            // console.log(data.data)
        } catch (error) {
            console.log(error)
            setIsBooking(false)
            cleanState()
            handleClose();
        }
    }
    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                // onClose={handleClose}
                onClose={(_, reason) => {
                    if (reason !== "backdropClick") {
                        handleClose();
                    }
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>

                    <Box sx={style}>
                        <div
                            style={{
                                position: 'relative',
                                top: "-26px",
                                left: "388px"
                            }}
                        >
                            <IconButton
                                aria-label="delete"
                                onClick={() => {
                                    handleClose()
                                    cleanState()
                                }}

                            >
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Book Ticket
                        </Typography>

                        <Typography id="transition-modal-title" variant="subtitle1" component="h2" sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            No of seats available: {seats ? seats : <CircularProgress size={20} sx={{ ml: 1 }} />}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex", flexDirection: "row", alignItems: "center", mt: 2
                            }}
                        >

                            <TextField
                                required
                                id="firstName"
                                name="No of Seats"
                                label="Enter No of Seats to book"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                                disabled={showBookingDetails}
                                onChange={(e) => setSeatValue(e.target.value)}
                            />
                            <IconButton
                                size="large"
                                disabled={showBookingDetails}
                                onClick={() => {
                                    console.log(seatValue)
                                    if (seatValue > 6) {
                                        alert("You can only book upto 6 seats at a time")
                                    } else if (seatValue <= 0) {
                                        alert("Please select atleast 1 seat")
                                    } else {
                                        setshowBookingDetails(true)
                                    }

                                }}
                            >
                                <ArrowCircleRightIcon
                                    fontSize="inherit"
                                    color="primary"
                                />
                            </IconButton>
                        </Box>

                        {
                            showBookingDetails

                                ?

                                <Box
                                    sx={{
                                        mt: 1
                                    }}
                                >

                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        Booking Details
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        {
                                            showBookingData()
                                        }

                                    </Box>
                                    <LoadingButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 2 }}
                                        onClick={bookTicket}
                                        loading={isBooking}
                                    >
                                        Book
                                    </LoadingButton >
                                </Box>
                                :
                                <>
                                </>
                        }


                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
