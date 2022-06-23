import React, { useState } from 'react'
import { GetServerSideProps, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'

type Props = {
  // feed: FixtureProps[]
  fixtures: any
}

const Blog: React.FC<Props> = (props) => {
  const [gameweek, setGameweek] = useState(1)

  return (
    <Layout>
      <div className="page">
        <main>
          <h1>Login</h1>
        </main>
      </div>
    </Layout>
  )
}

export default Blog
