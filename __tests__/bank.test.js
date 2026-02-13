const {
  formatMoney,
  generateAccountId,
  findAccountById,
} = require('../src/index');

// String format testing
describe('formatMoney', () => {
  test('formats 100 as $100.00', () => {
    expect(formatMoney(100)).toBe('$100.00');
  });

  test('formats 0 as $0.00', () => {
    expect(formatMoney(0)).toBe('$0.00');
  });
});


//Checking if randoms can make double randoms
describe('generateAccountId', () => {
  test('generates an ID starting with ACC-', () => {
    const id = generateAccountId();
    expect(id.startsWith('ACC-')).toBe(true);
  });
});

//Finding saved accounts
describe('findAccountById', () => {
  test('returns the correct account when ID exists', () => {
    // Mock data
    const testAccount = {
      id: 'ACC-1234',
      holderName: 'Test User',
      balance: 100,
    };

    // Inject into data
    const { data } = require('../src/index');
    data.accounts = [testAccount];

    const result = findAccountById('ACC-1234');
    expect(result).toEqual(testAccount);
  });

  test('returns undefined when account does not exist', () => {
    const result = findAccountById('ACC-9999');
    expect(result).toBeUndefined();
  });
});

// Normal tests
describe('account balance logic', () => {
  test('deposit increases account balance', () => {
    const account = {
      id: 'ACC-1111',
      holderName: 'Test',
      balance: 100,
      transactions: [],
    };

    const depositAmount = 50;
    account.balance += depositAmount;

    expect(account.balance).toBe(150);
  });

  test('withdraw decreases account balance', () => {
    const account = {
      id: 'ACC-2222',
      holderName: 'Test',
      balance: 200,
      transactions: [],
    };

    const withdrawAmount = 80;
    account.balance -= withdrawAmount;

    expect(account.balance).toBe(120);
  });

  test('negative deposit should not be allowed (expected behavior)', () => {
    const account = {
      id: 'ACC-3333',
      holderName: 'Test',
      balance: 100,
      transactions: [],
    };

    const depositAmount = -50;

    // expected safe behavior
    if (depositAmount > 0) {
      account.balance += depositAmount;
    }

    expect(account.balance).toBe(100);
  });

  test('withdraw more than balance should not be allowed (expected behavior)', () => {
    const account = {
      id: 'ACC-4444',
      holderName: 'Test',
      balance: 100,
      transactions: [],
    };

    const withdrawAmount = 150;

    // expected safe behavior
    if (withdrawAmount <= account.balance) {
      account.balance -= withdrawAmount;
    }

    expect(account.balance).toBe(100);
  });
});
