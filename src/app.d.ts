import  { type PoolClient } from pg

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			dbConn: PoolClient
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
