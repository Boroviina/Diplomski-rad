export function SearchIdGenerator() {
    let id = '';
    const date = new Date().getDate().toString();
    const month = new Date().getMonth().toString();
    const year = new Date().getFullYear().toString().substring(2,4);

    function generateRandomString(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    const random = generateRandomString(3);

    id = date + month + year + random;
    return id;
}