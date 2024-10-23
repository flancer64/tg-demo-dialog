
/**
 * The handler for 'visit_list' command.
 */
export default class Dialog_Back_Bot_Cmd_Visit_List {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Dialog_Back_Util_Format} utilFormat
     * @param {Dialog_Back_Mod_Visit} modVisit
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Util_Format$: utilFormat,
            Dialog_Back_Mod_Visit$: modVisit,
        }
    ) {
        return async (ctx) => {
            let msg = 'The command visit_list has not been processed.';
            const from = ctx.from;
            logger.info(`Command has been received from user '${from.username}' (id:${from.id})`);
            try {
                const rs = await modVisit.list();
                if (rs.length > 0) {
                    msg = `Here is the list of visits:\n\n`;
                    for (const one of rs) {
                        msg += `(${one.id}) ${utilFormat.dateTimeShort(one.dateVisit)}[${one.status}]: ${one.serviceName} (${one.userName})\n`;
                    }
                    msg += `\nType '/visit_read X' to get details.`;
                } else {
                    msg = 'No visits found.';
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
