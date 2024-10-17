/**
 * The service data structure.
 */

// MODULE'S CLASSES
/**
 * @memberOf Dialog_Back_Dto_Service
 */
class Dto {
    /**
     * Service ID.
     * @type {number}
     */
    id;

    /**
     * Service name.
     * @type {string}
     */
    name;

    /**
     * Service description.
     * @type {string}
     */
    description;

    /**
     * Service duration (in minutes).
     * @type {number}
     */
    duration;

    /**
     * Service address.
     * @type {string}
     */
    address;

    /**
     * Vendor ID (who created the service).
     * @type {number}
     */
    vendorId;

    /**
     * Service creation date.
     * @type {Date}
     */
    createdAt;

    /**
     * Last update date for the service.
     * @type {Date}
     */
    updatedAt;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Dialog_Back_Dto_Service {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * Create a new DTO and populate it with initialization data.
         * @param {Dialog_Back_Dto_Service.Dto} [data]
         * @return {Dialog_Back_Dto_Service.Dto}
         */
        this.createDto = function (data) {
            // Create new DTO and populate with initial data
            const res = Object.assign(new Dto(), data);

            // Cast known attributes
            res.id = cast.int(data?.id);
            res.name = cast.string(data?.name);
            res.description = cast.string(data?.description);
            res.duration = cast.int(data?.duration);
            res.address = cast.string(data?.address);
            res.vendorId = cast.int(data?.vendorId);
            res.createdAt = cast.date(data?.createdAt);
            res.updatedAt = cast.date(data?.updatedAt);

            return res;
        };
    }
}

