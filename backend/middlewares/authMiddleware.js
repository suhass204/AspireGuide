
const authMiddleware = (req, res, next) => {
 
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: 'Unauthorized access, please log in' });
  }

  
  req.user = req.session.user;
  console.log(req.user);

  next(); 
};

module.exports = authMiddleware;
