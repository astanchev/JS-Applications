const url = `https://api.backendless.com/3D3B029C-3E3D-9607-FF50-0228C3D25300/CF12A54B-0440-4005-9D86-4FD613E06599/data/Students`;


export async function getAllStudents() {
    return await (await fetch(url)).json();
}

export async function createStudent(student) {
    return await (await fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(student)
    })).json();
}

export async function getAllIds() {
    const students = await getAllStudents();
    const allIds = students.map(s => s.id);
    return allIds;
}