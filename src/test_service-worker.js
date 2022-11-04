if (!self.define) {
	let e,
		r = {};
	const s = (s, a) => (
		(s = new URL(s + ".js", a).href),
		r[s] ||
			new Promise((r) => {
				if ("document" in self) {
					const e = document.createElement("script");
					(e.src = s), (e.onload = r), document.head.appendChild(e);
				} else (e = s), importScripts(s), r();
			}).then(() => {
				let e = r[s];
				if (!e) throw new Error(`Module ${s} didn’t register its module`);
				return e;
			})
	);
	self.define = (a, i) => {
		const t = e || ("document" in self ? document.currentScript.src : "") || location.href;
		if (r[t]) return;
		let o = {};
		const u = (e) => s(e, t),
			c = { module: { uri: t }, exports: o, require: u };
		r[t] = Promise.all(a.map((e) => c[e] || u(e))).then((e) => (i(...e), o));
	};
}
define(["./workbox-0047f92b"], function (e) {
	"use strict";
	self.addEventListener("message", (e) => {
		e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
	}),
		e.precacheAndRoute(
			[
				{ url: "app.html", revision: "4a173678733a9b6b689ec9201e43baa9" },
				{ url: "lib/api.js", revision: "bcb30e18e318c856f24b27af2b122e95" },
				{ url: "lib/categories.js", revision: "a3efdb2651e5d848fa550db20c846665" },
				{ url: "lib/components/DragDropList.svelte", revision: "ae023f215fb01fdec764760a00eb8e18" },
				{ url: "lib/components/ProductCard.svelte", revision: "ff49032735ffcf2d8f8e94af257b5ed4" },
				{ url: "lib/stores.js", revision: "4bbb74f43ef83aca0b9c0df4a5cbd19c" },
				{ url: "lib/supabase.js", revision: "809ca7947c8fc1d35a7c6f74802fef1e" },
				{ url: "lib/translations/ar.js", revision: "72cb1584db0a0ffce59773c97d08dfac" },
				{ url: "lib/translations/de.js", revision: "0dddb59596ea3b546d963ceb02010793" },
				{ url: "lib/translations/en_us.js", revision: "5714af9cdd33fe1805233e6626630085" },
				{ url: "lib/translations/en.js", revision: "a76b264f795bb1aeb06510b161cf7e95" },
				{ url: "lib/translations/es.js", revision: "8ae5d4dfa002f5fcd613acbac8088949" },
				{ url: "lib/translations/fr.js", revision: "e5590c0bb1f5b6911615d3c9dc04fa1a" },
				{ url: "lib/translations/jp.js", revision: "9bcdb0f49cef811f2353e8638b5508d4" },
				{ url: "lib/translations/translate.js", revision: "22955c99bf5fa8e10203e4798ab69e8a" },
				{ url: "lib/translations/zh.js", revision: "f63037d3cb9130bd8a75d6a13671c65a" },
				{ url: "routes/+layout.server.js", revision: "3cdb53e0669aca8f1f64c7bb30309bd3" },
				{ url: "routes/+layout.svelte", revision: "9be79359425e1ec8b586de363601c528" },
				{ url: "routes/+page.js", revision: "bc166ee7e8d80997a10c791af66cd7b4" },
				{ url: "routes/+page.svelte", revision: "ee6225d2383b39872e199bca315ce34b" },
				{ url: "routes/api/product/addProduct/+server.js", revision: "8090998b7ebf3ea09b9d48a65fa7b3a6" },
				{ url: "routes/api/product/deleteAllProducts/+server.js", revision: "fa4df2a953f297f7f4204742fdccb3a2" },
				{ url: "routes/api/product/deleteProduct/+server.js", revision: "2cf02f38e2acb02b2e735baaa5c22c75" },
				{ url: "routes/api/product/editTitle/+server.js", revision: "4b63781c60bc6255f6194fa7e6859803" },
				{ url: "routes/api/product/editType/+server.js", revision: "a18745f97abb9fb5edc6072252346e2b" },
				{ url: "routes/api/product/getCategory-[title]/+server.js", revision: "60511a001311c56b8c76c1fc6613d4db" },
				{ url: "routes/api/product/getProduct-[title]/+server.js", revision: "b4eee231246eb299311c702fa136ff6b" },
				{ url: "routes/api/product/getProducts/+server.js", revision: "62a5951ba382056ba2d5283331d54bf5" },
				{ url: "routes/api/product/getSort-[category]/+server.js", revision: "c761b8f7d88d0524c8439b7739b2841c" },
				{ url: "routes/api/product/toggleChecked/+server.js", revision: "601e46b78abe6d4c49bade148ca21adc" },
				{ url: "routes/api/product/updateAmount/+server.js", revision: "c94f43b51d39d3b093183158eb63b16e" },
				{ url: "routes/api/product/updateCategory/+server.js", revision: "3fda62ae33c796bed7613c212fdf55ab" },
				{ url: "routes/api/product/updateSort/+server.js", revision: "a556e2f0fb4af8dffe336c9742a9308e" },
				{ url: "routes/api/userdata/getCategories/+server.js", revision: "6cd4a7405f08cfc4cff7d2ae2d1f3c81" },
				{ url: "routes/api/userdata/getPriorities/+server.js", revision: "01157da99f87abc0a0437fc208e5a409" },
				{ url: "routes/api/userdata/updateCategories/+server.js", revision: "4b9ca70ae1b4ad5c24aee08b33082b59" },
				{ url: "routes/api/userdata/updatePriorities/+server.js", revision: "bd6ed20fe876fa438e56b08012c7f43b" },
				{ url: "routes/auth/createUserdata/+server.js", revision: "d27791f37dc777382c5d65d005d4767c" },
				{ url: "routes/auth/login/+page.js", revision: "b57877c61ea9ed2998867e69c2658a85" },
				{ url: "routes/auth/login/+page.server.js", revision: "742bfcc3e6d601e40af066fec66a1559" },
				{ url: "routes/auth/login/+page.svelte", revision: "cb48d1776de64af1848d74a7fcafef41" },
				{ url: "routes/auth/logout/+server.js", revision: "15a75aab6882cc8612d60d0df62435e6" },
				{ url: "routes/auth/signup/+page.js", revision: "b57877c61ea9ed2998867e69c2658a85" },
				{ url: "routes/auth/signup/+page.server.js", revision: "0b64f02f5f47b0db5de763eb9aea6a9d" },
				{ url: "routes/auth/signup/+page.svelte", revision: "0d012180647ba38e348d8aa938822e3a" },
				{ url: "routes/settings/+page.js", revision: "c3725e22576c04e7c82508a0d5b874a5" },
				{ url: "routes/settings/+page.svelte", revision: "df2ed3df32ae1de7729fcc93166796c9" }
			],
			{ ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
		);
});
//# sourceMappingURL=service-worker.js.map
