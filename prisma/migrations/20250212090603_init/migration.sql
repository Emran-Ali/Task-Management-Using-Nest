-- CreateTable
CREATE TABLE "UserHasPermission" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "UserHasPermission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserHasPermission" ADD CONSTRAINT "UserHasPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
