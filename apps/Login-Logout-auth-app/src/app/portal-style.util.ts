export function resolvePortalStyle(returnUrl: string): 'onls' | 'oms' {
  const omsIdentifiers = ['4201', 'oms']; // adjust to your real OMS host/port(s)
  return omsIdentifiers.some((id) => returnUrl.includes(id)) ? 'oms' : 'onls';
}