/**
 * The conversation for the '/visit_service' command.
 */
// IMPORTS
import {InlineKeyboard} from 'grammy';

// CLASSES
export default class Dialog_Back_Bot_Conv_Visit_Service {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {Dialog_Back_Util_Format} utilFormat
     * @param {Dialog_Back_Mod_Service} modService
     * @param {Dialog_Back_Mod_User} modUser
     * @param {Dialog_Back_Mod_Visit} modVisit
     * @param {typeof Dialog_Back_Enum_Bot_Command} CMD
     * @param {typeof Dialog_Back_Enum_User_Role} ROLE
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Util_Format$: utilFormat,
            Dialog_Back_Mod_Service$: modService,
            Dialog_Back_Mod_User$: modUser,
            Dialog_Back_Mod_Visit$: modVisit,
            Dialog_Back_Enum_Bot_Command$: CMD,
            Dialog_Back_Enum_User_Role$: ROLE,
        }
    ) {
        return async (conversation, ctx) => {
            try {
                logger.info(`User is entering into the conversation: ${JSON.stringify(conversation.session)}`);
                const telegramId = ctx.from.id;
                const username = ctx.from.username;
                let msg = `Hi @${username}!`;
                // const storedId = ctx.session.serviceId;
                const storedId = ctx['teqfwServiceId'];
                logger.info(`session saved ID: ${storedId}.`);
                // Check if the user has the CUSTOMER role
                /** @type {Dialog_Back_Dto_User.Dto} */
                let user = await conversation.external(
                    () => modUser.read({telegramId})
                );
                if (!user?.role === ROLE.CUSTOMER) {
                    msg += `\nYou're not a customer. Please, use the ${CMD.SET_MODE} command for beginning.`;
                    await ctx.reply(msg);
                    return;
                } else {
                    // user is a customer and can create a visit
                    const parts = ctx.message.text.split(' ');
                    let serviceId = (storedId) ? storedId : parts.length > 1 ? parts[1] : null;

                    // Start gathering service data
                    const dto = modVisit.composeEntity();
                    dto.customerRef = user.id;

                    // Ask for the service
                    do {
                        logger.info(`do loop`);
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
                            task: async (id) => modService.read({id}),
                            args: [serviceId]

                        });
                        logger.info(`service is read`);
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
                            logger.info(`details are sent`);
                        }

                    } while (!dto.serviceRef);


                    // Ask for the visit date and time
                    await ctx.reply('Please enter the visit date and time (in format YYYY/MM/DD HH:MM):');
                    logger.info(`prompt is sent`);
                    let visitDateTime;
                    do {
                        try {
                            visitDateTime = await conversation.form.text();
                        } catch (e) {
                            debugger
                        }
                        logger.info(`valid date is got`);
                        if (!/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/.test(visitDateTime)) {
                            await ctx.reply('Invalid format. Please enter the date and time in format YYYY/MM/DD HH:MM.');
                        }
                    } while (!/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/.test(visitDateTime));
                    logger.info(`Visit date: ${visitDateTime}`);
                    dto.dateVisit = new Date(visitDateTime);

                    // Confirm visit details
                    msg = `\nVisit Information:\nService: ${dto.serviceName}\nDate and Time: ${visitDateTime}\n\n\nDo you want to confirm this visit?`;
                    const confirmationKeyboard = new InlineKeyboard()
                        .text('Yes', 'confirm')
                        .text('No', 'cancel');
                    await ctx.reply(msg, {reply_markup: confirmationKeyboard});

                    // Wait for the user's confirmation
                    const cbCtx = await conversation.waitForCallbackQuery(['confirm', 'cancel']);
                    if (cbCtx) {
                        // Disable the blinking effect of the inline button on UI
                        await cbCtx.answerCallbackQuery();
                        // process incoming data
                        const answer = cbCtx?.callbackQuery?.data;

                        // If the selected role is different, update the user's role
                        if (answer === 'confirm') {
                            /** @type {Dialog_Back_Dto_Visit.Dto} */
                            const visit = await conversation.external(
                                () => modVisit.create({dto})
                            );
                            if (visit?.id) {
                                await ctx.reply(`The visit is registered.`);
                                const vendorId = visit.vendorRef;
                                await conversation.external(
                                    async () => {
                                        const user = await modUser.read({id: vendorId});
                                        await ctx.api.sendMessage(user.telegramId, `You have a new visit to a service!!`);
                                    }
                                );
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
