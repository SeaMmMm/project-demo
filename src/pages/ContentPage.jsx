import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import pageData from './pageInfo'

function ContentPage() {
  const pageInfo = pageData[location.pathname.split('/').pop()]

  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <Outlet />
      <Footer
        data={{ description: pageInfo.description, codeurl: pageInfo.url }}
        index={pageInfo.number}
      />
    </Suspense>
  )
}

export default ContentPage
