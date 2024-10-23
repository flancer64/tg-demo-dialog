/**
 * Development tests for a query.
 */
import assert from 'assert';
import {config as cfgTest, container} from '@teqfw/test';
import {describe, it} from 'mocha';

// SETUP ENV

/** @type {TeqFw_Core_Back_Config} */
const config = await container.get('TeqFw_Core_Back_Config$');
config.init(cfgTest.pathToRoot, 'test');
const cfgDb = config.getLocal('@teqfw/db');

/**
 * Framework wide RDB connection from DI. This connection is used by event listeners.
 * @type {TeqFw_Db_Back_RDb_Connect}
 */
const connFw = await container.get('TeqFw_Db_Back_RDb_IConnect$');
/** @type {TeqFw_Core_Back_Mod_App_Uuid} */
const modBackUuid = await container.get('TeqFw_Core_Back_Mod_App_Uuid$');
await modBackUuid.init();

// GET OBJECT FROM CONTAINER AND RUN TESTS
/** @type {Dialog_Back_Mod_Visit_A_List_A_Query} */
const query = await container.get('Dialog_Back_Mod_Visit_A_List_A_Query$');


describe('Dialog_Back_Mod_Visit_A_List_A_Query_A_List_A_Query', function () {
    it('can be instantiated', async () => {
        assert(typeof query === 'object');
    });

    it('can build query', async () => {
        await connFw.init(cfgDb);
        try {
            const trx = await connFw.startTransaction();
            try {
                const q = query.build(trx);
                assert(q);
            } finally {
                await trx.rollback();
            }
        } finally {
            await connFw.disconnect();
        }
    });

});

