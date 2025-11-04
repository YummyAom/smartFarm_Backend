FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# ✅ copy schema ก่อน generate
COPY prisma ./prisma
RUN npx prisma generate

# ✅ ค่อย copy โค้ดทั้งหมดหลัง generate เสร็จ
COPY . .

RUN npm run build

EXPOSE 3001

# ✅ generate อีกครั้งใน runtime เผื่อ dist มีการใช้ path ใหม่
CMD npx prisma generate && node dist/index.js
