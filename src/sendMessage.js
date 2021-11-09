const wa = require('@open-wa/wa-automate'); /* https://docs.openwa.dev/classes/api_Client.Client.html */
const nodeSchedule = require('node-schedule'); /* https://www.npmjs.com/package/node-schedule */

const { getRandomImage, getRandomText } = require('./randomData');

const sendMessage = async (contacts, cronExpression) => {
    console.log(contacts, cronExpression)
    try {
        const client = await wa.create(); // Create WA client

        nodeSchedule.scheduleJob(cronExpression, async () => {

            const image = await getRandomImage(); // Get image and convert to base64

            const { text, philosopher } = await getRandomText(); // get a random text and your author (philosopher)
            
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

module.exports = sendMessage;