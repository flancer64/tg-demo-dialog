/**
 * The handler for 'help' command.
 */
export default class Dialog_Back_Bot_Cmd_Help {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger - logger instance
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Dialog_Back_Mod_User} modUser
     * @param {typeof Dialog_Back_Enum_User_Role} ROLE
     *
     * @return {Telegram_Bot_Back_Api_Handler}
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Core_Shared_Util_Cast$: cast,
            Dialog_Back_Mod_User$: modUser,
            Dialog_Back_Enum_User_Role$: ROLE,
        }
    ) {
        /**
         * @type {Telegram_Bot_Back_Api_Handler}
         * @param {Object} ctx
         * @param {Object} [opts]
         * @param {string} opts.lang
         * @param {string} opts.role
         */
        const res = async (ctx, {lang, role} = {}) => {
            // FUNCS
            async function loadRole(telegramId) {
                const user = await modUser.read({telegramId});
                return user.role;
            }

            // MAIN
            const {id: telegramId, username, language_code} = ctx.from;
            const msgRole = cast.enum(role, ROLE) ?? await loadRole(telegramId);
            const msgLang = lang ?? language_code;

            logger.info(`Make message for user ${telegramId} (@${username}).`);

            // Messages for Customer (Client) role
            const msgDefCust = `
Welcome to the booking bot @${username}! 

Your current role is '${msgRole}'. Here are your available commands:

<b>/help</b> — This help.
<b>/set_mode</b> — Select your role (Customer or Vendor).

<b>/service_list</b> — View all available services.
<b>/service_read</b> — Get information about a specific service.
<b>/visit_service</b> — Schedule a visit to a selected service.
<b>/visit_list</b> — View your booked visits.
<b>/visit_delete</b> — Cancel a booked visit.
`;
            const msgRuCust = `
Добро пожаловать в бот для записи на обслуживание, @${username}! 

Ваша текущая роль - '${msgRole}'. Вот доступные команды:

<b>/help</b> — Текущая справка.
<b>/set_mode</b> — Выбор роли (Клиент или Поставщик).

<b>/service_list</b> — Просмотреть все доступные сервисы.
<b>/service_read</b> — Получить информацию о конкретном сервисе.
<b>/visit_service</b> — Записаться на выбранный сервис.
<b>/visit_list</b> — Просмотреть свои записи на визиты.
<b>/visit_delete</b> — Отменить запись на визит.
`;

            // Messages for Vendor role
            const msgDefVend = `
Welcome to the booking bot @${username}! 

Your current role is '${msgRole}'. Here are your available commands:

<b>/help</b> — This help.
<b>/set_mode</b> — Select your role (Customer or Vendor).

<b>/service_create</b> — Create a new service.
<b>/service_read</b> — View information about a specific service.
<b>/service_update</b> — Update a service's information.
<b>/service_delete</b> — Delete a service.
<b>/service_list</b> — List all services you have created.

<b>/visit_list</b> — View all scheduled visits for your services.
<b>/visit_queue</b> — View the queue of pending visit requests.
<b>/visit_approve</b> — Approve a client's visit request.
<b>/visit_decline</b> — Decline a client's visit request.
`;
            const msgRuVend = `
Добро пожаловать в бот для записи на обслуживание, @${username}! 

Ваша текущая роль - '${msgRole}'. Вот доступные команды:

<b>/help</b> — Текущая справка.
<b>/set_mode</b> — Выбор роли (Клиент или Поставщик).

<b>/service_create</b> — Создать новый сервис.
<b>/service_read</b> — Просмотреть информацию о конкретном сервисе.
<b>/service_update</b> — Обновить информацию о сервисе.
<b>/service_delete</b> — Удалить сервис.
<b>/service_list</b> — Просмотреть все созданные вами сервисы.

<b>/visit_list</b> — Просмотреть все запланированные визиты на ваши услуги.
<b>/visit_queue</b> — Просмотреть очередь заявок на визиты.
<b>/visit_approve</b> — Подтвердить заявку клиента на визит.
<b>/visit_decline</b> — Отклонить заявку клиента на визит.
`;

            // Select message based on role and language
            const msg = (msgRole === ROLE.CUSTOMER)
                ? (msgLang === 'ru' ? msgRuCust : msgDefCust)
                : (msgLang === 'ru' ? msgRuVend : msgDefVend);

            // Send message
            await ctx.reply(msg, {
                parse_mode: 'HTML',
            });
        };

        return res;
    }
}
