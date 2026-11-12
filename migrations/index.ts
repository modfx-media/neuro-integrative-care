import * as migration_20261021_000000_posts_featured_image from "./20261021_000000_posts_featured_image";

export const migrations = [
  {
    up: migration_20261021_000000_posts_featured_image.up,
    down: migration_20261021_000000_posts_featured_image.down,
    name: "20261021_000000_posts_featured_image",
  },
];
