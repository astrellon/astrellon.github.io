export type Editable<T> = {
    -readonly [P in keyof T]: T[P];
};

export type Opaque<K, T> = T & { __TYPE__: K }