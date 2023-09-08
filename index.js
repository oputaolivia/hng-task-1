const express = require("express");
const dontenv = require("dotenv");

const app = express();
app.use(express.json());
dontenv.config()

const PORT = process.env.PORT || 3000
const date = new Date()

app.get("/api", (req, res)=>{
    const {slack_name, track} = req.query;
    const day = date.getFullYear()+ "-" + "0"+(date.getMonth()+1) + "-"+ "0"+date.getDate() + "T";
    // calculating
    const utcOffset = new Date().getTimezoneOffset() / 60;
    const isValidUtcOffset = utcOffset >= -2 && utcOffset <= 2;
    const time = isValidUtcOffset ? new Date().toISOString().slice(0, -5) + 'Z': 'Invalid UTC offset';
    res.status(200).json({
        slack_name,
        current_day: date.toLocaleDateString('en-EN', {
            weekday: 'long'
        }),
        utc_time: time,
        track,
        github_file_url: "https://github.com/oputaolivia/hng-task-1/blob/main/index.js" ,
        github_repo_url: "https://github.com/oputaolivia/hng-task-1",
        status_code: res.statusCode
    })
})

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})