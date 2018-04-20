if(process.env.NODE_ENV=='production'){
  module.exports = {mongoURI:'mongodb://divyansh:divyansh@ds249839.mlab.com:49839/vidjot-prod'}
}else{
  module.exports = {mongoURI:'mongodb://localhost/vidjot-dev'}
}
