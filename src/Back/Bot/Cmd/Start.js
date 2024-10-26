/**
 * Handler for the /start command.
 * Initializes user status and handles returning, blocked, or new users.
 */

export default class Dialog_Back_Bot_Cmd_Start {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger - logger instance
     * @param {Dialog_Back_Mod_User} modUser
     * @param {Dialog_Back_Bot_Cmd_Help|Telegram_Bot_Back_Api_Handler} cmdHelp
     * @param {typeof Dialog_Back_Enum_User_Status} STATUS
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Mod_User$: modUser,
            Dialog_Back_Bot_Cmd_Help$: cmdHelp,
            Dialog_Back_Enum_User_Status$: STATUS,
        }
    ) {
        // MAIN
        return async (ctx) => {
            const {id: telegramId, username, language_code, first_name, last_name} = ctx.from;
            let msg = `Hi @${username}!`;

            // Check if the user exists, otherwise create a new user
            let user = await modUser.read({telegramId});
            if (!user) {
                // Log new user creation
                logger.info(`New user detected: ${telegramId} (@${username})`);
                user = modUser.composeEntity();
                user.telegramId = telegramId;
                user.username = username;
                user.lang = language_code;
                user.nameFirst = first_name;
                user.nameLast = last_name;
                user.status = STATUS.ACTIVE;
                await modUser.create({dto: user});
                msg += `\nYou're a new user.`;
            } else if (user.status === STATUS.INACTIVE) {
                // Log returning inactive user
                logger.info(`Returning inactive user: ${telegramId} (@${username})`);
                user.status = STATUS.ACTIVE;
                await modUser.update({dto: user});
                msg += `\nYou're a returning user.`;
            } else if (user.status === STATUS.BLOCKED) {
                // Log blocked user attempting to interact
                logger.info(`Blocked user attempted interaction: ${telegramId} (@${username})`);
                msg += `\nYou're a blocked user.`;
            } else {
                // Log existing active user
                logger.info(`Existing active user: ${telegramId} (@${username})`);
                msg += `\nYou're an existing user.`;
            }
            await ctx.reply(msg);
            if (user.status === STATUS.ACTIVE) {
                cmdHelp(ctx, {role: user.role}).catch(logger.exception);
            }
        };
    }
}
