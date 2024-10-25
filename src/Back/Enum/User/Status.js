/**
 * The codifier for user statuses.
 */
const Dialog_Back_Enum_User_Status = Object.freeze({
    ACTIVE: 'ACTIVE',      // User is actively interacting with the bot.
    INACTIVE: 'INACTIVE',  // User has blocked the bot or is temporarily inactive.
    BLOCKED: 'BLOCKED',    // Bot has blocked the user and stopped further interactions.
});

export default Dialog_Back_Enum_User_Status;
