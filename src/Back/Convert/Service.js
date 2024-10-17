/**
 * Convert shared DTO from/to other related DTOs (RDB, ...).
 * @implements Dialog_Back_Api_Convert
 */
export default class Dialog_Back_Convert_Service {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Dialog_Back_Dto_Service} shared
     * @param {Dialog_Back_Store_RDb_Schema_Service} rdbService
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Dialog_Back_Dto_Service$: shared,
            Dialog_Back_Store_RDb_Schema_Service$: rdbService,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {Dialog_Back_Store_RDb_Schema_Service.Dto} dbService
         * @returns {Dialog_Back_Dto_Service.Dto}
         */
        this.rdb2share = function ({dbService}) {
            const res = shared.createDto();
            res.address = cast.string(dbService?.address);
            res.dateCreated = cast.date(dbService?.date_created);
            res.dateUpdated = cast.date(dbService?.date_updated);
            res.description = cast.string(dbService?.description);
            res.duration = cast.int(dbService?.duration);
            res.id = cast.int(dbService?.id);
            res.name = cast.string(dbService?.name);
            res.userId = cast.int(dbService?.user_ref);
            return res;
        };

        /**
         * The structure of the returned value.
         * @typedef {Object} Share2RdbResult
         * @property {Dialog_Back_Store_RDb_Schema_Service.Dto} dbService
         * @memberof Dialog_Back_Convert_Service
         */

        /**
         * @param {Object} params
         * @param {Dialog_Back_Dto_Service.Dto} params.service
         * @return {Share2RdbResult}
         */
        this.share2rdb = function ({service}) {
            const dbService = rdbService.createDto();
            dbService.address = cast.string(service?.address);
            dbService.date_created = cast.date(service?.dateCreated);
            dbService.date_updated = cast.date(service?.dateUpdated);
            dbService.description = cast.string(service?.description);
            dbService.duration = cast.int(service?.duration);
            dbService.id = cast.int(service?.id);
            dbService.name = cast.string(service?.name);
            dbService.user_ref = cast.int(service?.userId);
            return {dbService};
        };
    }
}
