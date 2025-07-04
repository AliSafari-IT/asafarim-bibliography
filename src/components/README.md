# MarkdownUtils Component - Real World Example

This directory contains a real-world example of using the `@asafarim/markdown-utils` package in a React application.

## Files

- `MarkdownUtils.tsx` - React component demonstrating all package features
- `md-examples/2023-12-01_MarkdownUtils.md` - Sample markdown file used in the demo

## Features Demonstrated

### 📊 Content Analysis
- **Word Count**: Accurate word counting in markdown content
- **Reading Time**: Estimated reading time based on average reading speed
- **Heading Extraction**: Extract all headings with levels and anchor links
- **Link Extraction**: Parse all markdown links with text and URLs
- **Image Extraction**: Parse all markdown images with alt text, src, and titles
- **Code Block Extraction**: Extract code blocks with language information
- **First Paragraph**: Get the first paragraph from markdown content
- **Plain Text**: Strip all markdown formatting to get plain text

### ✅ Validation
- **Overall Validation**: Check markdown syntax and structure
- **Link Validation**: Validate markdown links and detect broken references
- **Image Validation**: Validate image references and alt text

### 📁 File Operations
- **Filename to Slug**: Convert filenames to URL-friendly slugs
- **Filename to Title**: Convert filenames to human-readable titles
- **Date Extraction**: Extract dates from file paths and names
- **File Type Detection**: Check if files are markdown files
- **Date Formatting**: Format dates in various styles
- **Time Ago**: Get relative time strings (e.g., "2 days ago")

## Usage

### Installation

First, install the required dependencies:

```bash
# Install the markdown utils package
pnpm add @asafarim/markdown-utils

# For the demo component, you'll also need React and Tailwind CSS
pnpm add react @types/react
```

### Basic Usage

```tsx
import React from 'react';
import MarkdownUtils from './components/MarkdownUtils';

function App() {
  return (
    <div className="App">
      <MarkdownUtils />
    </div>
  );
}

export default App;
```

### Individual Function Usage

```typescript
import {
  getWordCount,
  getReadingTime,
  getAllHeadings,
  filenameToSlug,
  extractDateFromPath,
  validateMarkdown
} from '@asafarim/markdown-utils';

// Content analysis
const markdownContent = `# My Blog Post
This is some **bold** text with a [link](https://example.com).`;

console.log('Word count:', getWordCount(markdownContent)); // 8
console.log('Reading time:', getReadingTime(markdownContent)); // 1 minute
console.log('Headings:', getAllHeadings(markdownContent)); 
// [{ level: 1, text: 'My Blog Post', anchor: 'my-blog-post' }]

// File operations
const filename = '2023-12-01_my-awesome-post.md';
console.log('Slug:', filenameToSlug(filename)); // '2023-12-01-my-awesome-post'
console.log('Date:', extractDateFromPath(filename)); // Date object for 2023-12-01

// Validation
const validation = validateMarkdown(markdownContent);
console.log('Is valid:', validation.isValid);
console.log('Errors:', validation.errors);
```

## Component Features

### Interactive Tabs
1. **Content Analysis**: Shows word count, reading time, headings, links, images, and code blocks
2. **Validation**: Displays validation results for the markdown content
3. **File Operations**: Demonstrates file path processing and metadata extraction

### Real-time Processing
- Edit the markdown content in the textarea
- See results update automatically
- Switch between different analysis views

### Visual Feedback
- Color-coded validation results
- Structured display of extracted content
- Usage examples with syntax highlighting

## Styling

The component uses Tailwind CSS for styling. Make sure you have Tailwind CSS configured in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Integration Examples

### Blog Platform Integration
```typescript
// Process blog posts
const processBlogPost = (markdownContent: string, filename: string) => {
  return {
    slug: filenameToSlug(filename),
    title: filenameToTitle(filename),
    wordCount: getWordCount(markdownContent),
    readingTime: getReadingTime(markdownContent),
    headings: getAllHeadings(markdownContent),
    publishDate: extractDateFromPath(filename),
    isValid: validateMarkdown(markdownContent).isValid
  };
};
```

### CMS Integration
```typescript
// Validate content before saving
const validateContent = (content: string) => {
  const validation = validateMarkdown(content);
  const linkValidation = validateMarkdownLinks(content);
  const imageValidation = validateMarkdownImages(content);
  
  return {
    canPublish: validation.isValid,
    issues: [
      ...validation.errors,
      ...linkValidation.filter(l => !l.isValid).map(l => l.error),
      ...imageValidation.filter(i => !i.isValid).map(i => i.error)
    ]
  };
};
```

### Static Site Generator
```typescript
// Generate site metadata
const generateMetadata = (markdownFiles: string[]) => {
  return markdownFiles.map(filepath => {
    const content = fs.readFileSync(filepath, 'utf-8');
    return {
      path: filepath,
      slug: filenameToSlug(path.basename(filepath)),
      title: getFirstHeading(content),
      excerpt: getFirstParagraph(content),
      wordCount: getWordCount(content),
      readingTime: getReadingTime(content),
      publishDate: extractDateFromPath(filepath)
    };
  });
};
```

## Performance Notes

- All functions are optimized for performance
- Tree-shakable exports (only import what you need)
- Works in both browser and Node.js environments
- No external dependencies for core functionality
- TypeScript support with full type definitions

## Contributing

Feel free to extend this example or suggest improvements. The component demonstrates the most common use cases, but the `@asafarim/markdown-utils` package has many more features that can be explored.
