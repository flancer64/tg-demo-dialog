/**
 * Create new user in RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Dialog_Back_Mod_User_A_Create {
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
         * @param {Object} params - User data
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         * @param {Dialog_Back_Store_RDb_Schema_User.Dto} params.dbUser
         * @param {Dialog_Back_Store_RDb_Schema_User_Role.Dto} params.dbUserRole
         *
         * @return {Promise<number>}
         */
        this.act = async function ({trx, dbUser, dbUserRole}) {
            const {[A_USER.ID]: id} = await crud.create(trx, rdbUser, dbUser);
            dbUserRole.user_ref = id;
            await crud.create(trx, rdbUserRole, dbUserRole);
            return id;
        };
    }

}