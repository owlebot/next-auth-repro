/* eslint-disable no-unused-vars */
const TYPES = ["discord", "twitch"];

export const Callbacks = () => {
	return {
		/**
		* @param  {object} user     User object
		* @param  {object} account  Provider account
		* @param  {object} profile  Provider profile
		* @return {boolean|string}  Return `true` to allow sign in
		*                           Return `false` to deny access
		*                           Return `string` to redirect to (eg.: "/unauthorized")
		*/
		async signIn( { user, account, profile } ) {
			user.providerAccountId = account.providerAccountId;
			user.provider = account.provider;
			
			account.user = user;
			account.profile = profile;
			
			const isAllowedToSignIn = true;
			if (isAllowedToSignIn) {
				return true;
			}
			// Return false to display a default error message
			// Or you can return a URL to redirect to:
			// return '/unauthorized'
			return false;
		},
		
		/**
		 * @param  {object}  token     Decrypted JSON Web Token
		 * @param  {object}  user      User object      (only available on sign in)
		 * @param  {object}  account   Provider account (only available on sign in)
		 * @param  {object}  profile   Provider profile (only available on sign in)
		 * @param  {boolean} isNewUser True if new user (only available on sign in)
		 * @return {object}            JSON Web Token that will be saved
		*/
		// eslint-disable-next-line no-unused-vars
		async jwt( {
			token, user, account, profile, isNewUser,
		} ) {
			// add current provider context to the token in order to perform OAUTH action later
			if (account?.provider && TYPES.includes(account?.provider) ) {
				token.providerToken = `${account.token_type} ${account.access_token}`;
				token.providerType = account.provider;
				token.providerUser = account.user;
			}
			
			if (user) {
				token.user = user;
			}
			
			return token;
		},
		
		/**
		 * @param  {object} session      Session object
		 * @param  {object} token        User object    (if using database sessions)
		 *                               JSON Web Token (if not using database sessions)
		 * @return {object}              Session that will be returned to the client
		*/
		async session( { session, token } ) {
			session.provider = {
				type: token.providerType,
				token: token.providerToken,
				profile: token.providerUser,
			};
			session.user = token.user;
			
			return session;
		},
	};
};
