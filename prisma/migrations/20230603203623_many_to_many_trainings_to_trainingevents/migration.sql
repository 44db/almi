/*
  Warnings:

  - You are about to drop the column `trainingId` on the `TrainingEvent` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "TrainingEventsOnTrainings" (
    "trainingId" INTEGER NOT NULL,
    "trainingEventId" INTEGER NOT NULL,

    PRIMARY KEY ("trainingId", "trainingEventId"),
    CONSTRAINT "TrainingEventsOnTrainings_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TrainingEventsOnTrainings_trainingEventId_fkey" FOREIGN KEY ("trainingEventId") REFERENCES "TrainingEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TrainingEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "facilitatorId" INTEGER NOT NULL,
    CONSTRAINT "TrainingEvent_facilitatorId_fkey" FOREIGN KEY ("facilitatorId") REFERENCES "Facilitator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TrainingEvent" ("date", "facilitatorId", "id") SELECT "date", "facilitatorId", "id" FROM "TrainingEvent";
DROP TABLE "TrainingEvent";
ALTER TABLE "new_TrainingEvent" RENAME TO "TrainingEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
