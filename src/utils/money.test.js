import { it, expect, describe } from 'vitest';
import { formatMoney } from './money.js';

describe('formatMoney', () => {
    it('formats 1999 cents as $19.99', () => {
        expect(formatMoney(1999)).toBe('$19.99');
    });
    it('displays 2 decimal places', () => {
        expect(formatMoney(1990)).toBe('$19.90');
        expect(formatMoney(200)).toBe('$2.00');
    });
});
