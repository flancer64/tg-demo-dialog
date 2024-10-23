/**
 * Development tests for a model.
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
/** @type {Dialog_Back_Mod_Visit} */
const mod = await container.get('Dialog_Back_Mod_Visit$');
/** @type {typeof Dialog_Back_Enum_Visit_Status} */
const STATUS = await container.get('Dialog_Back_Enum_Visit_Status$');


describe('Dialog_Back_Mod_Visit', function () {
    it('can be instantiated', async () => {
        assert(typeof mod === 'object');
    });

    describe('can compose DTOs:', function () {

        it('the entity DTO', async () => {
            const dto = mod.composeEntity();
            assert(Object.keys(dto).length > 0);
        });

        it('the list item DTO', async () => {
            const dto = mod.composeItem();
            assert(Object.keys(dto).length > 0);
        });

    });

    describe('implements CRUDL:', function () {
        let entityId;

        it('can create an entity', async () => {
            await connFw.init(cfgDb);
            try {
                const dto = mod.composeEntity();
                dto.serviceRef = 1;
                dto.customerRef = 1;
                dto.dateVisit = new Date();

                const created = await mod.create({dto});
                assert(created.id);
                entityId = created.id;
            } finally {
                await connFw.disconnect();
            }
        });

        it('can read an entity', async () => {
            await connFw.init(cfgDb);
            try {
                const found = await mod.read({id: entityId});
                assert(found.id);
            } finally {
                await connFw.disconnect();
            }
        });

        it('can list entities', async () => {
            await connFw.init(cfgDb);
            try {
                const found = await mod.list();
                assert(found.length);
            } finally {
                await connFw.disconnect();
            }
        });
    });

});

