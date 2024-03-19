"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const leetcode = __importStar(require("./leetCode"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/', (_req, res) => {
    res.json({
        routes: {
            userDetails: {
                '/:username': 'get your profile Details',
                '/:username/badges': 'get your badges',
                '/:username/solved': 'get total number of question you solved',
                '/:username/contest': 'get your contest details',
                '/:username/contest/history': 'get all contest history',
                '/:username/submission': 'get your last 20 submission',
                '/:username/submission?limit=7': 'get some of your last submission',
                '/:username/acSubmission': 'get your last 20 accepted submission',
                '/:username/acSubmission?limit=7': 'get some of your last accepted submission',
                '/:username/calendar': 'get your submission calendar',
            },
            problems: {
                dailyProblem: { '/daily': 'get daily Problem' },
                singleProblem: { '/select?titleSlug=two-sum': 'get selected Problem' },
                problemList: {
                    '/problems': 'get list of 20 problems',
                    '/problems?limit=50': 'get list of some problems',
                    '/problems?tags=array+math': 'get list problems on selected topics',
                    '/problems?tags=array+math+string&limit=5': 'get list some problems on selected topics',
                },
            },
        },
    });
});
app.get('/daily', leetcode.dailyProblem);
app.get('/select', leetcode.selectProblem);
app.get('/problems', leetcode.problems);
app.use('/:username*', (req, _res, next) => {
    req.body = {
        username: req.params.username,
        limit: req.query.limit,
    };
    next();
});
app.get('/:username', leetcode.userData);
app.get('/:username/badges', leetcode.userBadges);
app.get('/:username/solved', leetcode.solvedProblem);
app.get('/:username/contest', leetcode.userContest);
app.get('/:username/contest/history', leetcode.userContestHistory);
app.get('/:username/submission', leetcode.submission);
app.get('/:username/acSubmission', leetcode.acSubmission);
app.get('/:username/calendar', leetcode.calendar);
exports.default = app;
//# sourceMappingURL=app.js.map