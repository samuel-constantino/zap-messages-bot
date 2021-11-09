const wa = require('@open-wa/wa-automate'); /* https://docs.openwa.dev/classes/api_Client.Client.html */
const nodeSchedule = require('node-schedule'); /* https://www.npmjs.com/package/node-schedule */

const { getRandomImage, getRandomText } = require('./randomData');

const sendMessage = async (contacts, cronExpression) => {
    const objMock = [
        {
            id: '558881917179@c.us',
            pushname: 'Igor Santos',
            type: 'in',
            isBusiness: false,
            isEnterprise: false,
            statusMute: false,
            labels: [],
            disappearingModeDuration: 0,
            disappearingModeSettingTimestamp: 0,
            formattedName: '+55 88 8191-7179',
            isMe: false,
            isMyContact: false,
            isPSA: false,
            isUser: true,
            isWAContact: true,
            profilePicThumbObj: {},
            msgs: null
          },
          {
            id: '558881588013@c.us',
            name: 'Samara ❤️',
            pushname: 'Maria ✨',
            type: 'in',
            isBusiness: false,
            isEnterprise: false,
            statusMute: false,
            sectionHeader: 'S',
            labels: [],
            disappearingModeDuration: 0,
            disappearingModeSettingTimestamp: 0,
            formattedName: 'Samara ❤️',
            isMe: false,
            isMyContact: true,
            isPSA: false,
            isUser: true,
            isWAContact: true,
            profilePicThumbObj: { eurl: null, id: '558881588013@c.us', tag: null },
            msgs: null
          },
          {
            id: '558881858742-1632265868@g.us',
            name: 'Lembretes',
            type: 'in',
            isBusiness: false,
            isEnterprise: false,
            statusMute: false,
            labels: [],
            disappearingModeDuration: 0,
            disappearingModeSettingTimestamp: 0,
            formattedName: 'Lembretes',
            isMe: false,
            isMyContact: false,
            isPSA: false,
            isUser: false,
            isWAContact: false,
            profilePicThumbObj: { eurl: null, id: '558881858742-1632265868@g.us', tag: null },
            msgs: null
          }
    ]
    try {
        const client = await wa.create(); // Create WA client

        nodeSchedule.scheduleJob(cronExpression, async () => {
            const filter = (await client.getAllContacts()).filter((contact) => {
                return contacts.find(c => contact.id === c);
            });
            
            const image = await getRandomImage(); // Get image and convert to base64

            const { text, philosopher } = await getRandomText(); // get a random text and your author (philosopher)
            
            console.log(`Enviando para:`);
            filter.forEach(contact => console.log(`${contact.name}`));

            filter.forEach(contact => {
                client.sendFile(contact.id, image, 'image.jpeg', `${text} - ${philosopher}`);
            });
        });
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = sendMessage;