import { describe, it, expect, beforeEach, vi } from 'vitest'
 
let useDialogs
 
beforeEach(async () => {
  vi.resetModules()
  ;({ useDialogs } = await import('@/composables/useDialogs'))
})
 
describe('useDialogs', () => {
    it('starts with every dialog closed', () => {
        const { state } = useDialogs()
        expect(state.sensorDialog).toBe(false)
        expect(state.userDialog).toBe(false)
        expect(state.deleteDialog).toBe(false)
    })

    it('opens the sensor dialog', () => {
        const d = useDialogs()
        d.showSensorDialog()
        expect(d.state.sensorDialog).toBe(true)
    })

    it('opens the user dialog with id, title and callback', () => {
        const d = useDialogs()
        const cb = vi.fn()
        d.showUserDialog(7, 'Edit user', cb)

        expect(d.state).toMatchObject({ userDialog: true, userDialogID: 7, userDialogTitle: 'Edit user' })
        d.state.userDialogCallback()
        expect(cb).toHaveBeenCalledTimes(1)
    })

    it('opens the delete dialog with title, message and callback', () => {
        const d = useDialogs()
        const cb = vi.fn()
        d.showDeleteDialog('Delete sensor?', 'Are you sure?', cb)

        expect(d.state).toMatchObject({
            deleteDialog: true,
            deleteDialogTitle: 'Delete sensor?',
            deleteDialogMsg: 'Are you sure?',
        })
        d.state.deleteDialogCallback()
        expect(cb).toHaveBeenCalledTimes(1)
    })

    it('dismissDialog closes everything and clears the delete dialog text', () => {
        const d = useDialogs()
        d.showSensorDialog()
        d.showUserDialog(1, 'Create a user', vi.fn())
        d.showDeleteDialog('t', 'm', vi.fn())

        d.dismissDialog()

        expect(d.state.sensorDialog).toBe(false)
        expect(d.state.userDialog).toBe(false)
        expect(d.state.deleteDialog).toBe(false)
    })

    it('dismissDialog clears the user dialog fields', () => {
        const d = useDialogs()
        d.showUserDialog(5, 'Edit user', vi.fn())
        d.dismissDialog()

        expect(d.state.userDialogTitle).toBe('')
        expect(d.state.userDialogID).toBe('')
        expect(d.state.userDialogCallback).toBe('')
    })

    it('dismissDialog clears the delete dialog fields', () => {
        const d = useDialogs()
        d.showDeleteDialog("Delete sensor?", "Are you sure you want to delete Sensor #1?", vi.fn())
        d.dismissDialog()

        expect(d.state.deleteDialogTitle).toBe('')
        expect(d.state.deleteDialogMsg).toBe('')
        expect(d.state.deleteDialogCallback).toBe('')
    })

    it('shares one state object between callers', () => {
        useDialogs().showSensorDialog()

        expect(useDialogs().state.sensorDialog).toBe(true)
        expect(useDialogs().state.deleteDialog).toBe(false)
        expect(useDialogs().state.userDialog).toBe(false)
    })
})