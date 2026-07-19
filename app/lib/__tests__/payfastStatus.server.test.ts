import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {
  getPayfastStatus,
  isPayfastOutage,
  isPayfastDegraded,
  _resetPayfastStatusCache,
} from '~/lib/payfastStatus.server';

function mockFetchResponse(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    json: async () => body,
  });
}

describe('getPayfastStatus', () => {
  beforeEach(() => _resetPayfastStatusCache());
  afterEach(() => vi.unstubAllGlobals());

  it('returns the indicator from the status page', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetchResponse({status: {indicator: 'major', description: 'Partial System Outage'}}),
    );
    const status = await getPayfastStatus();
    expect(status.indicator).toBe('major');
    expect(status.description).toBe('Partial System Outage');
  });

  it('fails open to unknown when the status page is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('timeout')));
    const status = await getPayfastStatus();
    expect(status.indicator).toBe('unknown');
    expect(isPayfastOutage(status)).toBe(false);
    expect(isPayfastDegraded(status)).toBe(false);
  });

  it('fails open on an unexpected payload', async () => {
    vi.stubGlobal('fetch', mockFetchResponse({status: {indicator: 'weird'}}));
    const status = await getPayfastStatus();
    expect(status.indicator).toBe('unknown');
  });

  it('caches the result for the TTL window', async () => {
    const fetchMock = mockFetchResponse({status: {indicator: 'none', description: 'All Systems Operational'}});
    vi.stubGlobal('fetch', fetchMock);
    await getPayfastStatus();
    await getPayfastStatus();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe('outage/degraded classification', () => {
  it('blocks only on major and critical', () => {
    expect(isPayfastOutage({indicator: 'major', description: ''})).toBe(true);
    expect(isPayfastOutage({indicator: 'critical', description: ''})).toBe(true);
    expect(isPayfastOutage({indicator: 'minor', description: ''})).toBe(false);
    expect(isPayfastOutage({indicator: 'none', description: ''})).toBe(false);
    expect(isPayfastOutage({indicator: 'unknown', description: ''})).toBe(false);
  });

  it('warns from minor upward', () => {
    expect(isPayfastDegraded({indicator: 'minor', description: ''})).toBe(true);
    expect(isPayfastDegraded({indicator: 'major', description: ''})).toBe(true);
    expect(isPayfastDegraded({indicator: 'none', description: ''})).toBe(false);
    expect(isPayfastDegraded({indicator: 'unknown', description: ''})).toBe(false);
  });
});
