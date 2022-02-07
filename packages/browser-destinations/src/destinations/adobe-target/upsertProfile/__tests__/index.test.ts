import { Analytics, Context } from '@segment/analytics-next'
import adobeTarget, { destination } from '../../index'
import { Subscription } from '../../../../lib/browser-destinations'

// TODO: Fill this test since it's a copy of the main test.

describe('Adobe Target Web', () => {
  test('calls identify', async () => {
    const subscriptions: Subscription[] = [
      {
        partnerAction: 'upsertProfile',
        name: 'Upsert Profile',
        enabled: true,
        subscribe: 'type = "identify"',
        mapping: {}
      }
    ]
    const [event] = await adobeTarget({
      client_code: 'segmentexchangepartn',
      admin_number: '10',
      version: '2.8.0',
      cookie_domain: 'localhost',
      mbox_name: 'target-global-mbox',
      subscriptions
    })

    jest.spyOn(destination, 'initialize')

    await event.load(Context.system(), {} as Analytics)
    expect(destination.initialize).toHaveBeenCalled()

    const scripts = window.document.querySelectorAll('script')
    expect(scripts).toMatchInlineSnapshot(`
      NodeList [
        <script
          src="https://admin10.testandtarget.omniture.com/admin/rest/v1/libraries/atjs/download?client=segmentexchangepartn&version=2.8.0"
          status="loaded"
          type="text/javascript"
        />,
        <script>
          // the emptiness
        </script>,
      ]
    `)
  })
})
