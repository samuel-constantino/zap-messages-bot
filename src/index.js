const readlineSync = require('readline-sync');

const sendMessage = require('./sendMessage');

const CONTACTS_REGEX = /\d{12}/;

const CRON_EXPRESSION_REGEX = /^((((\d+,)+\d+|(\d+(\/|-|#)\d+)|\d+L?|\*(\/\d+)?|L(-\d+)?|\?|[A-Z]{3}(-[A-Z]{3})?) ?){5,7})$/;

const getContacts = () => {
    let contacts = [];

    let answer = null;

    console.log("Adicione novo contato na lista ou responda '0' (zero) para próxima pergunta:\nExemplo: 558881245832\n");
    while(true) {
        answer = readlineSync.questionInt();

        if (answer === 0) break;

        // testa padão da resposta (12 dígitos)
        if (!CONTACTS_REGEX.test(answer)) {
            console.log('O número de contato deve ter 12 dígitos');
            continue;
        };

        contacts.push(answer);

        console.log(`${answer} adicionado`);
    }

    return contacts;
};

const getCronExpression = () => {

    let cronExpression = null;

    console.log("Digite uma Expressão Cron para agendar o envio das mensagens:\nExemplo:\n0 0/1 * * * *\n");
    while(true) {
        cronExpression = readlineSync.question();

        // testa padão da resposta (12 dígitos)
        if (!CRON_EXPRESSION_REGEX.test(cronExpression)) {
            console.log('Padrão da Expressão Cron inválida');
            continue;
        };

        break;
    }

    return cronExpression;
};

const main = () => {
    
    const contacts = getContacts();

    const cronExpression = getCronExpression();
    
    sendMessage(contacts, cronExpression);
}
// main();
sendMessage([558881588013], '0 0/1 * * * *');
