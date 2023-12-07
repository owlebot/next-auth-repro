import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import Twitch from "next-auth/providers/twitch";

import { Adapter } from "./auth/adapter.js";
import { Callbacks } from "./auth/callbacks.js";

export const authOptions = {
	// Configure one or more authentication providers
	// https://authjs.dev/guides/providers/custom-provider
	// https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/discord.ts
	providers: [
		Discord( {
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: { params: { scope: "identify guilds connections" } },
		} ),
		Twitch( {
			clientId: process.env.TWITCH_CLIENT_ID,
			clientSecret: process.env.TWITCH_CLIENT_SECRET,
		} ),
	],
	session: {
		strategy: "jwt",
	},
	adapter: Adapter(),
	callbacks: Callbacks(),
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
