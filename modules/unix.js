const Shell = require('shelljs');

const link = (domain, avaliable, enabled) => {
  return (
    Shell.exec(`ln -s ${avaliable}${domain} ${enabled}${domain}`)
  )
}

module.exports = link;