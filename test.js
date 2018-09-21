const courses = require('./getCourses');

(async () => {
    await courses.retrieve();
})();