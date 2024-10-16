/**
 * Sets up handlers for all bot commands.
 */
export default class Dialog_Back_Bot_Setup_A_HndlCmd {
    /**
     * @param {Dialog_Back_Bot_Cmd_Help} cmdHelp
     * @param {Dialog_Back_Bot_Cmd_Service_Create} cmdServiceCreate
     * @param {Dialog_Back_Bot_Cmd_Service_Delete} cmdServiceDelete
     * @param {Dialog_Back_Bot_Cmd_Service_List} cmdServiceList
     * @param {Dialog_Back_Bot_Cmd_Service_Read} cmdServiceRead
     * @param {Dialog_Back_Bot_Cmd_Service_Update} cmdServiceUpdate
     * @param {Dialog_Back_Bot_Cmd_Settings} cmdSettings
     * @param {Dialog_Back_Bot_Cmd_Start} cmdStart
     * @param {Dialog_Back_Bot_Cmd_Visit_Approve} cmdVisitApprove
     * @param {Dialog_Back_Bot_Cmd_Visit_Decline} cmdVisitDecline
     * @param {Dialog_Back_Bot_Cmd_Visit_Delete} cmdVisitDelete
     * @param {Dialog_Back_Bot_Cmd_Visit_List} cmdVisitList
     * @param {Dialog_Back_Bot_Cmd_Visit_Queue} cmdVisitQueue
     * @param {Dialog_Back_Bot_Cmd_Visit_Service} cmdVisitService
     * @param {typeof Dialog_Back_Bot_Command} CMD
     *
     * @return {function(bot:Bot): void} Returns a function that registers the command handlers with the bot
     */
    constructor(
        {
            Dialog_Back_Bot_Cmd_Help$: cmdHelp,
            Dialog_Back_Bot_Cmd_Service_Create$: cmdServiceCreate,
            Dialog_Back_Bot_Cmd_Service_Delete$: cmdServiceDelete,
            Dialog_Back_Bot_Cmd_Service_List$: cmdServiceList,
            Dialog_Back_Bot_Cmd_Service_Read$: cmdServiceRead,
            Dialog_Back_Bot_Cmd_Service_Update$: cmdServiceUpdate,
            Dialog_Back_Bot_Cmd_Settings$: cmdSettings,
            Dialog_Back_Bot_Cmd_Start$: cmdStart,
            Dialog_Back_Bot_Cmd_Visit_Approve$: cmdVisitApprove,
            Dialog_Back_Bot_Cmd_Visit_Decline$: cmdVisitDecline,
            Dialog_Back_Bot_Cmd_Visit_Delete$: cmdVisitDelete,
            Dialog_Back_Bot_Cmd_Visit_List$: cmdVisitList,
            Dialog_Back_Bot_Cmd_Visit_Queue$: cmdVisitQueue,
            Dialog_Back_Bot_Cmd_Visit_Service$: cmdVisitService,
            Dialog_Back_Bot_Command$: CMD,
        }
    ) {
        return function (bot) {
            bot.command(CMD.HELP, cmdHelp);
            bot.command(CMD.SERVICE_CREATE, cmdServiceCreate);
            bot.command(CMD.SERVICE_DELETE, cmdServiceDelete);
            bot.command(CMD.SERVICE_LIST, cmdServiceList);
            bot.command(CMD.SERVICE_READ, cmdServiceRead);
            bot.command(CMD.SERVICE_UPDATE, cmdServiceUpdate);
            bot.command(CMD.SETTINGS, cmdSettings);
            bot.command(CMD.START, cmdStart);
            bot.command(CMD.VISIT_APPROVE, cmdVisitApprove);
            bot.command(CMD.VISIT_DECLINE, cmdVisitDecline);
            bot.command(CMD.VISIT_DELETE, cmdVisitDelete);
            bot.command(CMD.VISIT_LIST, cmdVisitList);
            bot.command(CMD.VISIT_QUEUE, cmdVisitQueue);
            bot.command(CMD.VISIT_SERVICE, cmdVisitService);
        };
    }
}
