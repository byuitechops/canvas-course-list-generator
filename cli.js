const Enquirer = require('enquirer');
const chalk = require('chalk');
const fs = require('fs');

const enquirer = new Enquirer();
enquirer.register('checkbox', require('prompt-checkbox'));

function prompt() {
      return new Promise((resolve, reject) => {
            enquirer.question({
                  name: 'userId',
                  type: 'input',
                  message: 'Enter subaccount here: '
            });

            enquirer.question({
                  name: 'path',
                  type: 'checkbox',
                  message: 'Store in CSV?',
                  radio: true,
                  choices: ['yes', 'no']
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