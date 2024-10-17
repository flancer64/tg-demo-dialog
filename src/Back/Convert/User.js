/**
 * Convert shared DTO from/to other related DTOs (RDB, ...).
 * @implements Dialog_Back_Api_Convert
 */
export default class Dialog_Back_Convert_User {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Dialog_Back_Dto_User} shared
     * @param {Dialog_Back_Store_RDb_Schema_User} rdbUser
     * @param {Dialog_Back_Store_RDb_Schema_User_Role} rdbUserRole
     * @param {typeof Dialog_Back_Enum_User_Role} ROLE
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Dialog_Back_Dto_User$: shared,
            Dialog_Back_Store_RDb_Schema_User$: rdbUser,
            Dialog_Back_Store_RDb_Schema_User_Role$: rdbUserRole,
            Dialog_Back_Enum_User_Role$: ROLE,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {Dialog_Back_Store_RDb_Schema_User.Dto} dbUser
         * @param {Dialog_Back_Store_RDb_Schema_User_Role.Dto} dbUserRole
         * @returns {Dialog_Back_Dto_User.Dto}
         */
        this.rdb2share = function ({dbUser, dbUserRole}) {
            const res = shared.createDto();
            res.id = cast.int(dbUser?.id);
            res.lang = cast.string(dbUser?.language);
            res.nameFirst = cast.string(dbUser?.name_first);
            res.nameLast = cast.string(dbUser?.name_last);
            res.role = cast.enum(dbUserRole?.role, ROLE);
            res.telegramId = cast.int(dbUser?.telegram_id);
            res.username = cast.string(dbUser?.username);
            return res;
        };

        /**
         * The structure of the returned value.
         * @typedef {Object} Share2RdbResult
         * @property {Dialog_Back_Store_RDb_Schema_User.Dto} dbUser
         * @property {Dialog_Back_Store_RDb_Schema_User_Role.Dto} dbUserRole
         * @memberof Dialog_Back_Convert_User
         */

        /**
         * @param {Dialog_Back_Dto_User.Dto} user
         * @return {Share2RdbResult}
         */
        this.share2rdb = function ({user}) {
            const dbUser = rdbUser.createDto();
            const dbUserRole = rdbUserRole.createDto();
            dbUser.id = cast.int(user?.id);
            dbUser.language = cast.string(user?.lang);
            dbUser.name_first = cast.string(user?.nameFirst);
            dbUser.name_last = cast.string(user?.nameLast);
            dbUser.telegram_id = cast.int(user?.telegramId);
            dbUser.username = cast.string(user?.username);
            dbUserRole.role = cast.enum(user?.role, ROLE);
            return {dbUser, dbUserRole};
        };
    }
}
