/**
 * The handler for 'visit_read' command.
 */
export default class Dialog_Back_Bot_Cmd_Visit_Read {
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
            let msg = 'The command visit_read has not been processed.';
            const from = ctx.from;
            logger.info(`Command has been received from user '${from.username}' (id:${from.id})`);
            try {
                const parts = ctx.message.text.split(' ');
                const id = parts[1];
                const found = await modVisit.read({id});
                if (found) {
                    msg = `
Visit Details:

ID: <b>${found.id}</b>
Created: <b>${utilFormat.dateTimeShort(found.dateCreated)}</b>
Visit Date: <b>${utilFormat.dateTimeShort(found.dateVisit)}</b>
Customer Name: <b>${found.customerName}</b>
Service ID: <b>${found.serviceRef}</b>
Service Name: <b>${found.serviceName}</b>
Duration (minutes): <b>${found.serviceDuration}</b>
Vendor ID: <b>${found.vendorRef}</b>
Vendor Name: <b>${found.vendorName}</b>
`;
                    logger.info(`Details have been read for visit #${found.id}.`);
                } else {
                    msg = `No visit found with the specified ID (${id}).`;
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
    }
}
