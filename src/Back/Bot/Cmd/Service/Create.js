
/**
 * The handler for 'service_create' command.
 */
export default class Dialog_Back_Bot_Cmd_Service_Create {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {typeof Dialog_Back_Enum_Bot_Conv} DLG
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Enum_Bot_Conv$: DLG,
        }
    ) {
        return async (ctx) => {
            const from = ctx.from;
            logger.info(`Command has been received from user '${from.username}' (id:${from.id})`);
            try {
                const boo = ctx.session;
                await ctx.conversation.exit();
                await ctx.conversation.enter(DLG.SERVICE_CREATE);
            } catch (e) {
                await ctx.reply(`Error in processing: ${e}`);
                logger.exception(e);
            }
        };
    }
}
