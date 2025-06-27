# ──────────────── Stage 1: deps ────────────────
# 의존성 설치만 전담
FROM node:20-alpine AS deps
WORKDIR /app

# 패키지 매니저 파일만 먼저 복사 → layer cache 최대화
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci --prefer-offline --no-audit --progress=false

# ──────────────── Stage 2: builder ────────────────
# Next.js 정적 자산 & 서버 코드 빌드
FROM node:20-alpine AS builder
WORKDIR /app

# deps stage 결과 재사용
COPY --from=deps /app/node_modules ./node_modules
# 전체 소스 복사
COPY . .

# 빌드 시점 환경변수가 필요한 경우만 셋팅 (ex. NEXT_PUBLIC_*)
# ARG NODE_ENV=production
RUN npm run build

# ──────────────── Stage 3: runner ────────────────
# 실제 실행용 이미지 (가볍게)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# 필수 파일만 Copy
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# ────────────────────────────────────────────────
# ❶ .env 파일은 빌드 결과물에 남기고 싶지 않다면:
#    이미지 빌드할 때 COPY 하지 말고, 배포 시
#    `docker run --env-file .env …` 형태로 주입하세요.
#
# ❷ 만약 이미지 내부에 포함해야 한다면:
#    아래 한 줄을 활성화하세요. (보안 위험 주의!)
# COPY .env ./.env
# ────────────────────────────────────────────────

EXPOSE 3000
CMD ["npm", "run", "start"]
