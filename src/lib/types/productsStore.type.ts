import type { Product } from "$lib/types/product.type";

export type ProductsStore = {
	subscribe(onValueChange: (value: Product[]) => void): () => void;
	set(value: Product[]): void;
	update(updater: (value: Product[]) => Product[]): void;
};
