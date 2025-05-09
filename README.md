# 🎬 Cinema Backend PoC

This Proof of Concept demonstrates how a modular, scalable backend can be structured using a real-world scenario: a cinema system with teams managing tickets, payments, and customer memberships.

Built with the principles of Modular Monolith + Clean Architecture + Hexagonal Architecture, this project shows how independent product teams can own and evolve their APIs without stepping on each other.

---

## 📦 Product Modules

The system is split into three product APIs, each located in its own folder under `libs/`:

- `libs/ticketing-api`: manages ticket availability and sales
- `libs/payment-api`: handles all payment processing
- `libs/contacts-api`: manages members, benefits, and user information

Each module includes its own:
- HTTP controllers
- Use cases (JTBD)
- Domain logic
- Infrastructure (DB, providers)
- Optional versioning

---

## 🧑‍💻 Use Cases (JTBD)

This PoC includes the following user scenarios:

### 🎟️ Public Cinema Page
Accessible without login:
- View available screenings
- View seat map and details
- Purchase tickets
- Purchase memberships

### 👤 User Portal (requires session)
- View past ticket purchases
- View active membership
- Access exclusive benefits

### 🔄 Versioning Simulation
- Membership Tier update exists under `/v2/memberships` to simulate breaking API evolution

---

## 🧪 Feature Flags & Fix Simulation

- A new membership discount is hidden behind a feature flag in `contacts-api`
- A simulated bug in ticket confirmation is fixed to demonstrate scoped maintenance

---

## 🚀 Getting Started

1. Clone this repo
2. Run `npm install`
3. Use `nx serve api` to start the backend
4. Use Postman or browser to interact with endpoints (public and portal flows)

---

## 🎯 Goals

- Show how teams work independently inside a shared backend
- Demonstrate clean modular structure using real examples
- Prove that versioning, fixes, and features can be managed safely and flexibly
