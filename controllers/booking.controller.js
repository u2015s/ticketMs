const { db,connection } = require('../db');
var uniqid = require('uniqid');

exports.bookTicket = async (req, res) => {

  let bookingData = req.body
  await db.query(`SET TRANSACTION ISOLATION LEVEL READ COMMITTED`)
  connection.beginTransaction(async function(){

  try {

    //checking seat availability

    let seatsLeft = await db.query(`
      SELECT 
        seatsLeft 
      FROM 
        seat_avail 
      WHERE 
        trainNo = '${bookingData.trainNo}' AND date = '${bookingData.date}'`
    )
    seatsLeft = seatsLeft[0].seatsLeft
    if(seatsLeft > 0 && (72-seatsLeft >= 0)){

      //generate PNR
      let PNR = parseInt(Math.random().toString().slice(2,12))
      
      //generate Seat Numbers
      let seatNumbers = [];

      for(let i = 0; i < bookingData.seats ; i++){
        let temp = 72 - seatsLeft + 1;
        seatNumbers.push(temp)
        seatsLeft--;
      }

      
      seatNumbers = JSON.stringify(seatNumbers)
      //save in booking table
     
      await db.query(
        `INSERT INTO booking VALUES(
        '${PNR}',
        '${bookingData.userId}',
        '${bookingData.trainNo}',
        '${bookingData.from}',
        '${bookingData.to}',
        '${bookingData.date}',
        '${seatNumbers}'
      )`
    )
      bookingData.PNR = PNR
      bookingData.seatNumbers = seatNumbers
      //reduce count in seatAvail
      await db.query(
      `UPDATE 
        seat_avail 
      SET 
        seatsLeft = ${seatsLeft} 
      WHERE 
        trainNo = '${bookingData.trainNo}' AND date = '${bookingData.date}'
      `
    )
    
      await connection.commit();

      return res.status(200).json({
        message: 'ticket booked successfully',
        data:bookingData
      })

    }else{
      connection.rollback();
      return res.status(404).json({
        message: "Seats Not Available",
      });
    }

  } catch (err) {
    connection.rollback();
    console.info('Rollback successful');
    return res.status(500).json({
      message: "Something went wrong!",
      error: err.message,
    });
    
  }
  
  });
}

exports.getSeatAvail = async (req, res) => {
  let bookingData = req.body
  try{
    let seatsLeft = await db.query(`
      SELECT 
        seatsLeft 
      FROM 
        seat_avail 
      WHERE 
        trainNo = '${bookingData.trainNo}' AND date = '${bookingData.date}'`
    )
    seatsLeft = seatsLeft[0].seatsLeft
    return res.status(200).json({
      data:seatsLeft
    })
  }catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

exports.getBookings = async (req, res) => {
  
    try{
      let bookings = await db.query(`
      SELECT * FROM ticketms.booking WHERE userId ='${req.params.userId}';`
      )
      
      return res.status(200).json({
        data:bookings
      })
    
  }catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }


}

