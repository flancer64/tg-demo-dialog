export default class Dialog_Back_Util_Format {
    /**
     * Convert local date to YYYY/MM/DD HH:MM:SS.
     * @param {Date|string|null} dateIn
     * @param {boolean} withSeconds
     * @return {string}
     */
    dateTime(dateIn = null, withSeconds = true) {
        /** @type {Date} */
        const date = (dateIn) ?
            (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
            new Date();
        const y = date.getFullYear();
        const m = `${date.getMonth() + 1}`.padStart(2, '0');
        const d = `${date.getDate()}`.padStart(2, '0');
        const h = `${date.getHours()}`.padStart(2, '0');
        const i = `${date.getMinutes()}`.padStart(2, '0');
        const s = `${date.getSeconds()}`.padStart(2, '0');
        const time = (withSeconds) ? `${h}:${i}:${s}` : `${h}:${i}`;
        return `${y}/${m}/${d} ${time}`;
    }

    /**
     * Convert local date to MM/DD HH:MM.
     * @param {Date|string|null} dateIn
     * @return {string}
     */
    dateTimeShort(dateIn = null) {
        /** @type {Date} */
        const date = (dateIn) ?
            (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
            new Date();
        const m = `${date.getMonth() + 1}`.padStart(2, '0');
        const d = `${date.getDate()}`.padStart(2, '0');
        const h = `${date.getHours()}`.padStart(2, '0');
        const i = `${date.getMinutes()}`.padStart(2, '0');
        return `${m}/${d} ${h}:${i}`;
    }
}