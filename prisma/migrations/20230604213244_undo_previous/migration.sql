/*
  Warnings:

  - Made the column `facilitatorId` on table `TrainingEvent` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TrainingEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'Training Event',
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "facilitatorId" INTEGER NOT NULL,
    CONSTRAINT "TrainingEvent_facilitatorId_fkey" FOREIGN KEY ("facilitatorId") REFERENCES "Facilitator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TrainingEvent" ("date", "facilitatorId", "id", "name") SELECT "date", "facilitatorId", "id", "name" FROM "TrainingEvent";
DROP TABLE "TrainingEvent";
ALTER TABLE "new_TrainingEvent" RENAME TO "TrainingEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
