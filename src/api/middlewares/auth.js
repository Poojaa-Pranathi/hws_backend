const  httpStatus = require( 'http-status');
const  ApiError = require( '../utils/apiError');
const student = require('../models/student')


const studentAuth = () => async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await student.findOne({ where: { rollno: decoded.id } })
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
};

module.exports= {
  studentAuth,
}