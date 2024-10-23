/**
 *  DTO and Metadata for RDB entity: the visit.
 *  @namespace Dialog_Back_Store_RDb_Schema_Visit
 */
// MODULE'S VARS
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/visit';

/**
 * @memberOf Dialog_Back_Store_RDb_Schema_Visit
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'date_created',
    DATE_UPDATED: 'date_updated',
    DATE_VISIT: 'date_visit',
    ID: 'id',
    SERVICE_REF: 'service_ref',
    STATUS: 'status',
    USER_REF: 'user_ref',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Dialog_Back_Store_RDb_Schema_Visit
 */
class Dto {
    /**
     * Visit creation date.
     * @type {Date}
     */
    date_created;

    /**
     * Last update date for the visit.
     * @type {Date}
     */
    date_updated;

    /**
     * Date and time of the visit.
     * @type {Date}
     */
    date_visit;

    /**
     * Visit ID.
     * @type {number}
     */
    id;

    /**
     * Reference to the service that was visited.
     * @type {number}
     */
    service_ref;

    /**
     * Status of the visit.
     * @type {string}
     * @see Dialog_Back_Enum_Visit_Status
     */
    status;

    /**
     * Reference to the user who made the visit.
     * @type {number}
     */
    user_ref;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Dialog_Back_Store_RDb_Schema_Visit {
    /**
     * @param {Dialog_Back_Defaults} DEF
     * @param {TeqFw_Db_Back_RDb_Schema_EntityBase} base
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {typeof Dialog_Back_Enum_Visit_Status} STATUS
     */
    constructor(
        {
            Dialog_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
            TeqFw_Core_Shared_Util_Cast$: cast,
            Dialog_Back_Enum_Visit_Status$: STATUS,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Dialog_Back_Store_RDb_Schema_Visit.Dto} [data]
         * @return {Dialog_Back_Store_RDb_Schema_Visit.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date_created = cast.date(data?.date_created);
            res.date_updated = cast.date(data?.date_updated);
            res.date_visit = cast.date(data?.date_visit);
            res.id = cast.int(data?.id);
            res.service_ref = cast.int(data?.service_ref);
            res.status = cast.enum(data?.status, STATUS);
            res.user_ref = cast.int(data?.user_ref);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Dialog_Back_Store_RDb_Schema_Visit.ATTR}
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
