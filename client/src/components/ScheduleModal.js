import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ScheduleTable from './ScheduleTable';
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

export default function ScheduleModal({state,handleClose,stops}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
  
  React.useEffect(() =>{
    setOpen(state)
  },[state])
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
              Schedule of the train
            </Typography>
            
            <ScheduleTable
            data = {stops}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
