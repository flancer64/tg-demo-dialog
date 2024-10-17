/**
 * The conversation for the '/start' command.
 */
// IMPORTS
import {InlineKeyboard} from 'grammy';

// CLASSES
export default class Dialog_Back_Bot_Dlg_Start {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {Dialog_Back_Mod_User} modUser
     * @param {typeof Dialog_Back_Enum_User_Role} ROLE
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Mod_User$: modUser,
            Dialog_Back_Enum_User_Role$: ROLE,
        }
    ) {
        // Mapped role names for user-friendly display
        const ROLE_NAME = {
            [ROLE.CUSTOMER]: 'Customer',
            [ROLE.VENDOR]: 'Vendor',
        };

        // Inline keyboard for role selection
        const roleKeyboard = new InlineKeyboard()
            .text(ROLE_NAME[ROLE.CUSTOMER], ROLE.CUSTOMER)
            .text(ROLE_NAME[ROLE.VENDOR], ROLE.VENDOR);

        return async (conversation, ctx) => {
            try {
                const telegramId = ctx.from.id;
                const username = ctx.from.username;
                let msg = `Hi @${username}!`;

                // Check if the user already exists in the system
                /** @type {Dialog_Back_Dto_User.Dto} */
                let user = await conversation.external(
                    () => modUser.read({telegramId})
                );
                if (!user) {
                    user = modUser.composeEntity();
                    user.lang = ctx.from.language_code;
                    user.nameFirst = ctx.from.first_name;
                    user.nameLast = ctx.from.last_name;
                    user.role = ROLE.CUSTOMER;
                    user.telegramId = telegramId;
                    user.username = username;
                    user = await conversation.external(
                        () => modUser.create({dto: user})
                    );
                    msg += `\nYou're a new user and your current role is: '${ROLE_NAME[user.role]}'.`;
                } else {
                    msg += `\nYour current role is: '${ROLE_NAME[user.role]}'.`;
                }
                msg += `\nPlease select your desired role to continue:`;

                // Send the role selection message
                await ctx.reply(msg, {reply_markup: roleKeyboard});

                // Wait for the user's role selection
                const cbCtx = await conversation.waitForCallbackQuery(Object.values(ROLE));
                if (cbCtx) {
                    const roleSelected = cbCtx?.callbackQuery?.data;

                    // If the selected role is different, update the user's role
                    if (roleSelected !== user.role) {
                        user.role = roleSelected;
                        user = await conversation.external(
                            () => modUser.update({dto: user})
                        );
                        // TODO: change help & menu for the user
                    }

                    // Disable the blinking effect of the inline button on UI
                    await cbCtx.answerCallbackQuery(`Your current role is '${ROLE_NAME[user.role]}'.`);
                }

                // Send a welcome message with role confirmation
                await ctx.reply(`Welcome to the chat, @${username}! Your current role is '${ROLE_NAME[user.role]}'.`);

                // Suggest using service commands
                await ctx.reply(`To continue, you can use /service_list to see available services or /service_create to create a new service.`);

            } catch (e) {
                await ctx.reply(`Error while processing: ${e}`);
                logger.exception(e);
            }
        };
    }
}
