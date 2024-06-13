const exspress = require('express');
const userRoute = require('./user');
const authRoute=require('./auth.routes');
const problemRoute=require('./problems.route');


const router = exspress.Router();

const defaultRoutes = [
    {
        path: '/user',
        route: userRoute
    },
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/problems',
        route: problemRoute
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
})

module.exports = router;