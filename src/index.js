const wa = require('@open-wa/wa-automate'); /* https://docs.openwa.dev/classes/api_Client.Client.html */
const jimp = require('jimp'); /* https://www.npmjs.com/package/jimp */
const philosopherApi = require('pensador-api') /* https://github.com/operfildoluiz/pensador-api */
const nodeSchedule = require('node-schedule');

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
    const philosopher = authors[getRandomNumber(authors)];
    const { phrases } = await philosopherApi({term: philosopher, max: 10});
    const { text } = phrases[getRandomNumber(phrases)];

    return { text, philosopher };
};

const sendMessage = async () => {
    try {
        const client = await wa.create(); // Create WA client

        nodeSchedule.scheduleJob('0 0/5 * * * *', async () => {

            const image = await getRandomImage(); // Get image and convert to base64

            const { text, philosopher } = await getText(); // get a random text and 

            const contacts = (await client.getAllContacts())
                // .filter(c => c.id === '558881588013@c.us'); // filters contacts
                .filter(c => c.id === GROUP_LEMBRETES_ID); // filters contacts

            console.log(`Enviando mensagem para:`);
            contacts.forEach(c => {
                console.log(c);
                client.sendFile(c.id, image, 'image.jpg', `${text} - ${philosopher}`);
            });
        });
    } catch (e) {
        console.log(e.message);
    }
};

sendMessage();



