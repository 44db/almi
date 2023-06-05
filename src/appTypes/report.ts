import { TrainingEvent, Facilitator, TrainingEventsOnEmployees } from '@prisma/client';

export type ReportAttributes = {
	startDate: Date;
	endDate: Date;
}

export type TrainingEventWithEmployees = TrainingEvent & {
	employees: TrainingEventsOnEmployees[]
};

export type TrainingEventWithFacilitator = TrainingEvent & {
	facilitator: Facilitator
};
