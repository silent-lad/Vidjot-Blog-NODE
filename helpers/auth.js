module.exports = {
  ensureAuthenticated: (req,res,next)=>{
    if(req.isAuthenticated()){
      return next();
    }else {
      req.flash('error_msg','Not Authorized')
      res.redirect('/users/login');
    }
  }
}
