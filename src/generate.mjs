// This port owns its application mappings. Inputs come only from the pinned local palette.


const starship = {
files: (f) => {
    const key = f.slug.replace(/-/g, "_");
    const names = Object.keys(f.colors);
    return [{
      path: `${f.slug}.toml`,
      content: `palette = "${key}"

[palettes.${key}]
${names.map((n) => `${n.padEnd(9)}= "${f.c(n)}"`).join("\n")}
`,
    }];
  }
};

export function generate(flavors) {
  return [...flavors.flatMap(f => starship.files(f)), ...(starship.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
