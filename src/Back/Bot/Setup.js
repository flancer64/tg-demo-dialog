/**
 * Display the messages about the processing of an API request.
 */
// IMPORTS
import {session} from 'grammy';
import {conversations, createConversation} from '@grammyjs/conversations';

// CLASSES
/**
 * @implements {Telegram_Bot_Back_Api_Setup}
 */
export default class Dialog_Back_Bot_Setup {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Telegram_Bot_Back_Mod_Mdlwr_Log} mwLog
     * @param {Dialog_Back_Bot_Filter_Message} filterMessage
     * @param {Dialog_Back_Bot_Conv_Service_Create} dialogServiceCreate
     * @param {Dialog_Back_Bot_Conv_Start} dialogStart
     * @param {Dialog_Back_Bot_Conv_Visit_Service} dialogVisitService
     * @param {Dialog_Back_Bot_Setup_A_HndlCmd|function} aHndlCmd
     * @param {typeof Dialog_Back_Enum_Bot_Callback} CB
     * @param {typeof Dialog_Back_Enum_Bot_Command} CMD
     * @param {typeof Dialog_Back_Enum_Bot_Conv} DLG
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Telegram_Bot_Back_Mod_Mdlwr_Log$: mwLog,
            Dialog_Back_Bot_Filter_Message$: filterMessage,
            Dialog_Back_Bot_Conv_Service_Create$: dialogServiceCreate,
            Dialog_Back_Bot_Conv_Start$: dialogStart,
            Dialog_Back_Bot_Conv_Visit_Service$: dialogVisitService,
            Dialog_Back_Bot_Setup_A_HndlCmd$: aHndlCmd,
            Dialog_Back_Enum_Bot_Callback$: CB,
            Dialog_Back_Enum_Bot_Command$: CMD,
            Dialog_Back_Enum_Bot_Conv$: DLG,
        }
    ) {
        // INSTANCE METHODS
        this.commands = async function (bot) {
            bot.api.setMyCommands([
                {command: CMD.HELP, description: 'Get help.'},
                {command: CMD.SERVICE_CREATE, description: 'Create a new service (for vendors).'},
                {command: CMD.SERVICE_DELETE, description: 'Delete a service (for vendors).'},
                {command: CMD.SERVICE_LIST, description: 'View the list of available services.'},
                {command: CMD.SERVICE_READ, description: 'View details about a service.'},
                {command: CMD.SERVICE_UPDATE, description: 'Update a service (for vendors).'},
                {command: CMD.SETTINGS, description: 'Configure bot settings.'},
                {command: CMD.START, description: 'Start using the bot.'},
                {command: CMD.VISIT_APPROVE, description: 'Approve a visit request (for vendors).'},
                {command: CMD.VISIT_DECLINE, description: 'Decline a visit request (for vendors).'},
                {command: CMD.VISIT_DELETE, description: 'Cancel a scheduled visit.'},
                {command: CMD.VISIT_LIST, description: 'View your visits or all visits to services (for vendors).'},
                {command: CMD.VISIT_QUEUE, description: 'View visit requests (for vendors).'},
                {command: CMD.VISIT_READ, description: 'View details about a visit.'},
                {command: CMD.VISIT_SERVICE, description: 'Register for a service (for clients).'},
            ]);
            logger.info(`A total of ${Object.keys(CMD).length} commands have been set for the bot.`);
        };

        this.description = async function (bot) {
            try {
                await bot.api.setMyDescription(
                    `
🤖 Тестовый бот для записи на обслуживание (MVP)

Этот бот создан для проверки гипотезы и позволяет:
• Клиентам — записываться на услуги.
• Вендорам — управлять своими сервисами и заявками клиентов.

Бот работает по графику с 10:00 до 18:00, с понедельника по пятницу.

Цель — протестировать идею и получить обратную связь.
            `,
                    {
                        language_code: 'ru',
                    }
                );
                await bot.api.setMyDescription(
                    `
🤖 Test bot for service appointments (MVP)

This bot is created to test a hypothesis and offers:
• Clients — the ability to book services.
• Vendors — tools to manage their services and client requests.

The bot operates from 10:00 to 18:00, Monday to Friday.

The goal is to test the idea and gather feedback.
            `,
                    {
                        language_code: 'en',
                    }
                );
            } catch (e) {
                logger.exception(e);
            }
        };

        this.handlers = function (bot) {
            // add command handlers
            aHndlCmd(bot);

            // add other handlers
            bot.on('message', filterMessage);
        };

        this.middleware = function (bot) {
            // set up middleware
            bot.use(mwLog.create());

            bot.use(session({initial: () => ({})}));
            bot.use(conversations());

            // set up conversations
            bot.use(createConversation(dialogServiceCreate, DLG.SERVICE_CREATE));
            bot.use(createConversation(dialogStart, DLG.START));
            bot.use(createConversation(dialogVisitService, DLG.VISIT_SERVICE));
        };
    }
}
