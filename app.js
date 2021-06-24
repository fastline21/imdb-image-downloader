const express = require('express');
const logger = require('morgan');
const rp = require('request-promise');
const cheerio = require('cheerio');

const app = express();

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const requestURL = `https://www.imdb.com/title/${id}`;

    let result = {
        success: false
    }

    const getIMDBData = async (requestURL) => {
        try {
            const pageResult = await rp(requestURL);
            const $ = cheerio.load(pageResult);

            const title = $('div.title_wrapper > h1', pageResult).text().trim();
            const imgURLSource = $('div.poster > a', pageResult).attr();

            // Sometimes the poster is undefined
            // So it needs to return false
            // In order to rerun the function again.
            if (!imgURLSource) {
                return {
                    success: false
                }
            }

            let imgURL = '';

            try {
                const imgResult = await rp(`https://www.imdb.com${imgURLSource.href}`);
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
            return {
                success: true,
                title,
                imgURL
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: error.message })
        }
    }

    while (!result.success) {
        result = { ...await getIMDBData(requestURL) };
    }

    res.json({
        title: result.title,
        imgURL: result.imgURL
    });
});

const port = process.env.PORT || 5000;

app.use(logger('dev'));

app.listen(port, () => console.log(`Server running on port:${port}`));