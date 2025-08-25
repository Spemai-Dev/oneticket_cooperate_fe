export function RefundPolicy() {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Refund Policy</h3>
      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
        <li>
          Refund requests must be submitted at least 7 days before the event
          date.
          <ul className="list-disc list-inside ml-4">
            <li>Refunds requested after this period will not be eligible.</li>
            <li>
              Tickets purchased under Early Bird or Promotional offers are
              non-refundable.
            </li>
          </ul>
        </li>
        <li>
          Processing of Refunds
          <ul className="list-disc list-inside ml-4">
            <li>Refund requests will be processed within 10 business days.</li>
            <li>
              Refunds will be made to the original payment method used at the
              time of purchase.
            </li>
          </ul>
        </li>
        <li>
          Transfer of Tickets
          <ul className="list-disc list-inside ml-4">
            <li>
              If you are unable to attend, you may transfer your ticket to
              another individual by notifying us at least 48 hours before the
              event.
            </li>
          </ul>
        </li>
        <li>
          Event Cancellation
          <ul className="list-disc list-inside ml-4">
            <li>
              In the unlikely event that the organizer cancels the event, 100%
              of the ticket fee will be refunded.
            </li>
            <li>
              If the event is rescheduled, your ticket will remain valid for the
              new date.
            </li>
          </ul>
        </li>
        <li>
          Contact for Refund Requests
          <ul className="list-disc list-inside ml-4">
            <li>
              For refund or transfer requests, please contact our support team
              at [support@email.com] or call [phone number].
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
}
