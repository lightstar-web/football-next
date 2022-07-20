import Layout from '@/components/Layout/Layout'
import { richTeams } from '@/data/teams'
import { getProviders, signIn } from 'next-auth/react'

const SignIn = ({ providers }: never) => {
  return (
    <Layout>
      <div>
        <main className="flex flex-col place-content-center place-items-center gap-10 text-center">
          <div className="my-8 flex flex-col place-content-center">
            {Object.values(providers).map((provider: any) => (
              <button
                key={provider.id}
                className="h-full w-full rounded-md drop-shadow-sm bg-orange-200 p-3"
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: process.env.NEXT_PUBLIC_VERCEL_URL
                      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`
                      : 'http://localhost:3000/',
                  })
                }
              >
                Sign in with {provider.name}
              </button>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default SignIn

// this is horrible lmao

// {
//   richTeams.map((t, idx) =>
//     idx === 7 ? (
//       <>
//         {" "}
//         {Object.values(providers).map((provider: any) => (
//           <div
//             key={provider.name}
//             className="flex place-items-center rounded-md border-2 border-slate-900 bg-white p-2 text-lg font-medium"
//           >
//             <button
//               className="h-full w-full"
//               onClick={() =>
//                 signIn(provider.id, {
//                   callbackUrl: process.env.NEXT_PUBLIC_VERCEL_URL
//                     ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`
//                     : "http://localhost:3000/",
//                 })
//               }
//             >
//               Sign in with {provider.name}
//             </button>
//           </div>
//         ))}
//         <div
//           key={t.id}
//           style={{ backgroundColor: t.primaryColor as string }}
//           className={`h-[10vh] w-full rounded-md opacity-20`}
//         ></div>
//       </>
//     ) : (
//       <div
//         key={t.id}
//         style={{ backgroundColor: t.primaryColor as string }}
//         className={`h-[10vh] w-full rounded-md opacity-20`}
//       ></div>
//     )
//   );
// }
