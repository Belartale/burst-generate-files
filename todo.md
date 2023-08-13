const firstDir = 'D:\\git\\burst-generate-files\\test\\src\\bus\\rrr\\index.ts';
const secondDir = 'D:\\git\\burst-generate-files\\test\\src\\components\\index.ts';

const relativePath = path.relative(path.dirname(secondDir), firstDir);

console.log(relativePath); // відности шлях від secondDir до firstDir