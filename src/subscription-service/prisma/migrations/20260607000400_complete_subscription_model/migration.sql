-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('FREE', 'PREMIUM', 'GOLD');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED');

-- AlterTable
ALTER TABLE "Subscription"
ADD COLUMN "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "plan" DROP DEFAULT,
ALTER COLUMN "plan" TYPE "SubscriptionPlan" USING ("plan"::"SubscriptionPlan"),
ALTER COLUMN "plan" SET DEFAULT 'FREE';

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");
