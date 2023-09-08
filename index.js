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
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "Z";
    res.status(200).json({
        slack_name,
        current_day: date.toLocaleDateString('en-EN', {
            weekday: 'long'
        }),
        utc_time: day + time,
        track,
        github_file_url: "https://github.com/oputaolivia/hng-task-1/blob/main/index.js" ,
        github_repo_url: "https://github.com/oputaolivia/hng-task-1",
        status_code: res.statusCode
    })
})

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})