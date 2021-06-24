const express = require('express');
const logger = require('morgan');
const rp = require('request-promise');
const cheerio = require('cheerio');

const app = express();

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const requestURL = `https://www.imdb.com/title/${id}`;

    try {
        const result = await rp(requestURL);
        const $ = cheerio.load(result);

        const title = $('div.title_wrapper > h1', result).text().trim();
        const imgURLSource = $('div.poster > a', result).attr().href;
        let imgURL = '';

        try {
            const imgResult = await rp(`https://www.imdb.com${imgURLSource}`);
            const $ = cheerio.load(imgResult);

            const imgLoad = $('div.ipc-page-content-container > div.media-viewer > div.iUyzNI > img', imgResult);

            for (let i = 0; i < imgLoad.length; i++) {
                const classAttr = imgLoad[i].attribs.class;
                if (!classAttr.includes('peek')) {
                    imgURL = imgLoad[i].attribs.src;
                }
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: error.message });
        }

        res.json({
            title,
            imgURL
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
});

const port = process.env.PORT || 5000;

app.use(logger('dev'));

app.listen(port, () => console.log(`Server running on port:${port}`));