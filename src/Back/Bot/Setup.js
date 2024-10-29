/**
 * Display the messages about the processing of an API request.
 */
// IMPORTS
import {GrammyError, HttpError, session} from 'grammy';
import {conversations, createConversation} from '@grammyjs/conversations';

// CLASSES
/**
 * @implements {Telegram_Bot_Back_Api_Setup}
 */
export default class Dialog_Back_Bot_Setup {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Telegram_Bot_Back_Mod_Mdlwr_Log} mwLog
     * @param {Telegram_Bot_Back_Mod_Handler_Callback_Query_Data} hndlCallbackData
     * @param {Dialog_Back_Bot_Filter_Message} filterMessage
     * @param {Dialog_Back_Bot_Conv_Service_Create} dialogServiceCreate
     * @param {Dialog_Back_Bot_Conv_Start} dialogStart
     * @param {Dialog_Back_Bot_Conv_Visit_Service} dialogVisitService
     * @param {Dialog_Back_Bot_Setup_A_HndlCmd|function} aHndlCmd
     * @param {typeof Dialog_Back_Enum_Bot_Callback} CB
     * @param {typeof Dialog_Back_Enum_Bot_Command} CMD
     * @param {typeof Dialog_Back_Enum_Bot_Conv} CONV
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Telegram_Bot_Back_Mod_Mdlwr_Log$: mwLog,
            Telegram_Bot_Back_Mod_Handler_Callback_Query_Data$: hndlCallbackData,
            Dialog_Back_Bot_Filter_Message$: filterMessage,
            Dialog_Back_Bot_Conv_Service_Create$: dialogServiceCreate,
            Dialog_Back_Bot_Conv_Start$: dialogStart,
            Dialog_Back_Bot_Conv_Visit_Service$: dialogVisitService,
            Dialog_Back_Bot_Setup_A_HndlCmd$: aHndlCmd,
            Dialog_Back_Enum_Bot_Callback$: CB,
            Dialog_Back_Enum_Bot_Command$: CMD,
            Dialog_Back_Enum_Bot_Conv$: CONV,
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
            bot.on('callback_query:data', hndlCallbackData.handle);
            bot.on('message', filterMessage);
        };

        this.middleware = function (bot) {
            bot.api.config.use((prev, method, payload) => {
                logger.info(`Method: ${method}`);
                logger.info(`Payload: ${JSON.stringify(payload)}`);

                return prev(method, payload)
                    .then((result) => {
                        logger.info(`Result: ${JSON.stringify(result)}`);
                        return result;
                    })
                    .catch((err) => {
                        if (err instanceof GrammyError) {
                            logger.error(`Ошибка грамматики: ${err.description}`);
                        } else if (err instanceof HttpError) {
                            logger.error(`HTTP ошибка: ${err}`);
                        } else {
                            logger.error(`Unexpected Error: ${err}`);
                        }
                        throw err;
                    });
            });


            // set up middleware
            bot.use(mwLog.create());
            logger.info(`Logging middleware is set`);

            bot.use(session({
                initial: () => ({
                    conversation: {},  // Space for conversation data
                    otherData: null    // Additional fields can be added as needed
                })
            }));
            bot.use(conversations());

            // This middleware should be placed after `bot.use(conversations())`
            // bot.use(async (ctx, next) => {
            //     if (ctx?.chat && (typeof ctx?.conversation?.active === 'function')) {
            //         const {start} = await ctx.conversation.active();
            //         if (start >= 1) {
            //             logger.info(`An active conversation exists.`);
            //             const commandEntity = ctx.message?.entities?.find(entity => entity.type === 'bot_command');
            //             if (commandEntity) {
            //                 await ctx.conversation.exit(CONV.START);
            //                 await ctx.reply(`The previous conversation has been closed.`);
            //             }
            //         }
            //     }
            //     await next();
            // });

            // set up conversations
            // bot.use(createConversation(dialogServiceCreate, CONV.SERVICE_CREATE));
            // logger.info(`Conversation '${CONV.SERVICE_CREATE}' is set.`);
            // bot.use(createConversation(dialogStart, CONV.START));
            // logger.info(`Conversation '${CONV.START}' is set.`);
            bot.use(createConversation(dialogVisitService, CONV.VISIT_SERVICE));
            logger.info(`Conversation '${CONV.VISIT_SERVICE}' is set.`);
        };
    }
}
