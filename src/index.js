const wa = require('@open-wa/wa-automate');
const jimp = require('jimp');

const GROUP_LEMBRETES_ID = '558881858742-1632265868@g.us';


const getRandomImage = async () => {
    const URL_RANDOM_IMAGE = 'https://picsum.photos/400/400';

    const dataImage = await jimp.read(URL_RANDOM_IMAGE);

    const image = await dataImage.getBase64Async(jimp.MIME_JPEG);

    return image;
};

const execute = async () => {
    try {

        const client = await wa.create();

        const image = await getRandomImage();

        const contacts = (await client.getAllContacts())
            .filter(c => c.id === GROUP_LEMBRETES_ID);

        contacts.forEach(c => {
            client.sendFile(c.id, image, 'bom dia.jpg', "teste: text");
        });

        console.log(`Enviando arquivo`);
    } catch (e) {
        console.log(e.message);
    }
};

execute();