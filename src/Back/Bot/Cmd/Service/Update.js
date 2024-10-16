
/**
 * The handler for 'service_update' command.
 */
export default class Dialog_Back_Bot_Cmd_Service_Update {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Dialog_Back_Mod_User} userService
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Mod_User$: userService,
        }
    ) {
        return async (ctx) => {
            let msg = 'The command service_update has not been processed.';
            const from = ctx.from;
            const userId = from.id;
            logger.info(`Command service_update has been received from user '${from.username}' (id:${from.id})`);
            // ...
            await ctx.reply(msg, {
                parse_mode: 'HTML',
            });
        };
    }
}
