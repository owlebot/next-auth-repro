import { BackRequester } from "../requesters/back-requester.js";
import { ENDPOINTS } from "../requesters/endpoints.js";
import {back_createUser, back_getUserById, back_getUserByAccount, back_linkAccount} from "./mock-backend.js"

// https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/adapters.ts#L267
export const Adapter = () => {
	return {
		async createUser(user) {
			console.log("+ CREATE USER");
			const { data: createdUser } = await back_createUser();
			return {
				id: createdUser.id,
				name: user.name,
				image: user.image,
				type: user.provider,
				accountId: user.providerAccountId,
			};
		},

		async getUser(id) {
			console.log("+ GET USER");

			const user = await back_getUserById(id);
			if (!user.ok || !user.data) {
				return null;
			}
			const providerAccount = user.data.accounts.find(a => a.id === user.data.defaultAccountId);
			return {
				id: user.data.id,
				name: providerAccount.pseudo,
				image: providerAccount.image,
				accountId: providerAccount.id,
				type: providerAccount.type,
			};
		},

		async getUserByEmail(email) {
			console.log("+ GET USER BY MAIL", email);
			return null;
		},

		async getUserByAccount( { providerAccountId } ) {
			console.log("+ GET USER BY ACCOUNT");

			const user = await back_getUserByAccount(providerAccountId);
			if (!user.ok || !user.data) {
				return null;
			}
			const providerAccount = user.data.accounts.find(a => a.id === providerAccountId);
			console.log("================== 1 ==", user.data);
			return {
				id: user.data.id,
				name: providerAccount.pseudo,
				image: providerAccount.image,
				accountId: providerAccountId,
				type: providerAccount.type,
			};
		},

		async updateUser(user) {
			console.log("+ UPDATE USER", user);
			return;
		},

		async linkAccount(account) {
			console.log("+ LINK ACCOUNT");

			await back_linkAccount(account.userId, {
				id: account.providerAccountId,
				type: account.provider,
				pseudo: account.user.name,
				image: account.user.image,
			});
			
			return {
				id: account.userId,
				name: account.user.name,
				image: account.user.image,
				accountId: account.providerAccountId,
				type: account.provider,
			};
		},

		async createSession( { sessionToken, userId, expires } ) {
			console.log("+ CREATE SESSION", sessionToken, userId, expires);
			return;
		},

		async getSessionAndUser(sessionToken) {
			console.log("+ GET SESSION AND USER", sessionToken);
			return;
		},

		async updateSession( { sessionToken } ) {
			console.log("+ UPDATE SESSION", sessionToken);
			return;
		},

		async deleteSession(sessionToken) {
			console.log("+ DELETE SESSION", sessionToken);
			return;
		},
	};
};
