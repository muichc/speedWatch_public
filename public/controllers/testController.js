const moment = require('moment');
const Datastore = require('nedb');
const results = new Datastore({ filename: './results.db', autoload: true, timestampData: true });
const { ipcMain } = require('electron');

ipcMain.on('get all data', (event, arg) => {
    // console.log("ipc", event == true)
    getAllTestData(event)
})

function getAllTestData(event) {
    results.find({}).sort({createdAt: -1}).exec((err, docs) => {
        if (err) console.log(err)
        // const date = moment(docs[18].createdAt).format('MMMM Do YYYY, h:mm:ss a')
        // console.log("moment", date, typeof(date));
        const parsedData = parseData(docs)
        // console.log(event)
        if (event && docs) { //Need to refactor this to fix bug with events
            event.reply('data-reply', parsedData)
        }
    })
}

function parseData(docs) {
    const pingData = [];
    const downloadData = [];
    const uploadData = [];
    const otherInfo = [];
    const all = [];
    for (let i = 0; i < docs.length; i++) {
        const allData = docs[i];
        delete allData.data;
        delete allData.updatedAt;
        const parsedDate = moment(allData.createdAt).toObject()
        let newDate = moment(allData.createdAt).format('MMMM Do YYYY, h:mm:ss a')
        allData.createdAt = newDate;
        allData["parsedDate"] = parsedDate;
        pingData.push({date: allData.createdAt, ping: allData.ping});
        downloadData.push({x: allData.createdAt, y: allData.download});
        uploadData.push({date: allData.createdAt, upload: allData.upload});
        otherInfo.push({"_id": allData._id, "parsedDate": allData.parsedDate})
        all.push(allData)
    }
    const parsedData = {ping: pingData, download: downloadData, upload: uploadData, other: otherInfo, allData: all}
    // console.log(parsedData.allData);
    return parsedData;
}

function addNewTest(test) {
    results.insert(JSON.parse(test), (err, doc) => {
        if (err) console.log(err)
        console.log(doc)
        console.log(typeof(doc.createdAt))
        return doc
    })
}



  //delete all tests?

//sample test result 
// const sample = {
//    "ping":26,
//    "download":258,
//    "upload":24.4,
//    "data":{
//       "speeds":{
//          "download":258.017,
//          "upload":24.387,
//          "originalDownload":28415931,
//          "originalUpload":2676411
//       },
//       "client":{
//          "ip":"23.81.112.203",
//          "lat":37.3881,
//          "lon":-121.8756,
//          "isp":"Spectrum",
//          "isprating":3.7,
//          "rating":0,
//          "ispdlavg":0,
//          "ispulavg":0,
//          "country":"US"
//       },
//       "server":{
//          "host":"speedtest.west.rr.com:8080",
//          "lat":34.05,
//          "lon":-118.25,
//          "location":"Los Angeles, CA",
//          "country":"United States",
//          "cc":"US",
//          "sponsor":"Spectrum",
//          "distance":17.37,
//          "distanceMi":10.8,
//          "ping":25.7,
//          "id":"16974"
//       }
//    }
// }


module.exports = {
    getAllTestData,
    addNewTest
}