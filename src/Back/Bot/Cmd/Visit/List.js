
/**
 * The handler for 'visit_list' command.
 */
export default class Dialog_Back_Bot_Cmd_Visit_List {
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
            let msg = 'The command visit_list has not been processed.';
            const from = ctx.from;
            const userId = from.id;
            logger.info(`Command visit_list has been received from user '${from.username}' (id:${from.id})`);
            // ...
            await ctx.reply(msg, {
                parse_mode: 'HTML',
            });
        };
    }
}