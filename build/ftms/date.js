"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFormatter = void 0;
class DateFormatter {
    constructor() {
        this.monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        this.monthNames = ["January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", "November", "December"
        ];
    }
    pretty(dateStr) {
        const date = new Date(dateStr);
        const d = date.getDate();
        const m = this.monthNamesShort[date.getMonth()];
        const y = date.getFullYear();
        return m + ' ' + d + ', ' + y;
    }
    ymd(dateStr) {
        const date = new Date(dateStr);
        const months = date.getMonth() + 1;
        const d = ('0' + date.getDate()).slice(-2);
        const m = ('0' + months).slice(-2);
        const y = date.getFullYear();
        return y + '-' + m + '-' + d;
    }
    time(dateStr) {
        const date = new Date(dateStr);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }
        return hours + ':' + minutes;
    }
    dateTime(dateStr) {
        const date = new Date(dateStr);
        const months = date.getMonth() + 1;
        const d = ('0' + date.getDate()).slice(-2);
        const m = ('0' + months).slice(-2);
        const y = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return d + '-' + m + '-' + y + ' ' + hours + ':' + minutes + ' ' + ampm;
    }
    Time12(dateStr) {
        const date = new Date(dateStr);
        const months = date.getMonth() + 1;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }
    timeDifference(toDate, fromDate) {
        if (fromDate > toDate) {
            return "Invalid";
        }
        let s = toDate - fromDate;
        const ms = s % 1000;
        s = (s - ms) / 1000;
        const secs = s % 60;
        s = (s - secs) / 60;
        const mins = s % 60;
        const hrs = (s - mins) / 60;
        return hrs + ':' + mins + ' hour(s)';
    }
    msToHour(time) {
        let s = time;
        const ms = s % 1000;
        s = (s - ms) / 1000;
        const secs = s % 60;
        s = (s - secs) / 60;
        const mins = s % 60;
        const hrs = (s - mins) / 60;
        return hrs + ':' + mins + ' hour(s)';
    }
    my(dateStr, short = false) {
        const date = new Date(dateStr);
        let m;
        if (short)
            m = this.monthNamesShort[date.getMonth()];
        else
            m = this.monthNames[date.getMonth()];
        const y = date.getFullYear();
        return `${m}, ${y}`;
    }
    nextMonth(date) {
        let current;
        if (date.getMonth() === 11) {
            current = new Date(date.getFullYear() + 1, 0, date.getDate());
        }
        else {
            current = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
        return current;
    }
    now() {
        return new Date();
    }
}
exports.dateFormatter = new DateFormatter();
//# sourceMappingURL=date.js.map