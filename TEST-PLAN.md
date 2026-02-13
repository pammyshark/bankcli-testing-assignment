# TEST PLAN

# TEST PLAN

| Test ID | Feature | Environment | Steps | Expected Result | Actual Result | Status | Notes/Defect |
|--------|--------|------------|------|----------------|--------------|--------|-------------|
| TP-001 | Create Account | Node.js + OS info | 1. Start app<br>2. Enter same name for account twice | Two different IDs for accounts with same name | Two different IDs for same name accounts | Pass | — |
| TP-002 | Create Account | Node.js + OS info | 1. Start app<br>2. Enter account name<br>3. Enter characters for deposits | Error message | Account created | Fail | Value becomes NaN in account list |
| TP-003 | Create Account | Node.js + OS info | 1. Start app<br>2. Enter empty account name | Error message | Account created | Fail | Empty accounts created with different IDs |
| TP-004 | Deposit Funds | Node.js + OS info | 1. Start app<br>2. Deposit<br>3. Enter: 23! | Error message | Deposit accepted as 23 | Fail | Special character ignored |
| TP-005 | Deposit Funds | Node.js + OS info | 1. Start app<br>2. Deposit<br>3. Enter negative value | Error message | Deposit accepted | Fail | Negative deposit increases balance |
| TP-006 | Deposit Funds | Node.js + OS info | 1. Start app<br>2. Deposit 0 | Error message | Deposit accepted | Fail | Zero deposit allowed |
| TP-007 | Withdraw Funds | Node.js + OS info | 1. Start app<br>2. Withdraw more than balance | Error message | Balance becomes NaN | Fail | Invalid balance shown |
| TP-008 | Withdraw Funds | Node.js + OS info | 1. Start app<br>2. Withdraw negative value | Error message | Amount added instead | Fail | Negative withdrawal increases balance |
| TP-009 | Withdraw Funds | Node.js + OS info | 1. Start app<br>2. Withdraw more than balance | Message: insufficient funds | Negative balance shown | Fail | No proper validation |
| TP-010 | Menu | Node.js + OS info | 1. Start app<br>2. Enter invalid option | “Try again” message | “Try again” message | Pass | — |

## White - box tests

# White-box Findings Mapping

| Issue | Test ID | Code Location | Explanation |
|------|--------|--------------|------------|
| Empty account name accepted | TP-003 | createAccount() in src/index.js | No validation for holderName before account creation |
| Non-numeric deposit creates NaN | TP-002 | createAccount() in src/index.js | parseFloat() used without validation |
| Deposit with special characters accepted | TP-004 | depositFunds() in src/index.js | parseFloat() used without input validation |
| Negative deposit allowed | TP-005 | depositFunds() in src/index.js | No check for amount <= 0 |
| Zero deposit allowed | TP-006 | depositFunds() in src/index.js | No validation for zero values |
| Withdrawal causing NaN balance | TP-007 | withdrawFunds() in src/index.js | No validation after parseFloat() |
| Negative withdrawal increases balance | TP-008 | withdrawFunds() in src/index.js | Subtraction of negative value increases balance |
| Withdrawal allows negative balance | TP-009 | withdrawFunds() in src/index.js | No balance check before withdrawal |
| Transfer logic inconsistent | (Transfer tests) | transferFunds() in src/index.js | Special conditions for IDs and amounts create inconsistent behavior |
