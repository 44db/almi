import {
	TrainingEventsOnEmployees,
	TrainingEventsOnTrainings,
	// 	Facilitator
} from '@prisma/client';

import { Employee } from '@/appTypes/employee';
import { Training } from '@/appTypes/training';
import { Facilitator } from '@/appTypes/facilitator';

export interface TrainingEvent {
	id: number;
	date: Date;
	name: string;
	employees: Employee[];
	trainings: Training[];
	// employees: TrainingEventsOnEmployees[]
	// trainings: TrainingEventsOnTrainings[]
	facilitator: Facilitator;
}

export interface TrainingEventProps {
	date: Date;
	employees: TrainingEventsOnEmployees[];
	trainings: TrainingEventsOnTrainings[];
	facilitatorId: number;
}
