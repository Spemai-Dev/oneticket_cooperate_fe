export function Sponsors() {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Sponsors</h3>
      <div>
        <h4 className="font-semibold mb-2">Platinum Sponsors</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Dialog Enterprise - Official Telecom Partner</li>
          <li>Inovessa Global - Technology Partner</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Gold Sponsors</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Nations Trust Bank - Financial Services Partner</li>
          <li>SysNet Solutions - Cybersecurity Partner</li>
        </ul>
      </div>
    </div>
  );
}
