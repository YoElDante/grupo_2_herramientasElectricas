const logouted = (req, res, next) =>{
    const logined = req.session.logined;
      if(!logined){
          next()
      }else{
        res.redirect('/')
      }
}

module.exports = logoutes;