import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SiteNavbar from '../components/SiteNavbar'

function PublicShell() {
  const { pathname, hash, key } = useLocation()

  // Scroll to #anchors (works from any page) and reset to the top on normal navigation.
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash, key])

  return (
    <>
      <SiteNavbar />
      <div className={pathname === '/' ? '' : 'pt-24'}>
        <Outlet />
      </div>
    </>
  )
}

export default PublicShell
