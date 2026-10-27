import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useConfigStore } from '@/stores/config'
 
let config
 
beforeEach(() => {
    setActivePinia(createPinia())
    config = useConfigStore()
})

describe('config store', () => {
    it('toggles between celsius and fahrenheit', () => {
        expect(config.tempFormat).toBe('c')
        config.switchTempFormat()
        expect(config.tempFormat).toBe('f')
        config.switchTempFormat()
        expect(config.tempFormat).toBe('c')
    })

    it('formats celsius', () => {
        expect(config.formatTemp(21)).toBe('21\u00B0C')
    })

    it('formats fahrenheit', () => {
        config.tempFormat = 'f'
        expect(config.formatTemp(0)).toBe('32\u00B0F')
        expect(config.formatTemp(20)).toBe('68\u00B0F')
    })
})