const Fs = require('fs');

const createVh = (domain, file, config) => {
  return(
    Fs.writeFile(file, config,(error) => {
      if(error) throw error;
      console.log('File Created' .green);
    })

  )
}

module.exports = createVh;