const canvas = require('canvas-api-wrapper');
const d3 = require('d3-dsv')
const fs = require('fs');
const cli = require('./cli');

/**
 * getAllCourses 
 * @param {int} accountId 
 * 
 * This function gets the courses from Canvas when provided the accountId, which is basically
 * the subaccount where the Canvas course resides in.
 */
async function getAllCourses(accountId) {
   let courses = await canvas.get(`/api/v1/accounts/${accountId}/courses`, {
      sort: 'course_name',
      'include[]': 'subaccount'
   });

   // ensure that courses are exactly what we need since Canvas is a little
   // sketchy when it comes to ${userId}/courses
   return courses.filter(course => course.account_id === parseInt(accountId, '10'));
}

/**
 * retrieve
 * 
 * This function acts as a driver for the whole CLI. This also handles CSV
 * creation or simply returns the obj array.
 */
async function retrieve() {
   let results = await cli.prompt();
   let courses = await getAllCourses(results.id);

   if (results.path[0] === 'yes') {
      let headers = [
         'Name',
         'Course Code',
         'ID',
         'Is Public?'
      ];

      let courseObj = courses.map(course => {
         return {
            'Name': course.name,
            'Course Code': course.course_code,
            'ID': course.id,
            'Is Public?': course.is_public
         };
      });

      let csvData = d3.csvFormat(courseObj, headers);
      fs.writeFileSync('Canvas_Master_Courses.csv', csvData);
      console.log(`Saved as Canvas_Master_Courses.csv in ${__dirname}`);

      //since we are trying to return the "courses", in this case, the user just wants the
      //CSV file so we just return an empty array.
      return [];
   } else {
      return courses;
   }
}

//this has to be async since retrieve is an async function
(async () => {
   console.log(await retrieve());
})();

module.exports = {
   retrieve
}