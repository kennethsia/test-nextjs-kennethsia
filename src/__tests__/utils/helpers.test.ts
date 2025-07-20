import { buildQueryString, wait } from '@/utils/helpers';

describe('buildQueryString', () => {
  it('returns an empty string for empty params', () => {
    expect(buildQueryString({})).toBe('');
  });

  it('builds a query string for single values', () => {
    expect(buildQueryString({ foo: 'bar', baz: 'qux' })).toBe(
      'foo=bar&baz=qux'
    );
  });

  it('builds a query string for array values', () => {
    expect(buildQueryString({ foo: ['bar', 'baz'] })).toBe('foo=bar&foo=baz');
  });

  it('ignores undefined values', () => {
    expect(buildQueryString({ foo: undefined, bar: 'baz' })).toBe('bar=baz');
  });
});

describe('wait', () => {
  it('resolves after the specified time', async () => {
    const start = Date.now();
    await wait(100);
    expect(Date.now() - start).toBeGreaterThanOrEqual(100);
  });
});
