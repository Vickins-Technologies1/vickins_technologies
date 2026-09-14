FROM golang:1.24-alpine AS build

WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/v-guard ./cmd/v-guard

FROM gcr.io/distroless/static-debian12:nonroot

ENV APP_ENV=production
ENV PORT=8080

WORKDIR /app
COPY --from=build /out/v-guard /app/v-guard

EXPOSE 8080
USER nonroot:nonroot

ENTRYPOINT ["/app/v-guard"]
