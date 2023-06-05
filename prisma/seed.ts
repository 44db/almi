import { PrismaClient, Employee } from '@prisma/client';
const prisma = new PrismaClient();

const Employees: Employee[] = [
	{ id: 1, name: 'John', surname: 'Doe', position: 'Captain' },
	{ id: 2, name: 'Jane', surname: 'Buck', position: 'Account' },
	{ id: 3, name: 'Jack', surname: 'Black', position: 'Engineer' },
	{ id: 4, name: 'Jill', surname: 'White', position: 'Marine' },
];

const Facilitators = [
	{ name: "Lloyd's Maritime Academy" },
	{ name: 'Maritime Training Services (MTS)' },
	{ name: 'International Maritime Training Academy (IMTA)' },
	{ name: 'Videotel' },
	{ name: 'MTC Maritime Training Center' },
	{ name: 'Marlins' },
	{ name: 'Maersk Training' },
	{ name: 'Warsash Maritime Academy' },
	{ name: 'BIMCO Training' },
	{ name: 'Maritime Education and Training Ltd (METL)' },
];

const Trainings = [
	{ name: 'Maritime Safety and Security' },
	{ name: 'International Maritime Regulations and Compliance' },
	{ name: 'Ship Operations and Management' },
	{ name: 'Navigation and Seamanship' },
	{ name: 'Marine Engineering and Maintenance' },
	{ name: 'Shipping Documentation and Procedures' },
	{ name: 'Port Operations and Terminal Management' },
	{ name: 'Cargo Handling and Stowage' },
	{ name: 'Marine Environmental Protection' },
	{ name: 'Maritime Risk Management and Insurance' },
];

async function main() {
	// Add Employees
	// We could use createMany however it is not supported by SQLite
	Employees.forEach(async (employee) => {
		console.log('Adding employee: ', employee);
		await prisma.employee.create({
			data: employee,
		});
	});

	// Add Facilitator
	Facilitators.forEach(async (facilitator) => {
		console.log('Adding facilitator: ', facilitator);
		await prisma.facilitator.create({
			data: facilitator,
		});
	});

	// Add Trainings
	Trainings.forEach(async (training) => {
		console.log('Adding training: ', training);
		await prisma.training.create({
			data: training,
		});
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
