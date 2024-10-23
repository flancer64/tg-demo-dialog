/**
 * The conversation for the '/visit_service' command.
 */
// IMPORTS
import {InlineKeyboard} from 'grammy';

// CLASSES
export default class Dialog_Back_Bot_Dlg_Visit_Service {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {Dialog_Back_Util_Format} utilFormat
     * @param {Dialog_Back_Mod_Service} modService
     * @param {Dialog_Back_Mod_User} modUser
     * @param {Dialog_Back_Mod_Visit} modVisit
     * @param {typeof Dialog_Back_Enum_User_Role} ROLE
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Util_Format$: utilFormat,
            Dialog_Back_Mod_Service$: modService,
            Dialog_Back_Mod_User$: modUser,
            Dialog_Back_Mod_Visit$: modVisit,
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

                // Check if the user has the CUSTOMER role
                /** @type {Dialog_Back_Dto_User.Dto} */
                let user = await conversation.external(
                    () => modUser.read({telegramId})
                );
                if (!user?.role === ROLE.CUSTOMER) {
                    msg += `\nYou're not a customer. Please, use the /start command for beginning.`;
                    await ctx.reply(msg);
                    return;
                } else {
                    // user is a customer and can create a visit
                    const parts = ctx.message.text.split(' ');
                    let serviceId = parts.length > 1 ? parts[1] : null;

                    // Start gathering service data
                    const dto = modVisit.composeEntity();
                    dto.customerRef = user.id;

                    // Ask for the service
                    do {
                        if (!serviceId) {
                            await ctx.reply('Please enter the ID of the service:');
                            serviceId = await conversation.form.int({
                                radix: 10,
                                otherwise: async (ctx) => {
                                    await ctx.reply('Cannot find service by ID. Please enter a valid ID.');
                                }
                            });
                        }
                        /** @type {Dialog_Back_Dto_Service.Dto} */
                        let service = await conversation.external({
                            task: (id) => modService.read({id}),
                            args: [serviceId]

                        });
                        if (service) {
                            dto.serviceName = service.name;
                            dto.serviceRef = service.id;
                            const msg = `
Service Details:

ID: <b>${service.id}</b>
Name: <b>${service.name}</b>
Description: <b>${service.description}</b>
Duration (minutes): <b>${service.duration}</b>
Address: <b>${service.address}</b>
Date Created: <b>${utilFormat.dateTime(service.dateCreated)}</b>`;
                            await ctx.reply(msg, {
                                parse_mode: 'HTML',
                            });
                        }

                    } while (!dto.serviceRef);


                    // Ask for the visit date and time
                    await ctx.reply('Please enter the visit date and time (in format YYYY/MM/DD HH:MM):');
                    let visitDateTime;
                    do {
                        visitDateTime = await conversation.form.text();
                        if (!/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/.test(visitDateTime)) {
                            await ctx.reply('Invalid format. Please enter the date and time in format YYYY/MM/DD HH:MM.');
                        }
                    } while (!/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/.test(visitDateTime));

                    dto.dateVisit = new Date(visitDateTime);

                    // Confirm visit details
                    msg = `\nVisit Information:\nService: ${dto.serviceName}\nDate and Time: ${visitDateTime}\n\n\nDo you want to confirm this visit?`;
                    const confirmationKeyboard = new InlineKeyboard()
                        .text('Yes', 'confirm')
                        .text('No', 'cancel');
                    await ctx.reply(msg, {reply_markup: confirmationKeyboard});

                    // Wait for the user's role selection
                    const cbCtx = await conversation.waitForCallbackQuery(['confirm', 'cancel']);
                    if (cbCtx) {
                        // Disable the blinking effect of the inline button on UI
                        await cbCtx.answerCallbackQuery();
                        // process incoming data
                        const answer = cbCtx?.callbackQuery?.data;

                        // If the selected role is different, update the user's role
                        if (answer === 'confirm') {
                            let visit = await conversation.external(
                                () => modVisit.create({dto})
                            );
                            // TODO: change help & menu for the user
                            if (visit?.id) {
                                await ctx.reply(`The visit is registered.`);
                            } else {
                                await ctx.reply(`The visit registration is failed.`);
                            }
                        } else {
                            await ctx.reply(`OK, will not register a visit.`);
                        }
                    }

                }
            } catch (e) {
                await ctx.reply(`Error while processing: ${e}`);
                logger.exception(e);
            }
        };
    }
}
