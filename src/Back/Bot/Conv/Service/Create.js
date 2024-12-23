/**
 * The conversation for the '/service_create' command.
 */
// IMPORTS
import {InlineKeyboard} from 'grammy';

// CLASSES
export default class Dialog_Back_Bot_Conv_Service_Create {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {Dialog_Back_Mod_Service} modService
     * @param {Dialog_Back_Mod_User} modUser
     * @param {typeof Dialog_Back_Enum_User_Role} ROLE
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Mod_Service$: modService,
            Dialog_Back_Mod_User$: modUser,
            Dialog_Back_Enum_User_Role$: ROLE,
        }
    ) {
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
                if (!user?.role === ROLE.VENDOR) {
                    msg += `\nYou're not allowed to create services. Please, use the /start command for beginning.`;
                    await ctx.reply(msg);
                    return;
                } else {
                    // Start gathering service data
                    const dto = modService.composeEntity();
                    dto.userId = user.id;

                    // Ask for the service name
                    await ctx.reply('Please enter the name of the service:');
                    dto.name = await conversation.form.text();

                    // Ask for the service description
                    await ctx.reply('Please enter a description for the service:');
                    dto.description = await conversation.form.text();

                    // Ask for the service duration
                    await ctx.reply('Please enter the duration of the service (in minutes):');
                    do {
                        dto.duration = await conversation.form.int({
                            radix: 10, otherwise: async (ctx) => {
                                await ctx.reply('Invalid duration. Please enter a valid number.');
                            }
                        });
                        if (isNaN(dto.duration) || dto.duration <= 0) {
                            await ctx.reply('Invalid duration. Please enter a valid number.');
                        }
                    } while ((isNaN(dto.duration) || dto.duration <= 0));

                    // Ask for the service address
                    await ctx.reply('Please enter the service address:');
                    dto.address = await conversation.form.text();

                    // Save the service
                    /** @type {Dialog_Back_Dto_Service.Dto} */
                    const created = await conversation.external(() => modService.create({dto}));

                    // Confirm service creation
                    msg += `\nYour service "${created.name}" (id:${created.id}) has been successfully created!`;
                    await ctx.reply(msg);
                }
            } catch (e) {
                await ctx.reply(`Error while processing: ${e}`);
                logger.exception(e);
            }
        };
    }
}
