import {InlineKeyboard} from 'grammy';

/**
 * The handler for 'service_list' command.
 */
export default class Dialog_Back_Bot_Cmd_Service_List {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger - logger instance
     * @param {Telegram_Bot_Back_Mod_Handler_Callback_Query_Data} hndlCallbackData
     * @param {Dialog_Back_Bot_Cmd_Service_Read|Telegram_Bot_Back_Api_Handler} cmdRead
     * @param {Dialog_Back_Mod_Service} modService
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Telegram_Bot_Back_Mod_Handler_Callback_Query_Data$: hndlCallbackData,
            Dialog_Back_Bot_Cmd_Service_Read$: cmdRead,
            Dialog_Back_Mod_Service$: modService,
        }
    ) {
        const res = async (ctx, {page}) => {
            page = page ?? 0;
            // Default message if no services are found
            let msg = 'No services found.';
            try {
                // Retrieve the list of services
                const services = await modService.list();
                const servicesPerPage = 6; // Number of services per page
                const btnInRow = 3; // Number of buttons in a row
                const totalPages = Math.ceil(services.length / servicesPerPage);

                if (services.length > 0) {
                    msg = `Here is the list of services:\n\n`;

                    // Calculate start and end indexes for the current page
                    const start = page * servicesPerPage;
                    const end = start + servicesPerPage;

                    // Initialize inline keyboard for displaying services as buttons
                    const keyboard = new InlineKeyboard();
                    // Generate buttons for the current page's services
                    let index = 0;
                    services.slice(start, end).forEach((service) => {
                        const displayName = service.name.length > 12 ? `${service.name.slice(0, 12)}…` : service.name;
                        keyboard.text(displayName, service.id.toString());
                        // Insert a new row after every two buttons
                        if ((++index) % btnInRow === 0) {
                            keyboard.row();
                        }
                    });

                    // Add "Previous" and "Next" buttons for navigation
                    keyboard.row();
                    if (page > 0) {
                        keyboard.text('⬅️ Previous', `page_${page - 1}`);
                    }
                    if (page < totalPages - 1) {
                        keyboard.text('Next ➡️', `page_${page + 1}`);
                    }

                    // Append instructions to the message
                    msg += `Tap a button to view details.`;
                    logger.info(`Displaying page ${page + 1} of services. Total pages: ${totalPages}`);

                    // Update keyboard callback_data, add handler ID to the values
                    hndlCallbackData.updateInlineKeyboard(keyboard, ctx.message);
                    // Send message with the inline keyboard
                    await ctx.reply(msg, {
                        reply_markup: keyboard,
                        parse_mode: 'HTML',
                    });

                    // Register a one-time callback handler for button selection
                    hndlCallbackData.addHandler(async (cbCtx) => {
                        const callbackData = hndlCallbackData.extractData(cbCtx.callbackQuery.data);

                        if (callbackData.startsWith('page_')) {
                            // Handle page navigation
                            const newPage = parseInt(callbackData.split('_')[1], 10);
                            await cbCtx.deleteMessage(); // Remove the previous message to refresh the buttons
                            res(ctx, {page: newPage}).catch(logger.exception); // Call the same handler with updated page
                        } else {
                            if (callbackData) {
                                logger.info(`User selected service ID: ${callbackData}`);

                                // Remove inline buttons by editing the message text
                                await cbCtx.editMessageText(`You have selected service #${callbackData}.`);

                                // Call the read command for the selected service
                                cmdRead(ctx, {serviceId: callbackData}).catch(logger.exception);
                            } else {
                                await cbCtx.reply('Invalid selection. Please try again.');
                            }
                        }
                    }, ctx);
                } else {
                    // Send message if no services were found
                    await ctx.reply(msg, {
                        parse_mode: 'HTML',
                    });
                }
            } catch (error) {
                // Log the error and reply with an error message
                msg = `An error occurred: ${error.toString()}`;
                logger.error(msg);
                await ctx.reply(msg, {
                    parse_mode: 'HTML',
                });
            }
        };
        return res;
    }
}
