import dayjs from 'dayjs';

const DateTime = (data) => {
    // format DateTime with dayjs
    if (data.datetime) {
        return dayjs(data.datetime)
            .format('MMM D, YYYY h:mm A');
    } else {
        return null;
    }
};

export default DateTime;