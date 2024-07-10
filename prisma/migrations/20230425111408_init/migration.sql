-- CreateEnum
CREATE TYPE "User_Role" AS ENUM ('FANBASE', 'USER', 'DEV');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "Event_Status" AS ENUM ('ONGOING', 'DELAYED', 'FINISHED', 'CANCELED');

-- CreateEnum
CREATE TYPE "Event_Type" AS ENUM ('RAISE_FUND', 'DONATE', 'ENTRANCE_FEE', 'SHARED', 'FREE');

-- CreateEnum
CREATE TYPE "User_Event_Status" AS ENUM ('INTERESTED', 'JOINED');

-- CreateEnum
CREATE TYPE "User_Fanbase_Role" AS ENUM ('FOLLOWER', 'STAFF', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "User_Role" NOT NULL,
    "verificationCode" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "User_Info" (
    "user_uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "display_name" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "gender" "Gender" DEFAULT 'PREFER_NOT_TO_SAY',
    "address" TEXT,
    "img_url" TEXT,
    "cover_img_url" TEXT,
    "national_id_img_url" TEXT,
    "identity_img_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_Info_pkey" PRIMARY KEY ("user_uuid","username")
);

-- CreateTable
CREATE TABLE "Fanbase" (
    "id" SERIAL NOT NULL,
    "fbusername" TEXT NOT NULL,

    CONSTRAINT "Fanbase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fanbase_Info" (
    "fanbase_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "artist_name" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "description" TEXT,
    "img_url" TEXT,
    "cover_img_url" TEXT,
    "twitter_url" TEXT,
    "facebook_url" TEXT,
    "instagram_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "fanbase_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "location" TEXT,
    "description" TEXT,
    "img_url" TEXT,
    "cover_img_url" TEXT,
    "status" "Event_Status" NOT NULL DEFAULT 'ONGOING',
    "type" "Event_Type" NOT NULL DEFAULT 'FREE',
    "max_capacity" INTEGER,
    "max_fee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Fanbase" (
    "user_uuid" TEXT NOT NULL,
    "fanbase_id" INTEGER NOT NULL,
    "role" "User_Fanbase_Role" NOT NULL DEFAULT 'FOLLOWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_Fanbase_pkey" PRIMARY KEY ("user_uuid","fanbase_id")
);

-- CreateTable
CREATE TABLE "User_Event" (
    "user_uuid" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,
    "fee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "status" "User_Event_Status" NOT NULL DEFAULT 'INTERESTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_Event_pkey" PRIMARY KEY ("user_uuid","event_id")
);

-- CreateTable
CREATE TABLE "Payment_Info" (
    "id" SERIAL NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "slip_image_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_Info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delivery_Info" (
    "id" SERIAL NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "fanbase_id" INTEGER NOT NULL,
    "date_sent" TIMESTAMP(3) NOT NULL,
    "date_received" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Delivery_Info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Info_user_uuid_key" ON "User_Info"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_Info_username_key" ON "User_Info"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Fanbase_fbusername_key" ON "Fanbase"("fbusername");

-- CreateIndex
CREATE UNIQUE INDEX "Fanbase_Info_fanbase_id_key" ON "Fanbase_Info"("fanbase_id");

-- AddForeignKey
ALTER TABLE "User_Info" ADD CONSTRAINT "User_Info_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fanbase_Info" ADD CONSTRAINT "Fanbase_Info_fanbase_id_fkey" FOREIGN KEY ("fanbase_id") REFERENCES "Fanbase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_fanbase_id_fkey" FOREIGN KEY ("fanbase_id") REFERENCES "Fanbase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Fanbase" ADD CONSTRAINT "User_Fanbase_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Fanbase" ADD CONSTRAINT "User_Fanbase_fanbase_id_fkey" FOREIGN KEY ("fanbase_id") REFERENCES "Fanbase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Event" ADD CONSTRAINT "User_Event_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Event" ADD CONSTRAINT "User_Event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment_Info" ADD CONSTRAINT "Payment_Info_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment_Info" ADD CONSTRAINT "Payment_Info_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery_Info" ADD CONSTRAINT "Delivery_Info_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery_Info" ADD CONSTRAINT "Delivery_Info_fanbase_id_fkey" FOREIGN KEY ("fanbase_id") REFERENCES "Fanbase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
