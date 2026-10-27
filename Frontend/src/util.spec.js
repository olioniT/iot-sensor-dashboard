import { describe, it, expect, afterEach, vi } from 'vitest'
import { parseTimestamp, getRandomColor } from '@/util'

afterEach(() => vi.restoreAllMocks())

describe('parseTimestamp', () => {
    const noon = Date.UTC(2026, 9, 25, 12, 0, 0)

    it('parses an ISO string with Z', () => {
        expect(parseTimestamp('2026-10-25T12:00:00Z')).toBe(noon)
    })

    it('treats a space-separated timestamp with no zone as UTC', () => {
        expect(parseTimestamp('2026-10-25 12:00:00')).toBe(noon)
    })

    it('respects an explicit offset', () => {
        expect(parseTimestamp('2026-10-25T12:00:00+12:00')).toBe(Date.UTC(2026, 9, 25, 0, 0, 0))
    })

    it('returns NaN for garbage', () => {
        expect(parseTimestamp('not a date')).toBeNaN()
    })

    it('throws on null', () => {
        expect(() => parseTimestamp(null)).toThrow()
    })
})

describe('getRandomColor', () => {
    it('returns a 6-digit hex colour', () => {
        expect(getRandomColor()).toMatch(/^#[0-9a-f]{6}$/)
    })

    it('adds leading zeroes when needed', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0)
        expect(getRandomColor()).toBe('#000000')
    })
})