/*
  Warnings:

  - A unique constraint covering the columns `[userId,permission]` on the table `UserHasPermission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,role]` on the table `UserHasRole` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserHasPermission_userId_permission_key" ON "UserHasPermission"("userId", "permission");

-- CreateIndex
CREATE UNIQUE INDEX "UserHasRole_userId_role_key" ON "UserHasRole"("userId", "role");
