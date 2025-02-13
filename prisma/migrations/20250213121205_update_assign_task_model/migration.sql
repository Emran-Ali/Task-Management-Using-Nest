-- CreateTable
CREATE TABLE "AssignTask" (
    "id" SERIAL NOT NULL,
    "todoId" INTEGER NOT NULL,
    "assignUser" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssignTask_todoId_key" ON "AssignTask"("todoId");

-- AddForeignKey
ALTER TABLE "AssignTask" ADD CONSTRAINT "AssignTask_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignTask" ADD CONSTRAINT "AssignTask_assignUser_fkey" FOREIGN KEY ("assignUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
