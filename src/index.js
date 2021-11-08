const wa = require('@open-wa/wa-automate'); /* https://docs.openwa.dev/classes/api_Client.Client.html */
const jimp = require('jimp'); /* https://www.npmjs.com/package/jimp */
const pensadorAPI = require('pensador-api') /* https://github.com/operfildoluiz/pensador-api */

const authors = require('./authors.json');

const GROUP_LEMBRETES_ID = '558881858742-1632265868@g.us';

const getRandomImage = async () => {
    const URL_RANDOM_IMAGE = 'https://picsum.photos/400/400';

    const dataImage = await jimp.read(URL_RANDOM_IMAGE);

    const image = await dataImage.getBase64Async(jimp.MIME_JPEG);

    return image;
};

const getRandomNumber = (limit) => {
    return parseInt(Math.random() * limit.length);
};

const getText = async () => {
    const pensador = authors[getRandomNumber(authors)];
    const { phrases } = await pensadorAPI({term: pensador, max: 10});
    const { text } = phrases[getRandomNumber(phrases)];

    return { text, pensador };
};

const execute = async () => {
    try {

        const client = await wa.create();

        const image = await getRandomImage();

        const { text, pensador } = await getText();

        const contacts = (await client.getAllContacts())
            .filter(c => c.id === GROUP_LEMBRETES_ID);

        contacts.forEach(c => {
            client.sendFile(c.id, image, 'bom dia.jpg', `${text} - ${pensador}`);
        });

        console.log(`Enviando arquivo`);
    } catch (e) {
        console.log(e.message);
    }
};

execute();