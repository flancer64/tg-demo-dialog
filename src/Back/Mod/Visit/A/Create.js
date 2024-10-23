/**
 * Create new visit to a service in RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Dialog_Back_Mod_Visit_A_Create {
    /**
     * @param {TeqFw_Db_Back_Util.dateUtc|function} dateUtc
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Dialog_Back_Store_RDb_Schema_Visit} rdbVisit
     * @param {typeof Dialog_Back_Enum_Visit_Status} STATUS
     */
    constructor(
        {
            'TeqFw_Db_Back_Util.dateUtc': dateUtc,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Dialog_Back_Store_RDb_Schema_Visit$: rdbVisit,
            Dialog_Back_Enum_Visit_Status$: STATUS,
        }
    ) {
        // VARS
        const A_VISIT = rdbVisit.getAttributes();

        // MAIN
        /**
         * @param {Object} params
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         * @param {Dialog_Back_Store_RDb_Schema_Visit.Dto} params.dbVisit
         * @param {Dialog_Back_Store_RDb_Schema_Service.Dto} [params.dbService]
         * @param {Dialog_Back_Store_RDb_Schema_User.Dto} [params.dbUser]
         *
         * @return {Promise<number>} - ID of the created service
         */
        this.act = async function ({trx, dbVisit, dbService, dbUser}) {
            if (dbService) dbVisit.service_ref = dbService.id;
            if (dbUser) dbVisit.user_ref = dbUser.id;
            if (!dbVisit.status) dbVisit.status = STATUS.PENDING;
            dbVisit.date_visit = dateUtc(dbVisit.date_visit);
            const {[A_VISIT.ID]: id} = await crud.create(trx, rdbVisit, dbVisit);
            return id;
        };
    }
}
