const canvas = require('canvas-api-wrapper');
const d3 = require('d3-dsv')
const fs = require('fs');
const prompter = require('./cli').prompter;

async function getAllCourses(userId) {
    // get all courses from the Master Courses subaccount (i.e. 42)
    let courses = await canvas.get(`/api/v1/accounts/${userId}/courses`, {
        sort: 'course_name',
        'include[]': 'subaccount'
    });

    // ensure that courses are exactly what we need since canvas is a little
    // sketchy when it comes to ${userId}/courses
    return courses.filter(course => course.account_id === parseInt(userId));
}

async function retrieve() {
    let results = await prompter();
    let courses = await getAllCourses(results.id);

    // TODO: figure out which categories need to go into the CSV.
    if (results.path === 'y') {
        console.log('print');
    } else {
        return courses;
    }

    return {};
}


//retrie
module.exports = {
    retrieve
}