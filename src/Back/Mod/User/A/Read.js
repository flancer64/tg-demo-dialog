/**
 * Read user data from RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Dialog_Back_Mod_User_A_Read {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Dialog_Back_Store_RDb_Schema_User} rdbUser
     * @param {Dialog_Back_Store_RDb_Schema_User_Role} rdbUserRole
     */
    constructor(
        {
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Dialog_Back_Store_RDb_Schema_User$: rdbUser,
            Dialog_Back_Store_RDb_Schema_User_Role$: rdbUserRole,
        }
    ) {
        // VARS
        const A_USER = rdbUser.getAttributes();
        const A_ROLE = rdbUserRole.getAttributes();

        // MAIN
        /**
         * The structure of the returned value.
         * @typedef {Object} ActResult
         * @property {Dialog_Back_Store_RDb_Schema_User.Dto} [dbUser]
         * @property {Dialog_Back_Store_RDb_Schema_User_Role.Dto} [dbUserRole]
         * @memberof Dialog_Back_Mod_User_A_Read
         */

        /**
         * @param {Object} params - User data
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         * @param {number} [params.id]
         * @param {number} [params.telegramId]
         *
         * @return {Promise<ActResult>}
         */
        this.act = async function ({trx, id, telegramId}) {
            const key = (id) ?? {[A_USER.TELEGRAM_ID]: telegramId};
            /** @type {Dialog_Back_Store_RDb_Schema_User.Dto} */
            const dbUser = await crud.readOne(trx, rdbUser, key);
            /** @type {Dialog_Back_Store_RDb_Schema_User_Role.Dto} */
            const dbUserRole = dbUser?.id ? await crud.readOne(trx, rdbUserRole, dbUser?.id) : null;
            return {dbUser, dbUserRole};
        };
    }

}