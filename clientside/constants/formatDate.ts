export function formatDate(date: string | undefined) {
    const newDate = new Date(date);


    const day = newDate.getDate();
    const mon = newDate.getMonth() + 1;
    const y = newDate.getFullYear();

    const formattedDate = `${day}.${mon}.${y}.`;

    return formattedDate;
}