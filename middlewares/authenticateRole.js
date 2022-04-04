const authenticateRole = (roleArray) => (req, res, next) => {
    if(!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Session expired',
        code: 'SESSION_EXPIRED'
      });
    }
    let authorized = false;
    //if user has a role that is required to access any API
    roleArray.forEach(role => {
     authorized = req.user.role === role;
    })
    if(authorized) {
      return next();
    }
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

module.exports = authenticateRole;
