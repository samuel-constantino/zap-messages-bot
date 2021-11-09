const wa = require('@open-wa/wa-automate'); /* https://docs.openwa.dev/classes/api_Client.Client.html */
const nodeSchedule = require('node-schedule'); /* https://www.npmjs.com/package/node-schedule */

const { getRandomImage, getRandomText } = require('./randomData');

require('dotenv').config(); /* https://www.npmjs.com/package/dotenv */

const GROUP_LEMBRETES_ID = process.env.GROUP_LEMBRETES_ID;

const sendMessage = async () => {
    try {
        const client = await wa.create(); // Create WA client

        nodeSchedule.scheduleJob('0 0/1 * * * *', async () => {

            const image = await getRandomImage(); // Get image and convert to base64

            const { text, philosopher } = await getRandomText(); // get a random text and your author (philosopher)

            const contacts = (await client.getAllContacts())
                .filter(c => c.id === GROUP_LEMBRETES_ID); // filters contacts
            
            console.log(`Enviando para:`);
            contacts.forEach(c => console.log(`${c.name}`));

            contacts.forEach(c => {
                client.sendFile(c.id, image, 'image.jpg', `${text} - ${philosopher}`);
            });
        });
    } catch (e) {
        console.log(e.message);
    }
};

sendMessage();




