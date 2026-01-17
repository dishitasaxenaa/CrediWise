# 🌱 CredWise – Green Credit Scoring Platform

CredWise is a sustainability-focused fintech backend that analyzes a user’s banking transactions to generate a **Green Credit Score** and incentivize environmentally responsible spending through **better loan interest rates**.

---

## 🚀 Overview

Traditional credit scores evaluate *repayment behavior* but ignore *how money is spent*.  
**CredWise bridges this gap** by analyzing spending patterns and rewarding users for low-carbon financial behavior.

Using AI-powered transaction classification, CredWise computes a **Green Score (0–850)** based on the user’s past 6 months of spending and maps it to interest-rate benefits.

---

## 🧠 How It Works

1. **Bank Connection (Simulated)**
   - User enters bank name, IFSC, and account number
   - Account number is masked for security

2. **Transaction Analysis**
   - Backend fetches transaction data (mocked via `transactions.json`)
   - AI classifies spending into:
     - 🌿 Green / Positive
     - ⚠️ High Carbon
     - ⚪ Neutral

3. **Green Score Calculation**
   - Spending percentages are used to compute a score (0–850)
   - Higher green spending → higher score

4. **Reward Engine**
   - Green Score determines loan interest rate adjustments
   - Sustainable users get financial incentives

---

## 📊 Example Categories

| Category        | Examples                                       |
|-----------------|------------------------------------------------|
| **High Carbon** | Petrol, Airlines, Fast Fashion, ATM Withdrawals|
| **Green**       | Metro, Bus, EV Charging, Second-hand purchases |
| **Neutral**     | Rent, Utilities, Supermarkets                  |

---

## 🏗️ Tech Stack

- **Backend**: Node.js, Express
- **AI**: Google Gemini (`gemini-1.5-flash`)
- **Authentication**: JWT (mocked)
- **Data Base**: MongoDB
- **Architecture**: Monolithic, service-based

---
