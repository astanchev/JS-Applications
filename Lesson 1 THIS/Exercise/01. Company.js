class Company {
    constructor() {
        this.departments = [];
    }

    addEmployee(username, salary, position, department) {
        if (!username || !salary || !position || !department || salary < 0) {
            throw new Error('Invalid input!');
        }

        let existingDep = this.departments.find(d => d.name === department);

        if (!existingDep) {
            existingDep = {
                name: department,
                employees: [],
                totalSalaries: function () {
                    return this.employees.reduce((a, b) => a + b.salary, 0);
                },
                averageSalary: function () {
                    if (this.employees.length === 0) {
                        return 0;
                    } else {
                        return this.totalSalaries() / this.employees.length;
                    }
                }
            };

            this.departments.push(existingDep);
        }

        existingDep.employees.push({
            username,
            salary,
            position
        });

        return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    bestDepartment() {
        const bestDepartment = this.departments
                                .sort((a, b) => b.averageSalary() - a.averageSalary())[0];
        let result = `Best Department is: ${bestDepartment.name}\nAverage salary: ${bestDepartment.averageSalary().toFixed(2)}\n`;

        let emps = bestDepartment
            .employees
            .sort((a, b) => b.salary - a.salary || (a.username).localeCompare(b.username))
            .map(e => `${e.username} ${e.salary} ${e.position}`)
            .join('\n');

        return result + emps;
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());