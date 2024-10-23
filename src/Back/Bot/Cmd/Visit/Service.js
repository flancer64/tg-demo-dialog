/**
 * The handler for 'visit_service' command.
 */
export default class Dialog_Back_Bot_Cmd_Visit_Service {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {typeof Dialog_Back_Bot_Dialog} DLG
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Bot_Dialog$: DLG,
        }
    ) {
        return async (ctx) => {
            const from = ctx.from;
            logger.info(`Command has been received from user '${from.username}' (id:${from.id})`);
            try {
                await ctx.conversation.enter(DLG.VISIT_SERVICE);
            } catch (e) {
                await ctx.reply(`Error in processing: ${e}`);
                logger.exception(e);
            }
        };
    }
}
