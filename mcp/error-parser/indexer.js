/**
 * Error Search Index Builder
 * 
 * Builds search indices for fast error pattern lookup.
 * Supports full-text search, category filtering, tag filtering, and fuzzy matching.
 */

const { ERROR_SIGNATURES } = require('./patterns');

/**
 * Build a complete search index from error patterns
 * @param {Array<Object>} errors - Array of error pattern objects
 * @returns {Object} Search index
 */
function buildSearchIndex(errors) {
  const index = {
    // Inverted index for full-text search (term -> [error_ids])
    terms: {},
    
    // Category index
    byCategory: {},
    
    // Tag index
    byTag: {},
    
    // Severity index
    bySeverity: {},
    
    // File pattern index
    byFilePattern: {},
    
    // Module index
    byModule: {},
    
    // Error signature patterns for matching
    signatures: [],
    
    // Metadata
    metadata: {
      totalErrors: errors.length,
      indexedAt: new Date().toISOString(),
      termCount: 0,
      tagCount: 0
    }
  };

  for (const error of errors) {
    // Index by category
    if (!index.byCategory[error.category]) {
      index.byCategory[error.category] = [];
    }
    index.byCategory[error.category].push(error.id);

    // Index by severity
    if (!index.bySeverity[error.severity]) {
      index.bySeverity[error.severity] = [];
    }
    index.bySeverity[error.severity].push(error.id);

    // Index by tags
    for (const tag of error.tags) {
      if (!index.byTag[tag]) {
        index.byTag[tag] = [];
      }
      if (!index.byTag[tag].includes(error.id)) {
        index.byTag[tag].push(error.id);
      }
    }

    // Index by affected files
    for (const file of error.affectedFiles) {
      const pattern = normalizeFilePattern(file);
      if (!index.byFilePattern[pattern]) {
        index.byFilePattern[pattern] = [];
      }
      if (!index.byFilePattern[pattern].includes(error.id)) {
        index.byFilePattern[pattern].push(error.id);
      }
    }

    // Index by modules
    for (const module of error.affectedModules) {
      if (!index.byModule[module]) {
        index.byModule[module] = [];
      }
      if (!index.byModule[module].includes(error.id)) {
        index.byModule[module].push(error.id);
      }
    }

    // Build full-text term index
    const terms = extractTerms(error);
    for (const term of terms) {
      if (!index.terms[term]) {
        index.terms[term] = [];
      }
      if (!index.terms[term].includes(error.id)) {
        index.terms[term].push(error.id);
      }
    }

    // Add error signatures for pattern matching
    for (const signature of error.errorSignatures) {
      index.signatures.push({
        pattern: signature,
        errorId: error.id
      });
    }
  }

  // Update metadata
  index.metadata.termCount = Object.keys(index.terms).length;
  index.metadata.tagCount = Object.keys(index.byTag).length;

  return index;
}

/**
 * Extract searchable terms from an error pattern
 * @param {Object} error - Error pattern object
 * @returns {Array<string>} Extracted terms
 */
function extractTerms(error) {
  const terms = new Set();
  
  // Add ID parts
  const idParts = error.id.toLowerCase().split('-');
  idParts.forEach(part => terms.add(part));
  
  // Add title words
  tokenize(error.title).forEach(term => terms.add(term));
  
  // Add root cause words
  if (error.rootCause) {
    tokenize(error.rootCause).forEach(term => terms.add(term));
  }
  
  // Add symptom words
  for (const symptom of error.symptoms) {
    tokenize(symptom).forEach(term => terms.add(term));
  }
  
  // Add resolution summary words
  if (error.resolution?.summary) {
    tokenize(error.resolution.summary).forEach(term => terms.add(term));
  }
  
  // Add tags
  error.tags.forEach(tag => terms.add(tag.toLowerCase()));
  
  return Array.from(terms);
}

/**
 * Tokenize text into searchable terms
 * @param {string} text - Text to tokenize
 * @returns {Array<string>} Tokens
 */
function tokenize(text) {
  if (!text) return [];
  
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s_-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= 3)
    .filter(word => !STOP_WORDS.has(word));
}

/**
 * Common stop words to exclude from indexing
 */
const STOP_WORDS = new Set([
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
  'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been', 'were', 'being',
  'this', 'that', 'with', 'they', 'from', 'will', 'would', 'there', 'their',
  'what', 'about', 'which', 'when', 'make', 'like', 'time', 'just', 'know',
  'take', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'than',
  'then', 'now', 'look', 'only', 'come', 'its', 'over', 'also', 'back',
  'after', 'use', 'two', 'how', 'first', 'well', 'way', 'even', 'new',
  'want', 'because', 'any', 'these', 'give', 'day', 'most', 'should'
]);

/**
 * Normalize file path to a searchable pattern
 * @param {string} filePath - File path
 * @returns {string} Normalized pattern
 */
function normalizeFilePattern(filePath) {
  // Remove markdown link syntax
  let pattern = filePath.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Extract just the filename or last path component
  const parts = pattern.split('/');
  return parts[parts.length - 1].trim();
}

/**
 * Search the index for matching errors
 * @param {Object} index - Search index
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Array<{errorId: string, score: number}>} Search results
 */
function searchIndex(index, query, options = {}) {
  const {
    category = null,
    tag = null,
    severity = null,
    module = null,
    limit = 10
  } = options;

  const scores = {};
  const queryTerms = tokenize(query);

  // Score by term matches
  for (const term of queryTerms) {
    // Exact match
    if (index.terms[term]) {
      for (const errorId of index.terms[term]) {
        scores[errorId] = (scores[errorId] || 0) + 2;
      }
    }

    // Fuzzy match (prefix matching)
    for (const indexTerm of Object.keys(index.terms)) {
      if (indexTerm.startsWith(term) || term.startsWith(indexTerm)) {
        for (const errorId of index.terms[indexTerm]) {
          scores[errorId] = (scores[errorId] || 0) + 1;
        }
      }
    }
  }

  // Apply filters
  let candidates = Object.keys(scores);

  if (category) {
    const categoryErrors = index.byCategory[category] || [];
    candidates = candidates.filter(id => categoryErrors.includes(id));
  }

  if (tag) {
    const tagErrors = index.byTag[tag] || [];
    candidates = candidates.filter(id => tagErrors.includes(id));
  }

  if (severity) {
    const severityErrors = index.bySeverity[severity] || [];
    candidates = candidates.filter(id => severityErrors.includes(id));
  }

  if (module) {
    const moduleErrors = index.byModule[module] || [];
    candidates = candidates.filter(id => moduleErrors.includes(id));
  }

  // Sort by score and limit
  return candidates
    .map(errorId => ({ errorId, score: scores[errorId] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Match an error message against indexed signatures
 * @param {Object} index - Search index
 * @param {string} errorMessage - Error message to match
 * @returns {Array<{errorId: string, pattern: string, confidence: number}>} Matches
 */
function matchSignatures(index, errorMessage) {
  const matches = [];
  const lowerMessage = errorMessage.toLowerCase();

  for (const sig of index.signatures) {
    let matched = false;
    let confidence = 0;

    // Check if signature is a regex pattern string
    if (sig.pattern.startsWith('/') && sig.pattern.includes('/')) {
      try {
        // Parse regex from string
        const regexMatch = sig.pattern.match(/^\/(.+)\/([gimsuvy]*)$/);
        if (regexMatch) {
          const regex = new RegExp(regexMatch[1], regexMatch[2]);
          if (regex.test(errorMessage)) {
            matched = true;
            confidence = 0.8;
          }
        }
      } catch (e) {
        // Invalid regex, try string match
      }
    }

    // Fallback to string matching
    if (!matched) {
      const lowerPattern = sig.pattern.toLowerCase();
      if (lowerMessage.includes(lowerPattern)) {
        matched = true;
        confidence = 0.6;
      } else if (fuzzyMatch(lowerMessage, lowerPattern)) {
        matched = true;
        confidence = 0.4;
      }
    }

    if (matched) {
      matches.push({
        errorId: sig.errorId,
        pattern: sig.pattern,
        confidence
      });
    }
  }

  // Deduplicate by errorId, keeping highest confidence
  const deduped = {};
  for (const match of matches) {
    if (!deduped[match.errorId] || deduped[match.errorId].confidence < match.confidence) {
      deduped[match.errorId] = match;
    }
  }

  return Object.values(deduped).sort((a, b) => b.confidence - a.confidence);
}

/**
 * Simple fuzzy string matching
 * @param {string} text - Text to search in
 * @param {string} pattern - Pattern to find
 * @returns {boolean} Whether there's a fuzzy match
 */
function fuzzyMatch(text, pattern) {
  // Split pattern into words and check if most are present
  const patternWords = pattern.split(/\s+/).filter(w => w.length > 3);
  if (patternWords.length === 0) return false;

  let matchCount = 0;
  for (const word of patternWords) {
    if (text.includes(word)) {
      matchCount++;
    }
  }

  return matchCount / patternWords.length >= 0.5;
}

/**
 * Get all unique tags from the index
 * @param {Object} index - Search index
 * @returns {Array<{tag: string, count: number}>} Tags with counts
 */
function getAllTags(index) {
  return Object.entries(index.byTag)
    .map(([tag, errorIds]) => ({ tag, count: errorIds.length }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get all categories from the index
 * @param {Object} index - Search index
 * @returns {Array<{category: string, count: number}>} Categories with counts
 */
function getAllCategories(index) {
  return Object.entries(index.byCategory)
    .map(([category, errorIds]) => ({ category, count: errorIds.length }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get statistics about the index
 * @param {Object} index - Search index
 * @returns {Object} Index statistics
 */
function getIndexStats(index) {
  return {
    totalErrors: index.metadata.totalErrors,
    totalTerms: index.metadata.termCount,
    totalTags: index.metadata.tagCount,
    totalSignatures: index.signatures.length,
    categories: getAllCategories(index),
    severities: Object.entries(index.bySeverity)
      .map(([severity, ids]) => ({ severity, count: ids.length })),
    modules: Object.entries(index.byModule)
      .map(([module, ids]) => ({ module, count: ids.length }))
      .sort((a, b) => b.count - a.count),
    indexedAt: index.metadata.indexedAt
  };
}

module.exports = {
  buildSearchIndex,
  searchIndex,
  matchSignatures,
  extractTerms,
  tokenize,
  fuzzyMatch,
  getAllTags,
  getAllCategories,
  getIndexStats
};
