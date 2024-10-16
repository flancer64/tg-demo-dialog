/**
 * The user data structure.
 */

// MODULE'S CLASSES
/**
 * @memberOf Dialog_Back_Dto_User
 */
class Dto {
    /**
     * Telegram user ID.
     * @type {number}
     */
    id;

    /**
     * Application user role (Customer | Vendor).
     * @type {string}
     * @see Dialog_Back_Enum_User_Role
     */
    role;

    /**
     * Telegram username.
     * @type {string}
     */
    username;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Dialog_Back_Dto_User {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {typeof Dialog_Back_Enum_User_Role} ROLE
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Dialog_Back_Enum_User_Role$: ROLE,
        }
    ) {
        // INSTANCE METHODS
        /**
         * Create a new DTO and populate it with initialization data.
         * @param {Dialog_Back_Dto_User.Dto} [data]
         * @return {Dialog_Back_Dto_User.Dto}
         */
        this.createDto = function (data) {
            // Create new DTO and populate with initial data
            const res = Object.assign(new Dto(), data);

            // Cast known attributes
            res.id = cast.int(data?.id);
            res.role = cast.enum(data?.role, ROLE);
            res.username = cast.string(data?.username);

            return res;
        };
    }
}
