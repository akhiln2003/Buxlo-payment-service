# Payment Service

This service handles all payment-related functionality for the BUXLO application. It integrates with Stripe for credit card payments and Dwolla for ACH transfers. It uses PostgreSQL for data storage and communicates with other services via Kafka and gRPC.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [gRPC Services](#grpc-services)
- [Kafka Integration](#kafka-integration)
- [Running Tests](#running-tests)
- [Deployment](#deployment)

## Getting Started

### Prerequisites

- Node.js (v18)
- npm
- PostgreSQL
- Kafka
- Stripe Account
- Dwolla Account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akhiln2003/Buxlo-payment-service.git
   ```
2. Navigate to the `payment` directory:
   ```bash
   cd Microservices/payment
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the service in development mode, run:

```bash
npm start
```

This will start the server using `ts-node-dev`.

## Environment Variables

This service requires the following environment variables to be set. You can create a `.env` file in the root of the `payment` directory and add the following:

| Variable                    | Description                                         | Default Value                                   |
| --------------------------- | --------------------------------------------------- | ----------------------------------------------- |
| `PORT`                      | The port the service will run on.                   | `4003`                                          |
| `POSTGRES_HOST`             | The host of the PostgreSQL database.                | `postgres`                                      |
| `POSTGRES_PORT`             | The port of the PostgreSQL database.                | `5432`                                          |
| `POSTGRES_USERNAME`         | The username for the PostgreSQL database.           | `buxlo`                                         |
| `POSTGRES_PASSWORD`         | The password for the PostgreSQL database.           | `buxlo`                                         |
| `POSTGRES_DATABASE`         | The name of the PostgreSQL database.                | `payment`                                       |
| `DWOLLA_KEY`                | The Dwolla API key.                                 | `J59VNBcwckI56ZxSFM53o0AShmZT88qMpdpDhGvU5rSvifYqJv` |
| `DWOLLA_SECRET`             | The Dwolla API secret.                              | `n9KFE6iZSxywc13IaV65XFDljEzwrmpS1lPRDZ2wlUJOJ5KUPR` |
| `DWOLLA_BASE_URL`           | The base URL for the Dwolla API.                    | `https://api-sandbox.dwolla.com`                |
| `DWOLLA_ENV`                | The Dwolla environment.                             | `sandbox`                                       |
| `KAFKA_CLIENT_ID`           | The client ID for Kafka.                            | `payment-service`                               |
| `KAFKA_BROKER`              | The Kafka broker address.                           | `kafka:9092`                                    |
| `KAFKA_GROUP_ID`            | The Kafka group ID.                                 | `payment-group`                                 |
| `STRIPE_SECRET_KEY`         | The secret key for the Stripe API.                  | `sk_test_...`                                   |
| `PUBLISHABLE_KEY`           | The publishable key for the Stripe API.             | `pk_test_...`                                   |
| `STRIPE_WEBHOOK_SECRET`     | The webhook secret for Stripe.                      | `whsec_...`                                     |
| `STRIPE_API_VERSION`        | The Stripe API version.                             | `2025-07-30.basil`                              |
| `FRONT_END_BASE_URL`        | The base URL of the frontend application.           | `http://localhost:5173`                         |
| `GRPC_SERVER`               | The gRPC server for the booking service.            | `buxlo-booking:50052`                           |
| `GRPC_SUBSCRIPTION_SERVER`  | The gRPC server for the user service (subscription).| `buxlo-user:50053`                              |
| `ADMIN_ID`                  | The ID of the admin user.                           | `690710c480a09175d4ff33f5`                      |


<!-- ## API Endpoints

This service exposes RESTful endpoints for handling payments.
*(Detailed documentation of the API endpoints should be added here)* -->

## gRPC Services

This service communicates with the booking and user services via gRPC.

## Kafka Integration

This service uses Kafka for asynchronous communication. It acts as a producer and consumer.

<!-- ## Running Tests

There are no test scripts configured for this service yet. -->

## Deployment

This service can be containerized using Docker. A `Dockerfile` is provided in the root of the `payment` directory.

To build the Docker image:

```bash
docker build -t payment-service .
```

To run the Docker container:

```bash
docker run -p 4003:4003 payment-service
```