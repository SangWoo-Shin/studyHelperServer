import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

export default NextAuth({
    providers: [
      // OAuth authentication providers...
      AppleProvider({
        clientId: process.env.APPLE_ID,
        clientSecret: process.env.APPLE_SECRET
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
      KakaoProvider({
        clientId: process.env.KAKAO_ID,
        clientSecret: process.env.KAKAO_SECRET
      }),
      // Passwordless / email sign in
      EmailProvider({
        server: process.env.MAIL_SERVER,
        from: 'NextAuth.js <no-reply@example.com>'
      }),
    ]
  })