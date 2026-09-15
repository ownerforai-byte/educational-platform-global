/**
 * Script to add tabbed structure to all biology concept files
 * Tab 1: Enriched content (current)
 * Tab 2: Original content (preserved)
 */

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../content/ravikishan/class-11-notes/biology');

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.endsWith('.json') && entry.name !== 'plan.json') {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Check if already has tabbed structure
    if (data.enrichedContent && data.originalContent) {
      console.log(`✓ Already has tabbed structure: ${path.basename(filePath)}`);
      return;
    }
    
    // Create tabbed structure
    const tabbedData = {
      ...data,
      enrichedContent: {
        notes: data.notes || [],
        confusion: data.confusion || [],
        practice: data.practice || [],
        universalFacts: data.universalFacts || [],
        examples: data.examples || [],
        practiceQuestions: data.practiceQuestions || [],
        formulas: data.formulas || [],
        keyPoints: data.keyPoints || [],
        summary: data.summary || "",
        specialNotes: data.specialNotes || [],
        importantStatements: data.importantStatements || [],
        importantNotes: data.importantNotes || [],
        examShortTricks: data.examShortTricks || [],
        examNotes: data.examNotes || [],
        mcs: data.mcs || [],
        importantConcepts: data.importantConcepts || [],
        importantTasks: data.importantTasks || [],
        exercises: data.exercises || [],
        visualization: data.visualization || {}
      },
      originalContent: {
        notes: data.notes || [],
        confusion: data.confusion || [],
        practice: data.practice || [],
        universalFacts: data.universalFacts || [],
        examples: data.examples || [],
        practiceQuestions: data.practiceQuestions || [],
        formulas: data.formulas || [],
        keyPoints: data.keyPoints || [],
        summary: data.summary || "",
        specialNotes: data.specialNotes || [],
        importantStatements: data.importantStatements || [],
        importantNotes: data.importantNotes || [],
        examShortTricks: data.examShortTricks || [],
        examNotes: data.examNotes || [],
        mcs: data.mcs || [],
        importantConcepts: data.importantConcepts || [],
        importantTasks: data.importantTasks || [],
        exercises: data.exercises || [],
        visualization: data.visualization || {}
      }
    };
    
    // Remove top-level content arrays
    delete tabbedData.notes;
    delete tabbedData.confusion;
    delete tabbedData.practice;
    delete tabbedData.universalFacts;
    delete tabbedData.examples;
    delete tabbedData.practiceQuestions;
    delete tabbedData.formulas;
    delete tabbedData.keyPoints;
    delete tabbedData.summary;
    delete tabbedData.specialNotes;
    delete tabbedData.importantStatements;
    delete tabbedData.importantNotes;
    delete tabbedData.examShortTricks;
    delete tabbedData.examNotes;
    delete tabbedData.mcs;
    delete tabbedData.importantConcepts;
    delete tabbedData.importantTasks;
    delete tabbedData.exercises;
    delete tabbedData.visualization;
    
    // Write back
    fs.writeFileSync(filePath, JSON.stringify(tabbedData, null, 2), 'utf8');
    console.log(`✓ Processed: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`✗ Error processing ${filePath}: ${error.message}`);
  }
}

// Process all biology directories
processDirectory(baseDir);

console.log('\n✓ All biology files processed!');
