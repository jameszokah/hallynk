-- CreateTable
CREATE TABLE "bookings" (
    "booking_id" SERIAL NOT NULL,
    "check_in" TIMESTAMPTZ NOT NULL,
    "check_out" TIMESTAMPTZ NOT NULL,
    "hostel_id" INTEGER NOT NULL,
    "price" DECIMAL(8,2) NOT NULL,
    "room_type" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "hostels" (
    "amenities" TEXT,
    "availability" BOOLEAN NOT NULL DEFAULT false,
    "hostel_id" SERIAL NOT NULL,
    "location" TEXT,
    "name" VARCHAR(100) NOT NULL,
    "pricing" DECIMAL(8,2) NOT NULL,
    "room_types" TEXT NOT NULL,

    CONSTRAINT "hostels_pkey" PRIMARY KEY ("hostel_id")
);

-- CreateTable
CREATE TABLE "payments" (
    "amount" DECIMAL(8,2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "payment_id" SERIAL NOT NULL,
    "payment_method" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "hostel_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "review_id" SERIAL NOT NULL,
    "review_text" TEXT,
    "timestamp" TIMESTAMPTZ NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "users" (
    "email" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(15),
    "preferences" TEXT,
    "user_id" SERIAL NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_hostel_id_fkey" FOREIGN KEY ("hostel_id") REFERENCES "hostels"("hostel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_hostel_id_fkey" FOREIGN KEY ("hostel_id") REFERENCES "hostels"("hostel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
