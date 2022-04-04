const { db } = require('../db');
var uniqid = require('uniqid');

function getWeekDay(date) {
  let d = new Date(date)
  const weekday = ["S", "M", "T", "W", "T", "F", "S"];
  let day = weekday[d.getDay()];
  return day
}

function checkTrain(currentTrain, bodyData){
  let stops = currentTrain.stops 
  stops = JSON.parse(stops)

  const iFrom = stops.findIndex(obj => {
    return obj.name === bodyData.from;
  });
  
  const iTo = stops.findIndex(obj => {
    return obj.name === bodyData.to;
  });
  if(iFrom < iTo){
    return true
  }else{
    return false
  }
}

exports.getTrainsInfo = async (req, res) => {
  try {
    let reqData = req.body

    let stops = [
      {
        name: reqData.from
      },
      {
        name: reqData.to
      }
    ]
    stops = JSON.stringify(stops)

    let day = getWeekDay(reqData.date)
    day = JSON.stringify(day)

    let info = await db.query(`
    SELECT
    *
    FROM
      trains
    WHERE
      JSON_CONTAINS(stops, '${stops}','$') = 1
      AND
      JSON_CONTAINS(schedule, '${day}','$') = 1;
    `);

    if(info.length > 0){
      var sendData = []
      info.forEach((item)=>{
        if(checkTrain(item, reqData)){
          item.stops = JSON.parse(item.stops)
          item.schedule = JSON.parse(item.schedule)
    
          item.from = reqData.from
          item.to = reqData.to
    
          let obj = item.stops.find(i => i.name === item.from);
          item.depTime = obj.dep
          
          obj = item.stops.find(i => i.name === item.to);
          item.arrTime = obj.arr   
    
          item.date = reqData.date
          sendData.push(item)
        }

      })
      if(sendData.length > 0){
        return res.status(200).json({
          data: sendData
        })
      }else{
        return res.status(404).json({
          message: "No Trains Available"
        })
      }
      

    }else{
      return res.status(404).json({
        message: "No Trains Available"
      })
    }

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
}


exports.getStops = async (req, res) => {
  try {
    const stops = await db.query(`
      SELECT
        stops
      FROM
        trains
      WHERE
        id ='${req.params.trainId}';
    `);

    let temp = stops[0].stops

    return res.status(200).json({
      data: JSON.parse(temp)
    })
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
}
