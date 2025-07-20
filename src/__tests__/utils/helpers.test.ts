import { buildQueryString } from '../../utils/helpers';

describe('buildQueryString', () => {
  it('returns an empty string for empty input', () => {
    expect(buildQueryString({})).toBe('');
  });

  it('returns a single key-value pair', () => {
    expect(buildQueryString({ foo: 'bar' })).toBe('foo=bar');
  });

  it('returns multiple key-value pairs', () => {
    const result = buildQueryString({ foo: 'bar', baz: 'qux' });
    // Order is not guaranteed
    expect(['foo=bar&baz=qux', 'baz=qux&foo=bar']).toContain(result);
  });

  it('handles array values', () => {
    const result = buildQueryString({ foo: ['bar', 'baz'] });
    // Order is not guaranteed
    expect(['foo=bar&foo=baz', 'foo=baz&foo=bar']).toContain(result);
  });

  it('ignores undefined values', () => {
    expect(buildQueryString({ foo: undefined, bar: 'baz' })).toBe('bar=baz');
  });
});
