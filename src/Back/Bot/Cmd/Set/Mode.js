import {InlineKeyboard} from 'grammy';

/**
 * Handler for the /set_mode command.
 */
export default class Dialog_Back_Bot_Cmd_Set_Mode {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {Telegram_Bot_Back_Mod_Handler_Callback_Query_Data} hndlCallbackData
     * @param {Dialog_Back_Bot_Cmd_Help|Telegram_Bot_Back_Api_Handler} cmdHelp
     * @param {Dialog_Back_Mod_User} modUser
     * @param {typeof Dialog_Back_Enum_User_Role} ROLE
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Telegram_Bot_Back_Mod_Handler_Callback_Query_Data$: hndlCallbackData,
            Dialog_Back_Bot_Cmd_Help$: cmdHelp,
            Dialog_Back_Mod_User$: modUser,
            Dialog_Back_Enum_User_Role$: ROLE,
        }
    ) {
        // Mapped role names for user-friendly display
        const ROLE_NAME = {
            [ROLE.CUSTOMER]: 'Customer',
            [ROLE.VENDOR]: 'Vendor',
        };

        // MAIN
        return async (ctx) => {
            const {id: telegramId, username} = ctx.from;
            logger.info(`Executing /set_mode for ${telegramId} (@${username}).`);
            let msg = `Hi @${username}!`;

            const user = await modUser.read({telegramId});
            if (user?.role) {
                logger.info(`User role found: ${user.role}`);
                msg += `\nYour current role is '${user.role}'.`;

                // Define the role selection keyboard with unique callback_data
                const roleKeyboard = new InlineKeyboard()
                    .text(ROLE_NAME[ROLE.CUSTOMER], ROLE.CUSTOMER)
                    .text(ROLE_NAME[ROLE.VENDOR], ROLE.VENDOR);

                hndlCallbackData.updateInlineKeyboard(roleKeyboard, ctx.message); // Update keyboard callback_data

                // Send message with role selection keyboard
                await ctx.reply(msg, {reply_markup: roleKeyboard});

                // Register a callback handler for role selection
                hndlCallbackData.addHandler(async (callbackCtx) => {
                    const selectedRole = hndlCallbackData.extractData(callbackCtx.callbackQuery.data);

                    if ([ROLE.CUSTOMER, ROLE.VENDOR].includes(selectedRole)) {
                        user.role = selectedRole;
                        await modUser.update({dto: user});
                        logger.info(`User ${telegramId} changed role to ${selectedRole}`);
                        await callbackCtx.answerCallbackQuery(); // just remove loading indicator
                        // await callbackCtx.answerCallbackQuery({
                        //     text: `Your role has been set to '${ROLE_NAME[selectedRole]}'`,
                        //     show_alert: true,
                        // });
                        await callbackCtx.editMessageText(`Your role is now set to '${ROLE_NAME[selectedRole]}'`);
                        cmdHelp(ctx, {role: user.role}).catch(logger.exception);
                    } else {
                        logger.error(`Unexpected callback data received: ${selectedRole}`);
                        await callbackCtx.answerCallbackQuery({text: 'Invalid selection.', show_alert: true});
                    }
                }, ctx);
            } else {
                logger.error(`No role found for user ${telegramId} (@${username}). Aborting.`);
                msg += `\nCannot retrieve user role. Aborting.`;
                await ctx.reply(msg);
            }
        };
    }
}
