/**
 *  DTO and Metadata for RDB entity: the user's role.
 *  @namespace Dialog_Back_Store_RDb_Schema_User_Role
 */
// MODULE'S VARS
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/user/role';

/**
 * @memberOf Dialog_Back_Store_RDb_Schema_User_Role
 * @type {Object}
 */
const ATTR = {
    DATE_UPDATED: 'date_updated',
    ROLE: 'role',
    USER_REF: 'user_ref',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Dialog_Back_Store_RDb_Schema_User_Role
 */
class Dto {
    /**
     * @type {Date}
     */
    date_updated;
    /**
     * @type {string}
     * @see Dialog_Back_Enum_User_Role
     */
    role;
    /**
     * @type {number}
     */
    user_ref;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Dialog_Back_Store_RDb_Schema_User_Role {
    /**
     * @param {Dialog_Back_Defaults} DEF
     * @param {TeqFw_Db_Back_RDb_Schema_EntityBase} base
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {typeof Dialog_Back_Enum_User_Role} ROLE
     */
    constructor(
        {
            Dialog_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
            TeqFw_Core_Shared_Util_Cast$: cast,
            Dialog_Back_Enum_User_Role$: ROLE,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Dialog_Back_Store_RDb_Schema_User_Role.Dto} [data]
         * @return {Dialog_Back_Store_RDb_Schema_User_Role.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date_created = cast.date(data?.date_created);
            res.role = cast.enum(data?.role, ROLE);
            res.user_ref = cast.int(data?.user_ref);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Dialog_Back_Store_RDb_Schema_User_Role.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(this,
            `${DEF.NAME}${ENTITY}`,
            ATTR,
            [ATTR.USER_REF],
            Dto
        );
    }
}

