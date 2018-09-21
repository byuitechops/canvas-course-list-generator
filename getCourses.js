const canvas = require('canvas-api-wrapper');
const d3 = require('d3-dsv')
const fs = require('fs');
const moment = require('moment');
const cli = require('./cli');

async function getAllCourses(userId) {
    let courses = await canvas.get(`/api/v1/accounts/${userId}/courses`, {
        sort: 'course_name',
        'include[]': 'subaccount'
    });

    // ensure that courses are exactly what we need since canvas is a little
    // sketchy when it comes to ${userId}/courses
    return courses.filter(course => course.account_id === parseInt(userId));
}

async function retrieve() {
    let results = await cli.prompt();
    let courses = await getAllCourses(results.id);

    // TODO: figure out which categories need to go into the CSV.
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
    } else {
        return courses;
    }
}


//retrie
module.exports = {
    retrieve
}