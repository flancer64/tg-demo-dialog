/**
 * The visit data structure for Business Logic (Domain DTO).
 */

// MODULE'S CLASSES
/**
 * @memberOf Dialog_Back_Dto_Visit
 */
class Dto {
    /** @type {string} */
    customerName;
    /**
     * Reference to the user who made the visit.
     * @type {number}
     */
    customerRef;

    /**
     * Visit creation date.
     * @type {Date}
     */
    dateCreated;

    /**
     * Last update date for the visit.
     * @type {Date}
     */
    dateUpdated;

    /**
     * Date and time of the visit.
     * @type {Date}
     */
    dateVisit;
    /**
     * Visit ID.
     * @type {number}
     */
    id;

    /** @type {number} */
    serviceDuration;

    /** @type {string} */
    serviceName;

    /**
     * Reference to the service that was visited.
     * @type {number}
     */
    serviceRef;
    /**
     * Status of the visit.
     * @type {string}
     * @see Dialog_Back_Enum_Visit_Status
     */
    status;

    /** @type {string} */
    vendorName;

    /** @type {number} */
    vendorRef;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Dialog_Back_Dto_Visit {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {typeof Dialog_Back_Enum_Visit_Status} STATUS
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Dialog_Back_Enum_Visit_Status$: STATUS,
        }
    ) {
        // INSTANCE METHODS
        /**
         * Create a new DTO and populate it with initialization data.
         * @param {Dialog_Back_Dto_Visit.Dto} [data]
         * @return {Dialog_Back_Dto_Visit.Dto}
         */
        this.createDto = function (data) {
            // Create new DTO and populate with initial data
            const res = Object.assign(new Dto(), data);

            // Cast known attributes
            res.customerName = cast.string(data?.customerName);
            res.customerRef = cast.int(data?.customerRef);
            res.dateCreated = cast.date(data?.dateCreated);
            res.dateUpdated = cast.date(data?.dateUpdated);
            res.dateVisit = cast.date(data?.dateVisit);
            res.id = cast.int(data?.id);
            res.serviceDuration = cast.int(data?.serviceDuration);
            res.serviceName = cast.string(data?.serviceName);
            res.serviceRef = cast.int(data?.serviceRef);
            res.status = cast.enum(data?.status, STATUS);
            res.vendorName = cast.string(data?.vendorName);
            res.vendorRef = cast.int(data?.vendorRef);

            return res;
        };
    }
}
