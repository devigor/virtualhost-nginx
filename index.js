//Import of Modules
const Inquirer = require('inquirer');
const colors = require('colors');
const Unix = require('./modules/unix');
const fileConfig = require('./modules/config');
const fileQuestions = require('./modules/fileQuestions');
const createVh = require('./modules/createVh');
// Import of variables
const avaliable = '/etc/nginx/sites-available/';
const enabled = '/etc/nginx/sites-enabled/';

Inquirer.prompt(fileQuestions)
        .then((resp) => {
          let root = resp.root;
          let domain = resp.domain;
          let configN = fileConfig(root, domain);
          let fileFinal = avaliable + domain;
          createVh(domain, fileFinal, configN);
          Unix(domain, avaliable, enabled);
});