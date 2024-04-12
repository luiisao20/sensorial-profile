const monthMap = {
    ene: 0, 
    feb: 1,
    mar: 2, 
    abr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    ago: 7,
    sept:8,
    oct: 9,
    nov: 10,
    dic: 11
};

export function orderByBirthday(array) {
    array.sort((a, b) => {
        const [dayA, monthA, yearA] = a.data().patientData.birthday.split(' ');
        const [dayB, monthB, yearB] = b.data().patientData.birthday.split(' ');

        const formattedDateA = new Date(Date.UTC(yearA, monthMap[monthA.toLowerCase()], dayA));
        const formattedDateB = new Date(Date.UTC(yearB, monthMap[monthB.toLowerCase()], dayB));
    
        return formattedDateB - formattedDateA;
    })

    return array
}

export function orderByName(array) {
    array.sort((a, b) => {
        const patientAId = a.data().patientData.id;
        const patientBId = b.data().patientData.id;

        if (patientAId < patientBId) return -1;
        else if (patientAId > patientBId) return 1;
        else return 0;
    })

    return array
}

export function orderByCreatedAt(array) {
    array.sort((a, b) => {
        const [dayA, monthA, yearA] = a.data().date.split(' ');
        const [dayB, monthB, yearB] = b.data().date.split(' ');

        const formattedDateA = new Date(Date.UTC(yearA, monthMap[monthA.toLowerCase()], dayA));
        const formattedDateB = new Date(Date.UTC(yearB, monthMap[monthB.toLowerCase()], dayB));
    
        return formattedDateB - formattedDateA;
    })

    return array
}
