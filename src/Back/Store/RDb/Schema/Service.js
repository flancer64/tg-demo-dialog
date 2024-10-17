/**
 *  DTO and Metadata for RDB entity: the service.
 *  @namespace Dialog_Back_Store_RDb_Schema_Service
 */
// MODULE'S VARS
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/service';

/**
 * @memberOf Dialog_Back_Store_RDb_Schema_Service
 * @type {Object}
 */
const ATTR = {
    ADDRESS: 'address',
    DATE_CREATED: 'date_created',
    DATE_UPDATED: 'date_updated',
    DESCRIPTION: 'description',
    DURATION: 'duration',
    ID: 'id',
    NAME: 'name',
    USER_REF: 'user_ref',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Dialog_Back_Store_RDb_Schema_Service
 */
class Dto {
    /**
     * @type {string|null}
     */
    address = null; // nullable
    /**
     * @type {Date}
     */
    date_created;
    /**
     * @type {Date}
     */
    date_updated;
    /**
     * @type {string}
     */
    description;
    /**
     * @type {number}
     */
    duration;
    /**
     * @type {number}
     */
    id;
    /**
     * @type {string}
     */
    name;
    /**
     * The reference to the vendor who created the service.
     * @type {number}
     */
    user_ref;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Dialog_Back_Store_RDb_Schema_Service {
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
         * @param {Dialog_Back_Store_RDb_Schema_Service.Dto} [data]
         * @return {Dialog_Back_Store_RDb_Schema_Service.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.address = cast.string(data?.address);
            res.date_created = cast.date(data?.date_created);
            res.date_updated = cast.date(data?.date_updated);
            res.description = cast.string(data?.description);
            res.duration = cast.int(data?.duration);
            res.id = cast.int(data?.id);
            res.name = cast.string(data?.name);
            res.user_ref = cast.int(data?.user_ref);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Dialog_Back_Store_RDb_Schema_Service.ATTR}
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
