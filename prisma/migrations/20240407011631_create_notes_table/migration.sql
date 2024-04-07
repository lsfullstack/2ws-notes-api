-- CreateTable
CREATE TABLE "notes" (
    "uuid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_ad" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
