/**
 * The handler for 'message' filter.
 */
export default class Dialog_Back_Bot_Filter_Message {
    /**
     * The factory function to inject the deps and create the handler.
     *
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     *
     * @return {(function(*): Promise<void>)|*}
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
        }
    ) {
        return async (ctx) => {
            // ctx.reply('An unknown message has been received.').catch(logger.exception);
            const user = ctx.from.username;
            const userId = ctx.from.id;
            const txt = ctx.msg.text;
            logger.info(`An unknown message has been received from user '${user}' (id:${userId}): ${txt}`);
        };
    }
}
