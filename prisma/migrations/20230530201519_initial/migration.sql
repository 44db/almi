-- CreateTable
CREATE TABLE "Training" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Facilitator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TrainingEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trainingId" INTEGER NOT NULL,
    "facilitatorId" INTEGER NOT NULL,
    CONSTRAINT "TrainingEvent_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TrainingEvent_facilitatorId_fkey" FOREIGN KEY ("facilitatorId") REFERENCES "Facilitator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TrainingEventsOnEmployees" (
    "employeeId" INTEGER NOT NULL,
    "trainingEventId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "attendanceType" TEXT NOT NULL,

    PRIMARY KEY ("employeeId", "trainingEventId"),
    CONSTRAINT "TrainingEventsOnEmployees_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TrainingEventsOnEmployees_trainingEventId_fkey" FOREIGN KEY ("trainingEventId") REFERENCES "TrainingEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
