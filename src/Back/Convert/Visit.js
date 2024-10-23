/**
 * Convert shared DTO from/to other related DTOs (RDB, ...).
 * @implements Dialog_Back_Api_Convert
 */
export default class Dialog_Back_Convert_Visit {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Dialog_Back_Dto_Visit} shared
     * @param {Dialog_Back_Store_RDb_Schema_Visit} rdbVisit
     * @param {typeof Dialog_Back_Enum_Visit_Status} STATUS
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Dialog_Back_Dto_Visit$: shared,
            Dialog_Back_Store_RDb_Schema_Visit$: rdbVisit,
            Dialog_Back_Enum_Visit_Status$: STATUS,
        }
    ) {
        // INSTANCE METHODS

        /**
         * Convert Persistence DTO (RDB) to Domain DTO (Shared).
         * @param {Dialog_Back_Store_RDb_Schema_Visit.Dto} dbVisit
         * @param {Dialog_Back_Store_RDb_Schema_User.Dto} dbCustomer
         * @param {Dialog_Back_Store_RDb_Schema_Service.Dto} dbService
         * @param {Dialog_Back_Store_RDb_Schema_User.Dto} dbVendor
         * @returns {Dialog_Back_Dto_Visit.Dto}
         */
        this.rdb2share = function ({dbVisit, dbCustomer, dbService, dbVendor}) {
            const res = shared.createDto();
            res.customerName = cast.string(dbCustomer?.name_first + ' ' + dbCustomer?.name_last);
            res.customerRef = cast.int(dbVisit?.user_ref);
            res.dateCreated = cast.date(dbVisit?.date_created);
            res.dateUpdated = cast.date(dbVisit?.date_updated);
            res.dateVisit = cast.date(dbVisit?.date_visit);
            res.id = cast.int(dbVisit?.id);
            res.serviceDuration = cast.int(dbService?.duration);
            res.serviceName = cast.string(dbService?.name);
            res.serviceRef = cast.int(dbVisit?.service_ref);
            res.status = cast.enum(dbVisit?.status, STATUS);
            res.vendorName = cast.string(dbVendor?.name_first + ' ' + dbVendor?.name_last);
            res.vendorRef = cast.int(dbService?.user_ref);
            return res;
        };

        /**
         * The structure of the returned value.
         * @typedef {Object} Share2RdbResult
         * @property {Dialog_Back_Store_RDb_Schema_Visit.Dto} dbVisit
         * @memberof Dialog_Back_Convert_Visit
         */

        /**
         * Convert Domain DTO (Shared) to Persistence DTO (RDB).
         * @param {Dialog_Back_Dto_Visit.Dto} visit
         * @return {Share2RdbResult}
         */
        this.share2rdb = function ({visit}) {
            const dbVisit = rdbVisit.createDto();
            dbVisit.date_created = cast.date(visit?.dateCreated);
            dbVisit.date_updated = cast.date(visit?.dateUpdated);
            dbVisit.date_visit = cast.date(visit?.dateVisit);
            dbVisit.id = cast.int(visit?.id);
            dbVisit.service_ref = cast.int(visit?.serviceRef);
            dbVisit.status = cast.enum(visit?.status, STATUS);
            dbVisit.user_ref = cast.int(visit?.customerRef);
            return {dbVisit};
        };
    }
}
