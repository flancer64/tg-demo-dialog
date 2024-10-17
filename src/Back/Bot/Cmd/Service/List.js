
/**
 * The handler for 'service_list' command.
 */
export default class Dialog_Back_Bot_Cmd_Service_List {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Dialog_Back_Mod_Service} modService
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Mod_Service$: modService,
        }
    ) {
        return async (ctx) => {
            let msg = 'The command service_list has not been processed.';
            const from = ctx.message.from;
            logger.info(`Command has been received from user '${from.username}' (id:${from.id})`);
            try {
                const rs = await modService.list();
                if (rs.length > 0) {
                    msg = `Here is the list of services:\n\n`;
                    for (const one of rs) {
                        msg += `${one.id}: ${one.name}\n`;
                    }
                    msg += `\nType '/service_read X' to get details.`;
                } else {
                    msg = 'No services found.';
                }
                logger.info(`A total of ${rs.length} items has been listed.`);
            } catch (e) {
                msg = e.toString();
                logger.error(msg);
            }
            // https://core.telegram.org/bots/api#sendmessage
            await ctx.reply(msg, {
                parse_mode: 'HTML',
            });
        };
    }
}
