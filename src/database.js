const mongoose=require('mongoose');
const URI ='mongodb://localhost/test-lab';
// conexión con la db mongo
mongoose.connect(URI, { useNewUrlParser: true , useUnifiedTopology: true})
 .then(db =>console.log('DB conectada'))
 .catch(erro => console.error(err));

 module.exports= mongoose;