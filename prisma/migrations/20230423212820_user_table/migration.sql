-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetPassToken" TEXT,
    "expireDateToken" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
