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
     * @param {Dialog_Back_Bot_Filter_Message} filterMessage
     * @param {Dialog_Back_Bot_Dlg_Service_Create} dialogServiceCreate
     * @param {Dialog_Back_Bot_Dlg_Start} dialogStart
     * @param {Dialog_Back_Bot_Dlg_Visit_Service} dialogVisitService
     * @param {Dialog_Back_Bot_Setup_A_HndlCmd|function} aHndlCmd
     * @param {typeof Dialog_Back_Bot_Callback} CB
     * @param {typeof Dialog_Back_Bot_Command} CMD
     * @param {typeof Dialog_Back_Bot_Dialog} DLG
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Bot_Filter_Message$: filterMessage,
            Dialog_Back_Bot_Dlg_Service_Create$: dialogServiceCreate,
            Dialog_Back_Bot_Dlg_Start$: dialogStart,
            Dialog_Back_Bot_Dlg_Visit_Service$: dialogVisitService,
            Dialog_Back_Bot_Setup_A_HndlCmd$: aHndlCmd,
            Dialog_Back_Bot_Callback$: CB,
            Dialog_Back_Bot_Command$: CMD,
            Dialog_Back_Bot_Dialog$: DLG,
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
            return bot;
        };

        this.handlers = function (bot) {
            // set up middleware
            bot.use(session({initial: () => ({})}));
            bot.use(conversations());

            bot.use(async (ctx, next) => {
                const message = ctx.message;
                if (message) {
                    const user = message.from.username;
                    const userId = message.from.id;
                    const msgId = message.message_id;
                    const chatId = message.chat.id;
                    logger.info(`[${chatId}][${msgId}][${user}][${userId}] ${message?.text}`);
                }
                await next();
            });

            // set up conversations
            bot.use(createConversation(dialogServiceCreate, DLG.SERVICE_CREATE));
            bot.use(createConversation(dialogStart, DLG.START));
            bot.use(createConversation(dialogVisitService, DLG.VISIT_SERVICE));

            // add command handlers
            aHndlCmd(bot);

            // add other handlers
            bot.on('message', filterMessage);
            return bot;
        };
    }
}
