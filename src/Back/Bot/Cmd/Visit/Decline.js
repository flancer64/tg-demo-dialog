
/**
 * The handler for 'visit_decline' command.
 */
export default class Dialog_Back_Bot_Cmd_Visit_Decline {
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
            let msg = 'The command visit_decline has not been processed.';
            const from = ctx.from;
            const userId = from.id;
            logger.info(`Command visit_decline has been received from user '${from.username}' (id:${from.id})`);
            // ...
            await ctx.reply(msg, {
                parse_mode: 'HTML',
            });
        };
    }
}
