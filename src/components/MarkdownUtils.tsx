import React, { useState, useEffect } from 'react';
import {
  getFirstHeading,
  getAllHeadings,
  getFirstParagraph,
  extractLinks,
  extractImages,
  stripMarkdown,
  getWordCount,
  getReadingTime,
  extractCodeBlocks,
  filenameToSlug,
  filenameToTitle,
  extractDateFromPath,
  isMarkdownFile,
  formatDate,
  getTimeAgo,
  validateMarkdown,
  validateMarkdownLinks,
  validateMarkdownImages,
  markdownToHtml,
  type MarkdownHeading,
  type MarkdownLink,
  type MarkdownImage,
  type MarkdownCodeBlock
} from '@asafarim/markdown-utils';

// Sample markdown content from the example file
const SAMPLE_MARKDOWN = `# Welcome to Our Blog

Published: **December 1, 2023**  
Updated: *December 15, 2023*

This is a **comprehensive guide** to using *markdown utilities* in your projects. The \`@asafarim/markdown-utils\` package provides powerful tools for processing markdown content.

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

\`\`\`bash
npm install @asafarim/markdown-utils
# or
pnpm add @asafarim/markdown-utils
# or
yarn add @asafarim/markdown-utils
\`\`\`

### Code Example

Here's how to use the utilities in your project:

\`\`\`javascript
import { 
  getWordCount, 
  getReadingTime, 
  getAllHeadings,
  extractLinks,
  filenameToSlug 
} from '@asafarim/markdown-utils';

const markdownContent = \`# My Article
This is some **bold** text with a [link](https://example.com).\`;

// Analyze content
console.log('Word count:', getWordCount(markdownContent));
console.log('Reading time:', getReadingTime(markdownContent), 'minutes');
console.log('Headings:', getAllHeadings(markdownContent));

// Process filenames
const slug = filenameToSlug('2023-12-01_My-Article.md');
console.log('Generated slug:', slug); // "2023-12-01-my-article"
\`\`\`

### TypeScript Support

The package includes full TypeScript definitions:

\`\`\`typescript
import type { MarkdownHeading, MarkdownLink } from '@asafarim/markdown-utils';

const headings: MarkdownHeading[] = getAllHeadings(content);
const links: MarkdownLink[] = extractLinks(content);
\`\`\`

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

*This content demonstrates various markdown features and contains approximately 280 words, estimated reading time: 2 minutes.*`;

interface FileInfo {
  path: string;
  filename: string;
  slug: string;
  title: string;
  date: Date | null;
  isMarkdown: boolean;
}

interface ContentAnalysis {
  wordCount: number;
  readingTime: number;
  headings: MarkdownHeading[];
  links: MarkdownLink[];
  images: MarkdownImage[];
  codeBlocks: MarkdownCodeBlock[];
  firstHeading: string;
  firstParagraph: string;
  plainText: string;
}

interface ValidationResults {
  overall: any;
  links: any[];
  images: any[];
}

const MarkdownUtils: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [contentAnalysis, setContentAnalysis] = useState<ContentAnalysis | null>(null);
  const [validationResults, setValidationResults] = useState<ValidationResults | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>(SAMPLE_MARKDOWN);
  const [activeTab, setActiveTab] = useState<'analysis' | 'validation' | 'file-ops'>('analysis');

  useEffect(() => {
    // Analyze the sample file path
    const samplePath = '/src/components/md-examples/2023-12-01_MarkdownUtils.md';
    analyzeFilePath(samplePath);
    analyzeContent(markdownContent);
    validateContent(markdownContent);
  }, [markdownContent]);

  const analyzeFilePath = (path: string) => {
    const filename = path.split('/').pop() || '';
    
    const info: FileInfo = {
      path,
      filename,
      slug: filenameToSlug(filename),
      title: filenameToTitle(filename),
      date: extractDateFromPath(path),
      isMarkdown: isMarkdownFile(path)
    };
    
    setFileInfo(info);
  };

  const analyzeContent = (content: string) => {
    const analysis: ContentAnalysis = {
      wordCount: getWordCount(content),
      readingTime: getReadingTime(content),
      headings: getAllHeadings(content),
      links: extractLinks(content),
      images: extractImages(content),
      codeBlocks: extractCodeBlocks(content),
      firstHeading: getFirstHeading(content),
      firstParagraph: getFirstParagraph(content),
      plainText: stripMarkdown(content)
    };
    
    setContentAnalysis(analysis);
  };

  const validateContent = (content: string) => {
    const validation: ValidationResults = {
      overall: validateMarkdown(content),
      links: validateMarkdownLinks(content),
      images: validateMarkdownImages(content)
    };
    
    setValidationResults(validation);
  };

  const formatDateDisplay = (date: Date | null) => {
    if (!date) return 'No date found';
    return `${formatDate(date)} (${getTimeAgo(date)})`;
  };

  const renderAnalysisTab = () => (
    <div className="space-y-6">      {/* Content Overview */}
      <div className="theme-card-info rounded-lg p-4">
        <h3 className="text-lg font-semibold theme-text-info mb-3">📊 Content Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold theme-text-info">{contentAnalysis?.wordCount}</div>
            <div className="text-sm theme-text-secondary">Words</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold theme-text-info">{contentAnalysis?.readingTime}</div>
            <div className="text-sm theme-text-secondary">Min Read</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold theme-text-info">{contentAnalysis?.headings.length}</div>
            <div className="text-sm theme-text-secondary">Headings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold theme-text-info">{contentAnalysis?.links.length}</div>
            <div className="text-sm theme-text-secondary">Links</div>
          </div>
        </div>
      </div>{/* First Heading and Paragraph */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="theme-card border rounded-lg p-4">
          <h4 className="font-semibold theme-card-header mb-2">🏷️ First Heading</h4>
          <p className="theme-text-primary font-medium">{contentAnalysis?.firstHeading || 'No heading found'}</p>
        </div>
        <div className="theme-card border rounded-lg p-4">
          <h4 className="font-semibold theme-card-header mb-2">📝 First Paragraph</h4>
          <p className="theme-card-text text-sm">{contentAnalysis?.firstParagraph || 'No paragraph found'}</p>
        </div>
      </div>      {/* All Headings */}
      {contentAnalysis?.headings && contentAnalysis.headings.length > 0 && (
        <div className="theme-card-success rounded-lg p-4">
          <h4 className="font-semibold theme-text-success mb-3">📑 Document Structure</h4>
          <div className="space-y-2">
            {contentAnalysis.headings.map((heading, index) => (
              <div key={index} className={`pl-${(heading.level - 1) * 4} flex items-center`}>
                <span className="theme-text-success font-mono text-sm mr-2">
                  H{heading.level}
                </span>
                <span className="theme-text-primary">{heading.text}</span>
                <span className="theme-text-secondary text-xs ml-2">#{heading.anchor}</span>
              </div>
            ))}
          </div>
        </div>
      )}      {/* Links and Images */}
      <div className="grid md:grid-cols-2 gap-4">
        {contentAnalysis?.links && contentAnalysis.links.length > 0 && (
          <div className="theme-card-purple rounded-lg p-4">
            <h4 className="font-semibold theme-text-purple mb-3">🔗 Links Found</h4>
            <div className="space-y-2">
              {contentAnalysis.links.map((link, index) => (
                <div key={index} className="flex flex-col">
                  <a href={link.url} className="theme-text-purple hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </a>
                  <span className="theme-text-secondary text-xs">{link.url}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {contentAnalysis?.images && contentAnalysis.images.length > 0 && (
          <div className="theme-card-orange rounded-lg p-4">
            <h4 className="font-semibold theme-text-warning mb-3">🖼️ Images Found</h4>
            <div className="space-y-2">
              {contentAnalysis.images.map((image, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-medium theme-text-primary">{image.alt}</span>
                  <span className="theme-text-secondary text-xs">{image.src}</span>
                  {image.title && <span className="theme-text-secondary text-xs italic">{image.title}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>{/* Code Blocks */}
      {contentAnalysis?.codeBlocks && contentAnalysis.codeBlocks.length > 0 && (
        <div className="theme-card rounded-lg p-4">
          <h4 className="font-semibold theme-card-header mb-3">💻 Code Blocks</h4>
          <div className="space-y-3">
            {contentAnalysis.codeBlocks.map((block, index) => (
              <div key={index} className="border rounded p-3" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-mono px-2 py-1 rounded theme-bg-code theme-text-primary">
                    {block.language || 'text'}
                  </span>
                  <span className="text-xs theme-text-secondary">
                    {block.content.split('\n').length} lines
                  </span>
                </div>
                <pre className="text-sm p-2 rounded overflow-x-auto" style={{ background: 'var(--markdown-code-bg)', color: 'var(--markdown-code-text)' }}>
                  <code>{block.content}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderValidationTab = () => (
    <div className="space-y-6">
      {/* Overall Validation */}
      {validationResults?.overall && (
        <div className={`border rounded-lg p-4 ${
          validationResults.overall.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-3 ${
            validationResults.overall.isValid ? 'text-green-800' : 'text-red-800'
          }`}>
            📋 Overall Validation
          </h3>
          <div className="flex items-center mb-2">
            <span className={`font-medium ${
              validationResults.overall.isValid ? 'text-green-700' : 'text-red-700'
            }`}>
              Status: {validationResults.overall.isValid ? 'Valid ✅' : 'Invalid ❌'}
            </span>
          </div>
          
          {validationResults.overall.errors && validationResults.overall.errors.length > 0 && (
            <div className="mt-3">
              <h4 className="font-medium text-red-700 mb-2">Errors:</h4>
              <ul className="list-disc list-inside space-y-1">
                {validationResults.overall.errors.map((error: string, index: number) => (
                  <li key={index} className="text-red-600 text-sm">{error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {validationResults.overall.warnings && validationResults.overall.warnings.length > 0 && (
            <div className="mt-3">
              <h4 className="font-medium text-yellow-700 mb-2">Warnings:</h4>
              <ul className="list-disc list-inside space-y-1">
                {validationResults.overall.warnings.map((warning: string, index: number) => (
                  <li key={index} className="text-yellow-600 text-sm">{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Link Validation */}
      {validationResults?.links && validationResults.links.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-3">🔗 Link Validation</h4>
          <div className="space-y-2">
            {validationResults.links.map((linkResult: any, index: number) => (
              <div key={index} className={`p-2 rounded border ${
                linkResult.isValid ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{linkResult.text}</span>
                  <span className={linkResult.isValid ? 'text-green-600' : 'text-red-600'}>
                    {linkResult.isValid ? '✅' : '❌'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{linkResult.url}</div>
                {linkResult.error && (
                  <div className="text-sm text-red-600 mt-1">{linkResult.error}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Validation */}
      {validationResults?.images && validationResults.images.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800 mb-3">🖼️ Image Validation</h4>
          <div className="space-y-2">
            {validationResults.images.map((imageResult: any, index: number) => (
              <div key={index} className={`p-2 rounded border ${
                imageResult.isValid ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{imageResult.alt}</span>
                  <span className={imageResult.isValid ? 'text-green-600' : 'text-red-600'}>
                    {imageResult.isValid ? '✅' : '❌'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{imageResult.src}</div>
                {imageResult.error && (
                  <div className="text-sm text-red-600 mt-1">{imageResult.error}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderFileOpsTab = () => (
    <div className="space-y-6">
      {/* File Information */}
      {fileInfo && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-indigo-800 mb-3">📁 File Operations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Basic Info</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Path:</span> {fileInfo.path}</div>
                <div><span className="font-medium">Filename:</span> {fileInfo.filename}</div>
                <div><span className="font-medium">Is Markdown:</span> 
                  <span className={fileInfo.isMarkdown ? 'text-green-600' : 'text-red-600'}>
                    {fileInfo.isMarkdown ? ' ✅ Yes' : ' ❌ No'}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Generated Data</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Slug:</span> <code className="bg-gray-200 px-1 rounded">{fileInfo.slug}</code></div>
                <div><span className="font-medium">Title:</span> {fileInfo.title}</div>
                <div><span className="font-medium">Date:</span> {formatDateDisplay(fileInfo.date)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plain Text Preview */}
      {contentAnalysis?.plainText && (
        <div className="bg-gray-50 border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">📄 Plain Text (Markdown Stripped)</h4>
          <div className="bg-white border rounded p-3 max-h-40 overflow-y-auto">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{contentAnalysis.plainText}</p>
          </div>        </div>
      )}
    </div>
  );
  return (
    <div className="max-w-6xl mx-auto p-6" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>      <style>{`
        .markdown-content h1 { font-size: 1.8em; font-weight: bold; margin: 1em 0 0.5em 0; color: var(--markdown-header-text); }
        .markdown-content h2 { font-size: 1.5em; font-weight: bold; margin: 1em 0 0.5em 0; color: var(--markdown-header-text); }
        .markdown-content h3 { font-size: 1.2em; font-weight: bold; margin: 1em 0 0.5em 0; color: var(--markdown-header-text); }
        .markdown-content p { margin: 0.8em 0; color: var(--markdown-text); }
        .markdown-content strong { font-weight: 600; color: var(--text-primary); }
        .markdown-content em { font-style: italic; color: var(--text-secondary); }
        .markdown-content code { background: var(--markdown-code-bg); color: var(--markdown-code-text); padding: 2px 4px; border-radius: 3px; font-family: monospace; font-size: 0.9em; }
        .markdown-content pre { background: var(--markdown-code-bg); color: var(--markdown-code-text); padding: 1em; border-radius: 6px; overflow-x: auto; margin: 1em 0; }
        .markdown-content pre code { background: none; padding: 0; color: inherit; }
        .markdown-content a { color: var(--accent-primary); text-decoration: underline; }
        .markdown-content a:hover { color: var(--accent-hover); }
        .markdown-content ul { margin: 1em 0; padding-left: 2em; }
        .markdown-content li { margin: 0.3em 0; }
        .markdown-content hr { margin: 2em 0; border: none; border-top: 1px solid var(--border-primary); }
        .markdown-content img { margin: 1em 0; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        
        /* Theme-aware card styles */
        .theme-card { background: var(--bg-secondary); border: 1px solid var(--border-primary); }
        .theme-card-header { color: var(--text-primary); }
        .theme-card-text { color: var(--text-secondary); }
        .theme-card-primary { background: var(--bg-secondary); border: 1px solid var(--border-primary); }
        .theme-card-success { background: var(--bg-secondary); border: 1px solid var(--teams-green); }
        .theme-card-info { background: var(--bg-secondary); border: 1px solid var(--teams-blue); }
        .theme-card-warning { background: var(--bg-secondary); border: 1px solid var(--teams-red); }
        .theme-card-purple { background: var(--bg-secondary); border: 1px solid var(--teams-purple); }
        .theme-card-orange { background: var(--bg-secondary); border: 1px solid var(--warning); }
        .theme-input { background: var(--bg-primary); border: 1px solid var(--border-primary); color: var(--text-primary); }
        .theme-input:focus { border-color: var(--border-focus); }
        .theme-button { background: var(--button-primary); color: var(--button-primary-text); border: none; }
        .theme-button:hover { background: var(--button-primary-hover); }
        .theme-tab-active { border-color: var(--accent-primary); color: var(--accent-primary); }
        .theme-tab-inactive { border-color: transparent; color: var(--text-secondary); }
        .theme-tab-inactive:hover { color: var(--text-primary); border-color: var(--border-secondary); }
        .theme-text-primary { color: var(--text-primary); }
        .theme-text-secondary { color: var(--text-secondary); }
        .theme-text-accent { color: var(--accent-primary); }
        .theme-text-success { color: var(--teams-green); }
        .theme-text-info { color: var(--teams-blue); }
        .theme-text-warning { color: var(--teams-red); }
        .theme-text-purple { color: var(--teams-purple); }
        .theme-bg-code { background: var(--bg-tertiary); }
      `}</style>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          📚 Markdown Utils Demo
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Real-world example of <code className="px-2 py-1 rounded" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>@asafarim/markdown-utils</code> in action
        </p>
        <p style={{ color: 'var(--text-secondary)' }}> Check the demo live at: <a href="https://bibliography.asafarim.com/markdown-utils/demo" style={{ color: 'var(--accent-primary)' }}>here</a>.</p>
      </div>      {/* Markdown Input */}
      <div className="mb-6">
        <label htmlFor="markdown-input" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          📝 Markdown Content
        </label>
        <textarea
          id="markdown-input"
          value={markdownContent}
          onChange={(e) => setMarkdownContent(e.target.value)}
          className="w-full h-64 p-3 rounded-lg font-mono text-sm focus:ring-2 focus:border-transparent"
          style={{ 
            background: 'var(--bg-primary)', 
            border: '1px solid var(--border-primary)', 
            color: 'var(--text-primary)',
            borderColor: 'var(--border-primary)'
          }}
          placeholder="Enter your markdown content here..."
        />
      </div>      {/* Preview Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>🔍 Preview</h2>        <div className="p-4 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
          <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Markdown Preview (parsed in <code className="px-1 rounded" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>@asafarim/markdown-utils</code> to HTML)</h3>
          <div className="prose max-w-none p-4 rounded border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)' }}>            <div 
              dangerouslySetInnerHTML={{ 
                __html: markdownToHtml(markdownContent) 
              }}
              className="markdown-content"
              style={{
                lineHeight: '1.6',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
      </div>      {/* Tab Navigation */}
      <div className="mb-6" style={{ borderBottom: '1px solid var(--border-primary)' }}>
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'analysis', label: '📊 Content Analysis', count: contentAnalysis?.headings.length },
            { id: 'validation', label: '✅ Validation', count: validationResults?.overall?.isValid ? 1 : 0 },
            { id: 'file-ops', label: '📁 File Operations', count: fileInfo ? 1 : 0 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id ? 'theme-tab-active' : 'theme-tab-inactive'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-2 py-0.5 px-2 rounded-full text-xs" style={{ 
                  background: 'var(--bg-tertiary)', 
                  color: 'var(--text-secondary)' 
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'analysis' && renderAnalysisTab()}
        {activeTab === 'validation' && renderValidationTab()}
        {activeTab === 'file-ops' && renderFileOpsTab()}
      </div>      {/* Usage Example */}
      <div className="mt-8 border rounded-lg p-4" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>💻 Usage Example</h3>
        <pre className="p-4 rounded text-sm overflow-x-auto" style={{ background: 'var(--markdown-code-bg)', color: 'var(--markdown-code-text)' }}>
{`import { 
  getWordCount, 
  getReadingTime, 
  getAllHeadings,
  filenameToSlug 
} from '@asafarim/markdown-utils';

// Content analysis
const wordCount = getWordCount(markdownContent);
const readingTime = getReadingTime(markdownContent);
const headings = getAllHeadings(markdownContent);

// File operations
const slug = filenameToSlug('2023-12-01_MarkdownUtils.md');
// Result: "2023-12-01-markdownutils"

console.log(\`Words: \${wordCount}, Reading time: \${readingTime} min\`);`}
        </pre>
      </div>
    </div>
  );
};

export default MarkdownUtils;
