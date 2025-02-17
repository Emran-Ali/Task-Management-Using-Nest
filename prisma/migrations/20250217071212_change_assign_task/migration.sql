/*
  Warnings:

  - You are about to drop the column `assignUser` on the `AssignTask` table. All the data in the column will be lost.
  - Added the required column `userId` to the `AssignTask` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssignTask" DROP CONSTRAINT "AssignTask_assignUser_fkey";

-- AlterTable
ALTER TABLE "AssignTask" DROP COLUMN "assignUser",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "time" DROP NOT NULL,
ALTER COLUMN "startAt" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AssignTask" ADD CONSTRAINT "AssignTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
