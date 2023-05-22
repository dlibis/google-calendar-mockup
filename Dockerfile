# Stage 1: Build frontend
FROM node:18-alpine AS frontend

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build

# Stage 2: Build backend
FROM python:3.10-alpine AS backend

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Stage 3: Combine frontend and backend
FROM python:3.10-alpine AS final

WORKDIR /app

# Install MySQL client dependencies
RUN apt-get update && apt-get install -y default-libmysqlclient-dev

# Copy frontend build
COPY --from=frontend /app/public ./public

COPY --from=frontend /app/.next ./.next

# Copy backend
COPY --from=backend /app .

# Expose ports
EXPOSE 3000 8000

# Start the backend server
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]