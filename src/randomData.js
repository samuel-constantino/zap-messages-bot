const jimp = require('jimp'); /* https://www.npmjs.com/package/jimp */
const philosopherApi = require('pensador-api') /* https://github.com/operfildoluiz/pensador-api */

const authors = require('./authors.json');

const URL_RANDOM_IMAGE = 'https://picsum.photos/400/400';

const getRandomImage = async () => {

    const dataImage = await jimp.read(URL_RANDOM_IMAGE);

    const image = await dataImage.getBase64Async(jimp.MIME_JPEG);

    return image;
};

const getRandomNumber = (limit) => {
    return parseInt(Math.random() * limit.length);
};

const getRandomText = async () => {
    const philosopher = authors[getRandomNumber(authors)];
    const { phrases } = await philosopherApi({term: philosopher, max: 10});
    const { text } = phrases[getRandomNumber(phrases)];

    return { text, philosopher };
};

module.exports = {
    getRandomImage,
    getRandomText
}