"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const route_1 = require("../modules/users/route");
const route_2 = require("../modules/auth/route");
const router_1 = require("../modules/mode/router");
exports.router = (0, express_1.Router)();
const routerPath = [
    {
        path: "/users",
        element: route_1.userRouter,
    },
    {
        path: "/auth",
        element: route_2.authRouter,
    },
    {
        path: "/moods",
        element: router_1.moodRouter,
    },
];
routerPath.map((route) => exports.router.use(route.path, route.element));
