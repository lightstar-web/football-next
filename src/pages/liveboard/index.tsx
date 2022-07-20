import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import classNames from 'classnames'
import { trpc } from '@/utils/trpc'
import { richTeams, teams } from '../../data/teams'
import { Player } from '@/backend/router'
import { User } from '@prisma/client'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Leaderboard = () => {
  const [gameweek, setGameweek] = useState(1)
  const { data: session, status } = useSession()

  const { isLoading, data } = trpc.useQuery(['getUsers'])
  const userInfo = trpc.useQuery([
    'getUser',
    { email: session?.user?.email ?? '' },
  ])
  const [isLeagueMode, setIsLeagueMode] = useState(false)

  return (
    <Layout>
      <Head>
        <title>Leaderboard - Soccer Survivor</title>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>
      <main className="my-4 flex w-full flex-col place-content-start rounded-lg sm:max-w-3xl">
        <h1 className="w-full text-center mb-4 rounded-md font-rubik text-3xl italic text-orange-600 sm:text-5xl">
          Current leaderboard
        </h1>
        {status === 'authenticated' && (
          <div className="flex flex-row justify-between border rounded-md p-3">
            <form className="flex flex-row gap-2 text-lg items-center">
              <label htmlFor="league-mode-toggle">League only</label>
              <input
                className="w-4 h-4"
                type="checkbox"
                name="league-mode-toggle"
                onChange={() => setIsLeagueMode(!isLeagueMode)}
              />
            </form>
            <Link href="/league">
              <a className="p-3 bg-orange-200 drop-shadow rounded-md">
                Join a league
              </a>
            </Link>
          </div>
        )}
        <table>
          <thead>
            <tr className="h-10 border-b-2 text-left italic text-orange-900">
              <th className="pl-2 font-normal" colSpan={1}>
                #
              </th>
              <th className="font-normal" colSpan={1}>
                Player
              </th>
              <th className="font-normal" colSpan={1}>
                Selection
              </th>
              <th className="font-normal" colSpan={1}>
                Pts
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              data?.success &&
              data.users
                .sort((a: User, b: User) => (b.score ?? 0) - (a.score ?? 0))
                .filter((u: User) => {
                  console.log(u.league, userInfo?.data?.user?.league)
                  return (
                    !isLeagueMode ||
                    (u.league && u.league === userInfo?.data?.user?.league)
                  )
                })
                .map(
                  (
                    { name, username, selection, selections, score }: User,
                    idx
                  ) => (
                    <tr
                      key={idx}
                      className={classNames(
                        idx ? 'bg-white' : 'bg-yellow-300',
                        'h-12 rounded-sm border-b-4 border-teal-800/5'
                      )}
                    >
                      <td className="w-10 pl-3">{idx + 1}</td>
                      <td className="font-semibold">{username ?? name}</td>
                      <td>
                        {richTeams[Number(selections[0])]?.shortName ?? ''}
                      </td>
                      <td>{score}</td>
                    </tr>
                  )
                )}
          </tbody>
        </table>
      </main>
    </Layout>
  )
}

export default Leaderboard
