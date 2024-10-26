/**
 * The handler for 'service_read' command.
 */
export default class Dialog_Back_Bot_Cmd_Service_Read {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Dialog_Back_Util_Format} utilFormat
     * @param {Dialog_Back_Mod_Service} modService
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Util_Format$: utilFormat,
            Dialog_Back_Mod_Service$: modService,
        }
    ) {
        /**
         * @type {Telegram_Bot_Back_Api_Handler}
         * @param {number} opts.serviceId
         */
        const res = async (ctx, opts = {}) => {
            // FUNCS

            // MAIN
            let msg = 'The command service_read has not been processed.';
            try {
                const parts = ctx.message.text.split(' ');
                const id = opts.serviceId ?? parseInt(parts[1]);
                const found = await modService.read({id});
                if (found) {
                    msg = `
Service Details:

ID: <b>${found.id}</b>
Name: <b>${found.name}</b>
Description: <b>${found.description}</b>
Duration (minutes): <b>${found.duration}</b>
Address: <b>${found.address}</b>
Date Created: <b>${utilFormat.dateTime(found.dateCreated)}</b>`;
                    logger.info(`Details have been read for service #${found.id}.`);
                } else {
                    msg = `No service found with the specified ID (${id}).`;
                    logger.info(msg);
                }
            } catch (e) {
                msg = e.toString();
                logger.error(msg);
            }
            // https://core.telegram.org/bots/api#sendmessage
            await ctx.reply(msg, {
                parse_mode: 'HTML',
            });
        };
        return res;
    }
}
