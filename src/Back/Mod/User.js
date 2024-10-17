/**
 * The model for User to manipulate with data in storages.
 *
 * @implements TeqFw_Core_Shared_Api_Model
 */
export default class Dialog_Back_Mod_User {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {Dialog_Back_Dto_User} dtoUser
     * @param {Dialog_Back_Convert_User} convUser
     * @param {Dialog_Back_Mod_User_A_Create} aCreate
     * @param {Dialog_Back_Mod_User_A_Read} aRead
     * @param {Dialog_Back_Mod_User_A_Update} aUpdate
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            Dialog_Back_Dto_User$: dtoUser,
            Dialog_Back_Convert_User$: convUser,
            Dialog_Back_Mod_User_A_Create$: aCreate,
            Dialog_Back_Mod_User_A_Read$: aRead,
            Dialog_Back_Mod_User_A_Update$: aUpdate,
        }
    ) {
        /**
         * @type {function(Dialog_Back_Dto_User.Dto=): Dialog_Back_Dto_User.Dto}
         */
        this.composeEntity = dtoUser.createDto;

        /**
         * @type {function(Dialog_Back_Dto_User.Dto=): Dialog_Back_Dto_User.Dto}
         */
        this.composeItem = dtoUser.createDto;

        /**
         * Create a new user
         * @param {Object} params
         * @param {Dialog_Back_Dto_User.Dto} params.dto
         * @returns {Promise<Dialog_Back_Dto_User.Dto>}
         */
        this.create = async function ({dto}) {
            let res;
            const trx = await conn.startTransaction();
            try {
                const {dbUser, dbUserRole} = convUser.share2rdb({user: dto});
                const id = await aCreate.act({trx, dbUser, dbUserRole});
                {
                    const {dbUser, dbUserRole} = await aRead.act({trx, id});
                    res = convUser.rdb2share({dbUser, dbUserRole});
                }
                // Create new user in the store
                logger.info(`User ${res.username} created successfully (id:${dbUser.telegram_id}).`);
                await trx.commit();
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error creating user: ${error.message}`);
                throw error;
            }
        };

        /**
         * Read user data by ID
         * @param {Object} params - User data
         * @param {number} [params.id] - User ID
         * @param {number} [params.telegramId] - User ID
         * @returns {Promise<Dialog_Back_Dto_User.Dto>} - User DTO or null if not found
         */
        this.read = async function ({id, telegramId}) {
            let res;
            const trx = await conn.startTransaction();
            try {
                const {dbUser, dbUserRole} = await aRead.act({trx, id, telegramId});
                await trx.commit();
                if (dbUser && dbUserRole) {
                    res = convUser.rdb2share({dbUser, dbUserRole});
                    logger.info(`User ${res.username} read successfully (id:${res.telegramId}).`);
                } else {
                    logger.info(`User with ID ${telegramId} not found.`);
                }
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error reading user: ${error.message}`);
                throw error;
            }
        };

        /**
         * Update user data
         * @param {Object} params
         * @param {Dialog_Back_Dto_User.Dto} params.dto
         * @returns {Promise<Dialog_Back_Dto_User.Dto>} - Updated user DTO or null if not found
         */
        this.update = async function ({dto}) {
            let res;
            const trx = await conn.startTransaction();
            try {
                // find a user to update
                const {dbUser, dbUserRole} = await aRead.act({trx, telegramId: dto?.telegramId});
                if (dbUser && dbUserRole) {
                    // only role can be updated if found
                    if (dbUserRole.role !== dto.role) {
                        dbUserRole.role = dto.role;
                        await aUpdate.act({trx, dbUserRole});
                        logger.info(`User ${dbUser.username} updated successfully (id:${dbUser.telegram_id}).`);
                    }
                } else {
                    logger.info(`User with ID ${dto.telegramId} not found.`);
                }
                await trx.commit();
                res = convUser.rdb2share({dbUser, dbUserRole});
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error updating user: ${error.message}`);
                throw error;
            }
        };

    }
}
