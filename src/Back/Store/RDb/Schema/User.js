/**
 *  Metadata for RDB entity: the user.
 *  @namespace Dialog_Back_Store_RDb_Schema_User
 */
// MODULE'S VARS
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/user';

/**
 * @memberOf Dialog_Back_Store_RDb_Schema_User
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'date_created',
    ID: 'id',
    LANGUAGE: 'language',
    NAME_FIRST: 'name_first',
    NAME_LAST: 'name_last',
    TELEGRAM_ID: 'telegram_id',
    USERNAME: 'username',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Dialog_Back_Store_RDb_Schema_User
 */
class Dto {
    /**
     * @type {Date}
     */
    date_created;
    /**
     * Telegram ID.
     * @type {number}
     */
    id;
    /**
     * @type {string}
     */
    language;
    /**
     * @type {string}
     */
    name_first;
    /**
     * @type {string}
     */
    name_last;
    /**
     * The reference to the user in Telegram.
     * @type {number}
     */
    telegram_id;
    /**
     * User name from Telegram.
     * @type {string}
     */
    username;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Dialog_Back_Store_RDb_Schema_User {
    /**
     * @param {Dialog_Back_Defaults} DEF
     * @param {TeqFw_Db_Back_RDb_Schema_EntityBase} base
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            Dialog_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Dialog_Back_Store_RDb_Schema_User.Dto} [data]
         * @return {Dialog_Back_Store_RDb_Schema_User.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date_created = cast.date(data?.date_created);
            res.id = cast.int(data?.id);
            res.language = cast.string(data?.language);
            res.name_first = cast.string(data?.name_first);
            res.name_last = cast.string(data?.name_last);
            res.telegram_id = cast.int(data?.telegram_id);
            res.username = cast.string(data?.username);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Dialog_Back_Store_RDb_Schema_User.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(this,
            `${DEF.NAME}${ENTITY}`,
            ATTR,
            [ATTR.ID],
            Dto
        );
    }
}

