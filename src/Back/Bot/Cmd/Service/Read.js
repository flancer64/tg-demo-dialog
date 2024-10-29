import {InlineKeyboard} from 'grammy';

const VISIT = 'visit';

/**
 * The handler for 'service_read' command.
 */
export default class Dialog_Back_Bot_Cmd_Service_Read {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Telegram_Bot_Back_Mod_Handler_Callback_Query_Data} hndlCallbackData
     * @param {Dialog_Back_Util_Format} utilFormat
     * @param {Dialog_Back_Mod_Service} modService
     * @param {Dialog_Back_Bot_Cmd_Visit_Service|Telegram_Bot_Back_Api_Handler} cmdVisitService
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Telegram_Bot_Back_Mod_Handler_Callback_Query_Data$: hndlCallbackData,
            Dialog_Back_Util_Format$: utilFormat,
            Dialog_Back_Mod_Service$: modService,
            Dialog_Back_Bot_Cmd_Visit_Service$: cmdVisitService,
        }
    ) {
        /**
         * @type {Telegram_Bot_Back_Api_Handler}
         * @param {Object} ctx
         * @param {Object} [opts]
         * @param {number} [opts.serviceId]
         */
        const res = async (ctx, {serviceId} = {}) => {
            // FUNCS
            function getServiceId(ctx, optsId) {
                const parts = ctx.message.text.split(' ');
                return optsId ? parseInt(optsId) : parseInt(parts[1]);
            }

            // MAIN
            try {
                let msg = 'The command service_read has not been processed.';
                const id = getServiceId(ctx, serviceId);
                if (id) {
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
                        const keyboard = new InlineKeyboard()
                            .text('Visit', VISIT);

                        // Update keyboard callback_data, add handler ID to the values
                        hndlCallbackData.updateInlineKeyboard(keyboard, ctx.message);
                        /** @type {CommonMessage} */
                        const sentMsg = await ctx.reply(msg, {
                            parse_mode: 'HTML',
                            reply_markup: keyboard,
                        });
                        // Register a one-time callback handler for button selection
                        hndlCallbackData.addHandler(async (cbCtx) => {
                            const callbackData = hndlCallbackData.extractData(cbCtx.callbackQuery.data);

                            if (callbackData === VISIT) {
                                logger.info(`User want to visit the service with ID: ${id}`);

                                // Remove inline buttons by editing the message text
                                await cbCtx.editMessageText(`You want to visit service '${found.name}'.`);

                                // Call the read command for the selected service
                                await cmdVisitService(ctx, {serviceId: id});
                            } else {
                                await cbCtx.reply('Invalid selection. Please try again.');
                            }
                        }, ctx, {sentMsg});
                    } else {
                        msg = `No service found with the specified ID (${id}).`;
                        logger.info(msg);
                        await ctx.reply(msg);
                    }
                } else {
                    msg = 'Please, type the service ID as a second argument in the read command.';
                    await ctx.reply(msg);
                }
            } catch (e) {
                logger.exception(e);
            }
        };
        return res;
    }
}
