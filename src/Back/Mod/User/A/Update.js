/**
 * Update existing user in RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Dialog_Back_Mod_User_A_Update {
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
        /**
         * @param {Object} params
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         * @param {Dialog_Back_Store_RDb_Schema_User.Dto} [params.dbUser]
         * @param {Dialog_Back_Store_RDb_Schema_User_Role.Dto} params.dbUserRole
         *
         * @return {Promise<void>}
         */
        this.act = async function ({trx, dbUser, dbUserRole}) {
            if (dbUser) await crud.updateOne(trx, rdbUser, dbUser);
            await crud.updateOne(trx, rdbUserRole, dbUserRole);
        };
    }

}