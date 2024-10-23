/**
 * The data structure of a visit list item for Business Logic (Domain DTO).
 */
// MODULE'S VARS
/**
 * @memberOf Dialog_Back_Dto_Visit_Item
 */
const ATTR = {
    DATE_CREATED: 'dateCreated',
    DATE_UPDATED: 'dateUpdated',
    DATE_VISIT: 'dateVisit',
    ID: 'id',
    SERVICE_NAME: 'serviceName',
    SERVICE_REF: 'serviceRef',
    STATUS: 'status',
    USER_NAME: 'userName',
    USER_REF: 'userRef',
};

// MODULE'S CLASSES
/**
 * @memberOf Dialog_Back_Dto_Visit_Item
 */
class Dto {
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

    /**
     * @type {string}
     */
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

    /**
     * @type {string}
     */
    userName;

    /**
     * Reference to the user who made the visit.
     * @type {number}
     */
    userRef;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_Meta
 */
export default class Dialog_Back_Dto_Visit_Item {
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
         * @param {Dialog_Back_Dto_Visit_Item.Dto} [data]
         * @return {Dialog_Back_Dto_Visit_Item.Dto}
         */
        this.createDto = function (data) {
            // Create new DTO and populate with initial data
            const res = Object.assign(new Dto(), data);

            // Cast known attributes
            res.dateCreated = cast.date(data?.dateCreated);
            res.dateUpdated = cast.date(data?.dateUpdated);
            res.dateVisit = cast.date(data?.dateVisit);
            res.id = cast.int(data?.id);
            res.serviceName = cast.string(data?.serviceName);
            res.serviceRef = cast.int(data?.serviceRef);
            res.status = cast.enum(data?.status, STATUS);
            res.userName = cast.string(data?.userName);
            res.userRef = cast.int(data?.userRef);

            return res;
        };

        this.getAttributes = () => ATTR;
    }
}
