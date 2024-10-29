/**
 * The handler for 'visit_service' command.
 */
export default class Dialog_Back_Bot_Cmd_Visit_Service {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {typeof Dialog_Back_Enum_Bot_Conv} CONV
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Enum_Bot_Conv$: CONV,
        }
    ) {
        /**
         * @type {Telegram_Bot_Back_Api_Handler}
         * @param {Object} ctx
         * @param {Object} [opts]
         * @param {number} [opts.serviceId]
         */
        const res = async (ctx, {serviceId}) => {
            try {
                // ctx.session.serviceId = serviceId;
                ctx['teqfwServiceId'] = serviceId;
                //console.dir(boo);
                await ctx.conversation.enter(CONV.VISIT_SERVICE);
            } catch (e) {
                logger.exception(e);
            }
        };
        return res;
    }
}
