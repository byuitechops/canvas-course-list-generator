const Enquirer = require('enquirer');
const enquirer = new Enquirer();
const chalk = require('chalk');
const fs = require('fs');

function prompter() {
   return new Promise((resolve, reject) => {
      enquirer.question({
         name: 'userId',
         type: 'input',
         message: 'Enter subaccount here: '
      });

      enquirer.question({
         name: 'path',
         type: 'input',
         message: 'Store in CSV (y/n):',
         default: 'y'
      });

      enquirer.ask()
         .then(answers => {
            resolve({
               'id': answers.userId,
               'path': answers.path
            });
         })
         .catch(reject);
   });
}

module.exports = {
   prompter
}