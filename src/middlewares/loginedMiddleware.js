const logined = (req, res, next) =>{
    const logined = req.session.logined;
      if(logined){
          next()
      }else{
        res.redirect('/users/login')
      }
}

module.exports = logined;