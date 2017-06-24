'use strict';
const router = require('koa-router')();
const rp = require('request-promise');
const cheerio = require('cheerio');

router.get('/api/getmatches', async (ctx) => {
    var options = {
        uri: 'http://wiki.teamliquid.net/starcraft2/Liquipedia:Upcoming_and_ongoing_matches',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    const $ = await rp(options);
    let res = [];
    //const $tr = cheerio.load($('#mw-content-text .infobox_matches').html());
    $('#mw-content-text #infobox_matches').get().forEach((e,i,a) => {
        const $div = cheerio.load(e);
        console.log(i);
        if(i == 0) {
            //Ongoing games
        } else if(i == 1) {
            //Upcoming games
            console.log($div('table').length);
            const tables = $div('table').get();
            tables.forEach((tableHtml, index, arr) => {
                if(index < 10) {
                    let match = {};
                    let $table = cheerio.load(tableHtml);
                    let leftTeam = $table('.team-left span>a').text();
                    match.leftTeam = leftTeam;
                    let leftImgRace;
                    let leftImgNation;
                    const $aLeftImgs = $table('.team-left>a>img').get();
                    $aLeftImgs.forEach((img, index, a) => {
                        //console.log(a.length);
                        if(index == 0){
                            //console.log(cheerio.load(img)('img').attr('src'));
                            leftImgRace = cheerio.load(img)('img').attr('src')
                            match.leftImgRace = leftImgRace;
                            //console.log(leftImgRace)
                        } else if(index == 1) {
                            leftImgNation = cheerio.load(img)('img').attr('src');
                            match.leftImgNation = leftImgNation;
                            //console.log(leftImgNation)
                        }
                    });
                    
                    let rightTeam = $table('.team-right span>a').text();
                    match.rightTeam = rightTeam;
                    let rightImgRace;
                    let rightImgNation;
                    const $aRightImgs = $table('.team-right>a>img').get();
                    $aRightImgs.forEach((img, index) => {
                        if(index == 0){
                            rightImgNation = cheerio.load(img)('img').attr('src');
                            match.rightImgNation = rightImgNation;
                            //console.log(rightImgNation)
                        } else if(index == 1) {
                            rightImgRace = cheerio.load(img)('img').attr('src');
                            match.rightImgRace = rightImgRace;
                            //console.log(rightImgRace)
                        }
                    });

                    //get game start time UTC time;
                    
                    const startTime = $table('tr .datetime').text();
                    match.startTime = startTime;
                    res.push(match);
                }
            })
        }
    });
    ctx.body = {
        matches: res
    }
})

// router.post('/api/signup', async (ctx) => {
    
// })

module.exports = router;