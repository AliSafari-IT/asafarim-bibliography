# Welcome to Our Blog

Published: **December 1, 2023**  
Updated: *December 15, 2023*

This is a **comprehensive guide** to using *markdown utilities* in your projects. The `@asafarim/markdown-utils` package provides powerful tools for processing markdown content. Check the demo live at: [@asafarim/markdown-utils Demo](https://bibliography.asafarim.com/markdown-utils/demo).

## Features

Our markdown utilities offer the following capabilities:

- Extract headings and paragraphs with proper structure
- Count words and estimate reading time accurately
- Parse links and images with metadata
- Validate markdown syntax and detect issues
- Process file paths and generate SEO-friendly slugs

Check out our [documentation](https://example.com/docs) and [GitHub repository](https://github.com/AliSafari-IT/asafarim) for more details.

![Sample Image](https://via.placeholder.com/300x200 "Sample Image Title")

## Installation

Install the package using your favorite package manager:

```bash
npm install @asafarim/markdown-utils
# or
pnpm add @asafarim/markdown-utils
# or
yarn add @asafarim/markdown-utils
```

### Code Example

Here's how to use the utilities in your project:

```javascript
import { 
  getWordCount, 
  getReadingTime, 
  getAllHeadings,
  extractLinks,
  filenameToSlug 
} from '@asafarim/markdown-utils';

const markdownContent = `# My Article
This is some **bold** text with a [link](https://example.com).`;

// Analyze content
console.log('Word count:', getWordCount(markdownContent));
console.log('Reading time:', getReadingTime(markdownContent), 'minutes');
console.log('Headings:', getAllHeadings(markdownContent));

// Process filenames
const slug = filenameToSlug('2023-12-01_My-Article.md');
console.log('Generated slug:', slug); // "2023-12-01-my-article"
```

### TypeScript Support

The package includes full TypeScript definitions:

```typescript
import type { MarkdownHeading, MarkdownLink } from '@asafarim/markdown-utils';

const headings: MarkdownHeading[] = getAllHeadings(content);
const links: MarkdownLink[] = extractLinks(content);
```

## Use Cases

### Blog Processing
Perfect for static site generators and blog platforms:
- Generate table of contents from headings
- Estimate reading time for articles
- Extract metadata from frontmatter
- Validate markdown before publishing

### Content Management
Ideal for CMS and documentation systems:
- Process uploaded markdown files
- Generate SEO-friendly URLs from titles
- Validate content structure
- Extract and validate external links

## Performance

This package is optimized for performance with minimal dependencies. All utilities are tree-shakable and work in both Node.js and browser environments.

---

*This content demonstrates various markdown features and contains approximately 280 words, estimated reading time: 2 minutes.*