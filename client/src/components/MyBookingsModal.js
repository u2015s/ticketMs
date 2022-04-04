import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MyBookingsTable from './MyBookingsTable';
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MyBookingsModal({state,handleClose,stops}) {
  const [open, setOpen] = React.useState(false);
  const [myBookings, setMyBookings] = React.useState([]);
  const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
const user = JSON.parse(localStorage.getItem("login"));

React.useEffect(() => {
    if(state===true){
        getInfo()
    }
    setOpen(state)
}, [state])

async function getInfo() {
    console.log("38")
    try {
        const { data } = await axios.get("/api/booking/" + user._id,{
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        setMyBookings(data.data)
        // console.log(data.data)
    } catch (error) {
        console.log(error)
    }
}
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{mb:1}}>
              My Bookings
            </Typography>
            {
                myBookings.length > 0 ? 
                <MyBookingsTable
                data = {myBookings}
                />:
                <>
                No Bookings
                </>
            }
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
