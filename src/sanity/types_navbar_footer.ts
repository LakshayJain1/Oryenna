export interface SanityNavbar {
  title?: string
  announcementText?: string
  navLinks?: Array<{
    label: string
    url: string
  }>
}

export interface SanityFooterColumn {
  columnTitle: string
  links: Array<{
    label: string
    url: string
  }>
}

export interface SanityFooter {
  title?: string
  brandTagline?: string
  copyrightText?: string
  footerColumns?: SanityFooterColumn[]
}
